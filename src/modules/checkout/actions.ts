"use server";

import config from "@payload-config";
import { getPayload } from "payload";

import { stripe } from "@/lib/stripe";

import {
	calculateOrderTotalsForItems,
	DEFAULT_SHIPPING_CONFIG,
	type ShippingGlobalConfig,
	type ShippingLineInput,
} from "./shipping";

const MIN_AMOUNT_GBP = 0.5; // Stripe minimum ~50p for GBP
const CENTS_PER_POUND = 100;

interface CheckoutItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	size?: string;
	shippingFeeOverride?: number | null;
}

export interface PendingOrderItem {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	color: string | null;
	size: string | null;
}

export interface PendingOrderData {
	items: PendingOrderItem[];
	subtotal: number;
	shipping: number;
	total: number;
	createdAt: string;
}

export async function createPaymentIntent(
	amount: number,
	items: CheckoutItem[]
) {
	try {
		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("Stripe Secret Key is missing");
		}

		if (amount < MIN_AMOUNT_GBP) {
			return {
				clientSecret: null,
				error: `Minimum order is £${MIN_AMOUNT_GBP.toFixed(2)}.`,
			};
		}

		const amountInPence = Math.round(amount * CENTS_PER_POUND);

		const itemsSummary = items
			.map((item) => {
				const variant = [item.color, item.size].filter(Boolean).join(", ");
				const base = `${item.name}${variant ? ` (${variant})` : ""} x${item.quantity}`;
				return base;
			})
			.join(", ")
			.slice(0, 500);

		const firstItemWithImage = items.find((item) => item.image);

		// Calculate subtotal and shipping (respecting per-product overrides)
		const lineItems: ShippingLineInput[] = items.map((item) => ({
			price: item.price,
			quantity: item.quantity,
			shippingFeeOverride: item.shippingFeeOverride,
		}));

		// Load shipping settings from Payload Global (with safe fallbacks)
		const payload = await getPayload({ config });

		let shippingConfig: ShippingGlobalConfig = DEFAULT_SHIPPING_CONFIG;

		try {
			const shippingSettingsResult = await payload.findGlobal({
				slug: "shipping-settings",
			});

			const shippingSettings = shippingSettingsResult as unknown as {
				defaultShippingFee?: number | null;
				enableFreeShipping?: boolean | null;
				freeShippingThreshold?: number | null;
			};

			shippingConfig = {
				baseFee:
					typeof shippingSettings.defaultShippingFee === "number"
						? shippingSettings.defaultShippingFee
						: DEFAULT_SHIPPING_CONFIG.baseFee,
				freeShippingThreshold:
					typeof shippingSettings.freeShippingThreshold === "number"
						? shippingSettings.freeShippingThreshold
						: DEFAULT_SHIPPING_CONFIG.freeShippingThreshold,
				enableFreeShipping:
					typeof shippingSettings.enableFreeShipping === "boolean"
						? shippingSettings.enableFreeShipping
						: DEFAULT_SHIPPING_CONFIG.enableFreeShipping,
			};
		} catch (err) {
			console.error(
				"[Checkout] Failed to load shipping-settings global, using defaults",
				err
			);
		}

		const { subtotal, shipping } = calculateOrderTotalsForItems(
			lineItems,
			shippingConfig
		);

		// Prepare order items for storage (including price)
		const orderItems: PendingOrderItem[] = items.map(
			({ id, name, price, quantity, color, size }) => ({
				productId: id,
				name,
				price,
				quantity,
				color: color ?? null,
				size: size ?? null,
			})
		);

		// Store pending order in Payload KV to handle large orders
		// This avoids Stripe's 500 char metadata limit
		const orderReference = `order_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

		const pendingOrderData: PendingOrderData = {
			items: orderItems,
			subtotal,
			shipping,
			total: amount,
			createdAt: new Date().toISOString(),
		};

		await payload.create({
			collection: "payload-kv",
			data: {
				key: `pending_order:${orderReference}`,
				data: pendingOrderData as unknown as Record<string, unknown>,
			},
		});

		const metadata: Record<string, string> = {
			order_reference: orderReference,
			items: itemsSummary,
			...(firstItemWithImage?.image && {
				first_item_image: firstItemWithImage.image,
			}),
		};

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amountInPence,
			currency: "gbp",
			automatic_payment_methods: {
				enabled: true,
			},
			description: itemsSummary || undefined,
			metadata,
		});

		return { clientSecret: paymentIntent.client_secret, error: null };
	} catch (error) {
		console.error("Error creating payment intent:", error);
		return { clientSecret: null, error: (error as Error).message };
	}
}

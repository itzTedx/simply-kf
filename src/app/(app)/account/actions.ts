"use server";

import config from "@payload-config";
import { getPayload } from "payload";

import { normalizeAndValidateEmail } from "@/lib/notifications/order-emails";
import type { Order } from "@/payload-types";

type LookupInput = {
	email: string;
	orderNumber: string;
};

type OrderItemClient = {
	productName: string | null;
	color: string | null;
	size: string | null;
	quantity: number;
	price: number;
};

type OrderClient = {
	orderNumber: string;
	status: string;
	paymentStatus?: string | null;
	total: number;
	subtotal?: number | null;
	shipping?: number | null;
	paidAt?: string | null;
	createdAt: string;
	trackingNumber?: string | null;
	trackingUrl?: string | null;
	shippingAddress: {
		line1?: string | null;
		line2?: string | null;
		city?: string | null;
		state?: string | null;
		postalCode?: string | null;
		country?: string | null;
	} | null;
	items: OrderItemClient[];
};

export type LookupSuccess = {
	order: OrderClient;
};

export type LookupError = {
	error: string;
};

export type LookupResult = LookupSuccess | LookupError;

function sanitizeOrderForClient(order: Order): OrderClient {
	return {
		orderNumber: order.orderNumber,
		status: order.status,
		paymentStatus: order.paymentStatus ?? null,
		total: order.total,
		subtotal: order.subtotal ?? null,
		shipping: order.shipping ?? null,
		paidAt: order.paidAt ?? null,
		createdAt: order.createdAt,
		trackingNumber: order.trackingNumber ?? null,
		trackingUrl: order.trackingUrl ?? null,
		shippingAddress: order.shippingAddress ?? null,
		items: order.items.map((item) => ({
			productName: item.productName ?? null,
			color: item.color ?? null,
			size: item.size ?? null,
			quantity: item.quantity,
			price: item.price,
		})),
	};
}

export async function lookupOrderAction(
	input: LookupInput
): Promise<LookupResult> {
	try {
		const email = normalizeAndValidateEmail(input.email);
		const orderNumber = (input.orderNumber ?? "").trim();

		if (!email || !orderNumber) {
			return {
				error:
					"Please provide a valid email address and order number to look up your order.",
			};
		}

		const payload = await getPayload({ config });

		const result = await payload.find({
			collection: "orders",
			where: {
				orderNumber: { equals: orderNumber },
			},
			limit: 1,
			overrideAccess: true,
		});

		if (!result.docs.length) {
			return {
				error:
					"We couldn't find an order with that order number. Please check the number from your confirmation email.",
			};
		}

		const order = result.docs[0] as Order;
		const storedEmail = normalizeAndValidateEmail(order.customer?.email ?? "");

		if (!storedEmail || storedEmail !== email) {
			return {
				error:
					"We couldn't verify this order with the email provided. Please make sure you use the same email you used at checkout.",
			};
		}

		return {
			order: sanitizeOrderForClient(order),
		};
	} catch (error) {
		console.error("[lookupOrderAction] Unhandled error", error);
		return {
			error:
				"Something went wrong while looking up your order. Please try again or contact support if this keeps happening.",
		};
	}
}

"use server";

import { stripe } from "@/lib/stripe";

const MIN_AMOUNT_GBP = 0.5; // Stripe minimum ~50p for GBP
const CENTS_PER_POUND = 100;

interface CheckoutItem {
	id: string;
	name: string;
	quantity: number;
	image?: string;
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
			.map((item) => `${item.name} x${item.quantity}`)
			.join(", ")
			.slice(0, 500);

		const firstItemWithImage = items.find((item) => item.image);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amountInPence,
			currency: "gbp",
			automatic_payment_methods: {
				enabled: true,
			},
			description: itemsSummary || undefined,
			metadata: {
				order_reference: `order_${Date.now()}`,
				items: itemsSummary,
				...(firstItemWithImage?.image && {
					first_item_image: firstItemWithImage.image,
				}),
			},
		});

		return { clientSecret: paymentIntent.client_secret, error: null };
	} catch (error) {
		console.error("Error creating payment intent:", error);
		return { clientSecret: null, error: (error as Error).message };
	}
}

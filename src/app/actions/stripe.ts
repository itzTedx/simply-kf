"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2025-02-24.acacia",
});

export async function createPaymentIntent(amount: number) {
	try {
		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("Stripe Secret Key is missing");
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100), // Convert to cents
			currency: "gbp", // Changed to GBP as per product view (price in £)
			automatic_payment_methods: {
				enabled: true,
			},
		});

		return { clientSecret: paymentIntent.client_secret, error: null };
	} catch (error) {
		console.error("Error creating payment intent:", error);
		return { clientSecret: null, error: (error as Error).message };
	}
}

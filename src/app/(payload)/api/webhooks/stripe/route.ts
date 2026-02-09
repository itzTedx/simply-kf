import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
	try {
		const body = await req.text();
		const signature = (await headers()).get("stripe-signature");

		if (!signature) {
			return NextResponse.json(
				{ error: "No stripe signature" },
				{ status: 400 }
			);
		}

		if (!webhookSecret) {
			console.warn(
				"STRIPE_WEBHOOK_SECRET not configured, skipping signature verification"
			);
			return NextResponse.json(
				{ error: "Webhook secret not configured" },
				{ status: 500 }
			);
		}

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
		} catch (err) {
			console.error("Webhook signature verification failed:", err);
			return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
		}

		// Handle the event
		switch (event.type) {
			case "payment_intent.succeeded": {
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log("PaymentIntent succeeded:", paymentIntent.id);
				// TODO: Update order status, send confirmation email, etc.
				await handlePaymentSuccess(paymentIntent);
				break;
			}

			case "payment_intent.payment_failed": {
				const failedPayment = event.data.object as Stripe.PaymentIntent;
				console.log("PaymentIntent failed:", failedPayment.id);
				// TODO: Handle failed payment, notify customer, etc.
				await handlePaymentFailure(failedPayment);
				break;
			}

			case "payment_intent.canceled": {
				const canceledPayment = event.data.object as Stripe.PaymentIntent;
				console.log("PaymentIntent canceled:", canceledPayment.id);
				// TODO: Handle canceled payment
				await handlePaymentCancellation(canceledPayment);
				break;
			}

			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				console.log("Checkout session completed:", session.id);
				// TODO: Handle successful checkout session
				await handleCheckoutCompleted(session);
				break;
			}

			case "invoice.payment_succeeded": {
				const invoice = event.data.object as Stripe.Invoice;
				console.log("Invoice payment succeeded:", invoice.id);
				// TODO: Handle subscription payment success
				await handleInvoicePaymentSucceeded(invoice);
				break;
			}

			case "invoice.payment_failed": {
				const failedInvoice = event.data.object as Stripe.Invoice;
				console.log("Invoice payment failed:", failedInvoice.id);
				// TODO: Handle subscription payment failure
				await handleInvoicePaymentFailed(failedInvoice);
				break;
			}

			case "customer.subscription.created":
			case "customer.subscription.updated":
			case "customer.subscription.deleted": {
				const subscription = event.data.object as Stripe.Subscription;
				console.log(`Subscription ${event.type}:`, subscription.id);
				// TODO: Handle subscription changes
				await handleSubscriptionChange(event.type, subscription);
				break;
			}

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error("Webhook error:", error);
		return NextResponse.json(
			{ error: "Webhook handler failed" },
			{ status: 500 }
		);
	}
}

// Event handler functions
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
	// TODO: Implement your business logic here
	// Examples:
	// - Update order status in database
	// - Send confirmation email
	// - Update inventory
	// - Create shipping order

	console.log("Processing successful payment:", {
		paymentIntentId: paymentIntent.id,
		amount: paymentIntent.amount,
		currency: paymentIntent.currency,
		metadata: paymentIntent.metadata,
	});
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
	// TODO: Implement your business logic here
	// Examples:
	// - Update order status to failed
	// - Notify customer of payment failure
	// - Log for analytics

	console.log("Processing failed payment:", {
		paymentIntentId: paymentIntent.id,
		amount: paymentIntent.amount,
		currency: paymentIntent.currency,
		lastPaymentError: paymentIntent.last_payment_error,
	});
}

async function handlePaymentCancellation(paymentIntent: Stripe.PaymentIntent) {
	// TODO: Handle payment cancellation
	console.log("Processing canceled payment:", {
		paymentIntentId: paymentIntent.id,
		cancellationReason: paymentIntent.cancellation_reason,
	});
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
	// TODO: Handle checkout session completion
	console.log("Processing completed checkout session:", {
		sessionId: session.id,
		customer: session.customer,
		paymentStatus: session.payment_status,
		metadata: session.metadata,
	});
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
	// TODO: Handle successful invoice payment (subscriptions)
	console.log("Processing successful invoice payment:", {
		invoiceId: invoice.id,
		subscription: invoice.subscription,
		amount: invoice.amount_paid,
	});
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
	// TODO: Handle failed invoice payment (subscriptions)
	console.log("Processing failed invoice payment:", {
		invoiceId: invoice.id,
		subscription: invoice.subscription,
		amount: invoice.amount_due,
		attemptCount: invoice.attempt_count,
	});
}

async function handleSubscriptionChange(
	eventType: string,
	subscription: Stripe.Subscription
) {
	// TODO: Handle subscription changes
	console.log("Processing subscription change:", {
		eventType,
		subscriptionId: subscription.id,
		status: subscription.status,
		customerId: subscription.customer,
	});
}

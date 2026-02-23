import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import config from "@payload-config";
import { getPayload } from "payload";
import Stripe from "stripe";

import {
	normalizeAndValidateEmail,
	sendOrderConfirmationEmail,
} from "@/lib/notifications/order-emails";
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

// Type for order items stored in Payload KV
interface OrderItem {
	productId: number;
	name: string;
	price: number;
	quantity: number;
	color: string | null;
	size: string | null;
}

interface PendingOrderData {
	items: OrderItem[];
	subtotal: number;
	shipping: number;
	total: number;
	createdAt: string;
}

// Generate a human-readable order number
function generateOrderNumber(): string {
	const date = new Date();
	const year = date.getFullYear().toString().slice(-2);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const random = Math.random().toString(36).slice(2, 6).toUpperCase();
	return `SKF-${year}${month}${day}-${random}`;
}

// Event handler functions
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
	console.log("Processing successful payment:", {
		paymentIntentId: paymentIntent.id,
		amount: paymentIntent.amount,
		currency: paymentIntent.currency,
		metadata: paymentIntent.metadata,
	});

	const orderReference = paymentIntent.metadata?.order_reference;
	if (!orderReference) {
		console.warn(
			"No order_reference in payment metadata, skipping order creation"
		);
		return;
	}

	// Retrieve order items from Payload KV
	const payload = await getPayload({ config });

	const kvKey = `pending_order:${orderReference}`;
	const kvResults = await payload.find({
		collection: "payload-kv",
		where: {
			key: { equals: kvKey },
		},
		limit: 1,
	});

	if (kvResults.docs.length === 0) {
		console.warn(`Pending order not found for key: ${kvKey}`);
		return;
	}

	const kvDoc = kvResults.docs[0];
	const orderData = kvDoc.data as unknown as PendingOrderData;

	if (!orderData?.items?.length) {
		console.log("No items to process");
		return;
	}

	// Customer info: email is the one collected in checkout (Stripe Elements form)
	// and sent via confirmPayment (receipt_email + billing_details.email). We use
	// only billing_details.email as the single source for order confirmation emails.
	let customerName = "";
	let customerEmail = "";
	let customerPhone = "";
	let paymentMethodDescription = "Card";
	let shippingAddress = {
		line1: "",
		line2: "",
		city: "",
		state: "",
		postalCode: "",
		country: "United Kingdom",
	};

	// Try to get billing/shipping details from Stripe
	try {
		// Get the latest charge for this payment intent
		const charges = await stripe.charges.list({
			payment_intent: paymentIntent.id,
			limit: 1,
		});

		if (charges.data.length > 0) {
			const charge = charges.data[0];

			// Payment method for receipt (e.g. "Visa ending in 4242")
			const card = charge.payment_method_details?.card;
			if (card?.last4) {
				const brand = card.brand ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1) : "Card";
				paymentMethodDescription = `${brand} ending in ${card.last4}`;
			}

			// Get billing details
			if (charge.billing_details) {
				customerName = charge.billing_details.name ?? "";
				customerEmail = charge.billing_details.email ?? "";
				customerPhone = charge.billing_details.phone ?? "";

				// Use billing address as shipping if no shipping provided
				if (charge.billing_details.address) {
					const addr = charge.billing_details.address;
					shippingAddress = {
						line1: addr.line1 ?? "",
						line2: addr.line2 ?? "",
						city: addr.city ?? "",
						state: addr.state ?? "",
						postalCode: addr.postal_code ?? "",
						country: addr.country ?? "United Kingdom",
					};
				}
			}

			// Prefer shipping details if available
			if (charge.shipping) {
				if (charge.shipping.name) customerName = charge.shipping.name;
				if (charge.shipping.phone) customerPhone = charge.shipping.phone;
				if (charge.shipping.address) {
					const addr = charge.shipping.address;
					shippingAddress = {
						line1: addr.line1 ?? "",
						line2: addr.line2 ?? "",
						city: addr.city ?? "",
						state: addr.state ?? "",
						postalCode: addr.postal_code ?? "",
						country: addr.country ?? "United Kingdom",
					};
				}
			}
		}
	} catch (err) {
		console.error("Failed to get customer details from Stripe:", err);
	}

	// Normalize email (same as checkout form) for storage and notifications
	customerEmail = normalizeAndValidateEmail(customerEmail) ?? "";

	// Create order in Payload
	const orderNumber = generateOrderNumber();

	try {
		await payload.create({
			collection: "orders",
			data: {
				orderNumber,
				status: "pending",
				customer: {
					name: customerName || undefined,
					email: customerEmail || undefined,
					phone: customerPhone || undefined,
				},
				shippingAddress: {
					line1: shippingAddress.line1 || undefined,
					line2: shippingAddress.line2 || undefined,
					city: shippingAddress.city || undefined,
					state: shippingAddress.state || undefined,
					postalCode: shippingAddress.postalCode || undefined,
					country: shippingAddress.country,
				},
				items: orderData.items.map((item) => ({
					product: item.productId,
					productName: item.name,
					color: item.color ?? undefined,
					size: item.size ?? undefined,
					quantity: item.quantity,
					price: item.price,
				})),
				subtotal: orderData.subtotal,
				shipping: orderData.shipping,
				total: orderData.total,
				stripePaymentIntentId: paymentIntent.id,
				paymentStatus: "paid",
				paidAt: new Date().toISOString(),
			},
		});

		console.log(`Order ${orderNumber} created successfully`);
	} catch (err) {
		console.error("Failed to create order in Payload:", err);
		// Continue with stock deduction even if order creation fails
	}

	// Deduct stock for each item
	await deductStock(orderData.items);

	// Mark order as processed by deleting the KV entry
	await payload.delete({
		collection: "payload-kv",
		id: kvDoc.id,
	});

	// Send order confirmation to the email collected in Stripe Elements (stripe-elements.tsx)
	if (customerEmail) {
		const baseUrl =
			process.env.NEXT_PUBLIC_SITE_URL ||
			(process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: "https://simplykf.com");
		const orderDate = new Date().toLocaleDateString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		const estimatedDelivery = new Date();
		estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
		const estimatedDeliveryDate = estimatedDelivery.toLocaleDateString(
			"en-GB",
			{ day: "numeric", month: "long", year: "numeric" }
		);
		const customerFirstName =
			customerName?.trim().split(/\s+/)[0] || "Customer";

		try {
			await sendOrderConfirmationEmail(
				{
					customerFirstName,
					orderNumber,
					orderDate,
					paymentMethod: paymentMethodDescription,
					orderItems: orderData.items.map((item) => {
						const variant = [item.color, item.size]
							.filter(Boolean)
							.join(", ");
						const lineTotal = (item.price * item.quantity).toFixed(2);
						return {
							name: item.name,
							variant: variant || "—",
							quantity: String(item.quantity),
							price: item.price.toFixed(2),
							lineTotal,
						};
					}),
					orderSubtotal: orderData.subtotal.toFixed(2),
					orderShipping: orderData.shipping.toFixed(2),
					orderDiscount: "",
					orderTotal: orderData.total.toFixed(2),
					shippingName: customerName || "Customer",
					shippingAddressLine1: shippingAddress.line1,
					shippingAddressLine2: shippingAddress.line2,
					shippingCity: shippingAddress.city,
					shippingPostcode: shippingAddress.postalCode,
					shippingCountry: shippingAddress.country,
					shippingMethod: "Standard UK Delivery",
					estimatedDeliveryDate,
					orderUrl: `${baseUrl}/shop`,
					supportEmail: process.env.SUPPORT_EMAIL || "hello@simplykf.com",
					instagramUrl: "https://instagram.com/simplykfabayas",
					currentYear: String(new Date().getFullYear()),
				},
				customerEmail
			);
		} catch (emailErr) {
			console.error("Failed to send order confirmation email:", emailErr);
			// Don't fail the webhook; order was already created
		}
	}

	console.log(`Order ${orderReference} processed and KV entry cleaned up`);
}

/**
 * Deduct stock for purchased items.
 * Handles both variant products (stock per color/size) and non-variant products.
 */
async function deductStock(items: OrderItem[]) {
	const payload = await getPayload({ config });

	for (const item of items) {
		try {
			// Fetch the current product
			const product = await payload.findByID({
				collection: "products",
				id: item.productId,
				draft: false,
			});

			if (!product) {
				console.warn(
					`Product ${item.productId} not found, skipping stock deduction`
				);
				continue;
			}

			// Determine if this is a variant product
			if (product.enableVariants && product.variants?.length) {
				// Find the matching variant by color
				const variantIndex = product.variants.findIndex(
					(v) => v.color?.toLowerCase() === item.color?.toLowerCase()
				);

				if (variantIndex === -1) {
					console.warn(
						`Variant with color "${item.color}" not found for product ${item.productId}`
					);
					continue;
				}

				const variant = product.variants[variantIndex];

				// Find the matching size within the variant
				if (variant.sizes?.length && item.size) {
					const sizeIndex = variant.sizes.findIndex(
						(s) => s.size === item.size
					);

					if (sizeIndex === -1) {
						console.warn(
							`Size "${item.size}" not found in variant "${item.color}" for product ${item.productId}`
						);
						continue;
					}

					const currentStock = variant.sizes[sizeIndex].stock;
					if (currentStock === null || currentStock === undefined) {
						console.log(
							`Stock not tracked for size "${item.size}" in variant "${item.color}" of product ${item.productId}`
						);
						continue;
					}

					const newStock = Math.max(0, currentStock - item.quantity);

					// Update the stock using deep path
					const updatedVariants = [...product.variants];
					const updatedSizes = [...(variant.sizes ?? [])];
					updatedSizes[sizeIndex] = {
						...updatedSizes[sizeIndex],
						stock: newStock,
					};
					updatedVariants[variantIndex] = {
						...variant,
						sizes: updatedSizes,
					};

					await payload.update({
						collection: "products",
						id: item.productId,
						data: {
							variants: updatedVariants,
						},
					});

					console.log(
						`Updated stock for product ${item.productId} (${item.name}), variant "${item.color}", size "${item.size}": ${currentStock} -> ${newStock}`
					);
				} else if (!item.size && variant.stock != null) {
					// Variant product without sizes — deduct from variant-level stock
					const currentStock = variant.stock;
					const newStock = Math.max(0, currentStock - item.quantity);

					const updatedVariants = [...product.variants];
					updatedVariants[variantIndex] = {
						...variant,
						stock: newStock,
					};

					await payload.update({
						collection: "products",
						id: item.productId,
						data: { variants: updatedVariants },
					});

					console.log(
						`Updated stock for product ${item.productId} (${item.name}), variant "${item.color}" (no sizes): ${currentStock} -> ${newStock}`
					);
				} else if (!item.size) {
					console.log(
						`Product ${item.productId} variant "${item.color}" has no sizes and no variant-level stock to deduct`
					);
				}
			} else {
				// Non-variant product - check top-level sizes
				if (product.sizes?.length && item.size) {
					const sizeIndex = product.sizes.findIndex(
						(s) => s.size === item.size
					);

					if (sizeIndex === -1) {
						console.warn(
							`Size "${item.size}" not found for product ${item.productId}`
						);
						continue;
					}

					const currentStock = product.sizes[sizeIndex].stock;
					if (currentStock === null || currentStock === undefined) {
						console.log(
							`Stock not tracked for size "${item.size}" of product ${item.productId}`
						);
						continue;
					}

					const newStock = Math.max(0, currentStock - item.quantity);

					const updatedSizes = [...product.sizes];
					updatedSizes[sizeIndex] = {
						...updatedSizes[sizeIndex],
						stock: newStock,
					};

					await payload.update({
						collection: "products",
						id: item.productId,
						data: {
							sizes: updatedSizes,
						},
					});

					console.log(
						`Updated stock for product ${item.productId} (${item.name}), size "${item.size}": ${currentStock} -> ${newStock}`
					);
				} else if (!item.size && product.stock != null) {
					// Non-variant product without sizes — deduct from product-level stock
					const currentStock = product.stock;
					const newStock = Math.max(0, currentStock - item.quantity);

					await payload.update({
						collection: "products",
						id: item.productId,
						data: { stock: newStock },
					});

					console.log(
						`Updated stock for product ${item.productId} (${item.name}) (no sizes): ${currentStock} -> ${newStock}`
					);
				} else {
					console.log(
						`Product ${item.productId} has no sizes or size not specified, no stock to deduct`
					);
				}
			}
		} catch (error) {
			console.error(
				`Failed to deduct stock for product ${item.productId}:`,
				error
			);
			// Continue processing other items even if one fails
		}
	}
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

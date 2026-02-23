/**
 * Order email notifications.
 * Implement with your provider (Resend, SendGrid, etc.) and set env vars as needed.
 */

export interface OrderConfirmationPayload {
	orderNumber: string;
	customerEmail: string;
	customerName?: string;
	total: number;
	itemsSummary?: string;
}

/**
 * Send "order placed" confirmation email after successful payment.
 * Called from the Stripe webhook when payment_intent.succeeded creates the order.
 */
export async function sendOrderConfirmationEmail(
	payload: OrderConfirmationPayload
): Promise<void> {
	// TODO: Integrate with Resend, SendGrid, or your email provider.
	// Example with Resend: await resend.emails.send({ from: '...', to: payload.customerEmail, subject: `Order ${payload.orderNumber} confirmed`, html: ... });
	console.log("[Order confirmation email]", {
		to: payload.customerEmail,
		orderNumber: payload.orderNumber,
		customerName: payload.customerName,
		total: payload.total,
	});
}

export type OrderStatus =
	| "pending"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled"
	| "refunded";

export interface OrderStatusUpdatePayload {
	orderNumber: string;
	customerEmail: string | null;
	customerName?: string | null;
	previousStatus: OrderStatus;
	newStatus: OrderStatus;
	trackingNumber?: string | null;
	trackingUrl?: string | null;
}

/**
 * Send "order status update" email when status changes (e.g. shipped, delivered).
 * Called from the Orders collection afterChange hook.
 */
export async function sendOrderStatusUpdateEmail(
	payload: OrderStatusUpdatePayload
): Promise<void> {
	if (!payload.customerEmail) return;

	// TODO: Integrate with your email provider. Include newStatus, trackingNumber, trackingUrl in the email.
	console.log("[Order status update email]", {
		to: payload.customerEmail,
		orderNumber: payload.orderNumber,
		previousStatus: payload.previousStatus,
		newStatus: payload.newStatus,
		trackingNumber: payload.trackingNumber,
		trackingUrl: payload.trackingUrl,
	});
}

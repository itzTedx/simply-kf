/**
 * Order email notifications using nodemailer and the order confirmation template.
 * Recipient email is the one collected in checkout (Stripe Elements form) and stored
 * on the Stripe charge as billing_details.email.
 */

import React from "react";

import { render } from "@react-email/render";
import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";

import OrderConfirmationEmail, {
	type OrderConfirmationEmailProps,
} from "@/modules/checkout/email/order-confirmation";

/** Minimal RFC-style check; form + Stripe already validate. */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalize and validate recipient email. Returns trimmed, lowercased email or null if invalid.
 * Use this for any email collected at checkout before sending notifications.
 */
export function normalizeAndValidateEmail(
	input: string | null | undefined
): string | null {
	if (input == null || typeof input !== "string") return null;
	const trimmed = input.trim().toLowerCase();
	if (!trimmed || !EMAIL_REGEX.test(trimmed)) return null;
	return trimmed;
}

/** Redact email for logs (avoid PII in production logs). */
function redactEmail(email: string): string {
	const at = email.indexOf("@");
	if (at <= 0) return "***";
	const local = email.slice(0, at);
	const domain = email.slice(at + 1);
	const show = local.length <= 2 ? (local[0] ?? "*") : local.slice(0, 2);
	return `${show}***@${domain}`;
}

function getTransporter(): Transporter | null {
	const host = process.env.SMTP_HOST;
	const port = process.env.SMTP_PORT;
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;

	if (!host || !user || !pass) {
		console.warn(
			"[Order email] SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS). Skipping send."
		);
		return null;
	}

	return nodemailer.createTransport({
		host,
		port: port ? Number.parseInt(port, 10) : 587,
		secure: process.env.SMTP_SECURE === "true",
		auth: { user, pass },
	});
}

/**
 * Send order confirmation email to the customer using the React Email template and nodemailer.
 * Uses the email collected at checkout (Stripe Elements form → confirmPayment → charge.billing_details.email).
 * Recipient is normalized and validated before send; invalid emails are skipped without throwing.
 */
export async function sendOrderConfirmationEmail(
	props: OrderConfirmationEmailProps,
	to: string
): Promise<void> {
	const recipient = normalizeAndValidateEmail(to);
	if (!recipient) {
		console.warn(
			"[Order confirmation email] Invalid or missing recipient, skipped",
			{
				orderNumber: props.orderNumber,
			}
		);
		return;
	}

	const transporter = getTransporter();
	if (!transporter) {
		console.log("[Order confirmation email] Skipped (no SMTP)", {
			orderNumber: props.orderNumber,
		});
		return;
	}

	const from =
		process.env.EMAIL_FROM ||
		process.env.SMTP_FROM ||
		`Simply KF <${process.env.SMTP_USER}>`;

	try {
		const html = await render(
			React.createElement(OrderConfirmationEmail, props)
		);

		await transporter.sendMail({
			from,
			to: recipient,
			subject: `Order ${props.orderNumber} confirmed – Simply KF`,
			html,
		});

		console.log("[Order confirmation email] Sent", {
			to: redactEmail(recipient),
			orderNumber: props.orderNumber,
		});
	} catch (err) {
		console.error("[Order confirmation email] Failed to send", {
			to: redactEmail(recipient),
			orderNumber: props.orderNumber,
			error: err instanceof Error ? err.message : String(err),
		});
		throw err;
	}
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

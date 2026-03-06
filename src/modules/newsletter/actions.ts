"use server";

import config from "@payload-config";
import { getPayload } from "payload";

import { normalizeAndValidateEmail } from "@/lib/notifications/order-emails";

type NewsletterResult =
	| {
			success: string;
			error?: undefined;
	  }
	| {
			success?: undefined;
			error: string;
	  };

export async function subscribeToNewsletter(
	formData: FormData
): Promise<NewsletterResult> {
	try {
		const rawEmail = formData.get("email");
		const email = normalizeAndValidateEmail(
			typeof rawEmail === "string" ? rawEmail : null
		);

		if (!email) {
			return {
				error: "Please enter a valid email address.",
			};
		}

		const source =
			typeof formData.get("source") === "string"
				? (formData.get("source") as string)
				: "homepage-newsletter";

		const payload = await getPayload({ config });

		try {
			await payload.create({
				collection: "newsletters",
				data: {
					email,
					source,
				},
			});
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message.toLowerCase() : "";

			if (message.includes("unique") && message.includes("email")) {
				return {
					success: "You’re already subscribed to the newsletter.",
				};
			}

			console.error("[subscribeToNewsletter] Failed to create signup", error);
			return {
				error: "Something went wrong. Please try again.",
			};
		}

		return {
			success: "You’ve been subscribed to the newsletter.",
		};
	} catch (error) {
		console.error("[subscribeToNewsletter] Unhandled error", error);
		return {
			error: "Something went wrong. Please try again.",
		};
	}
}


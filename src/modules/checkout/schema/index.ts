import { z } from "zod";

export const checkoutEmailSchema = z.object({
	email: z
		.email("Please enter a valid email address.")
		.min(1, "Please enter your email address."),
	phone: z
		.string()
		.min(1, "Please enter your phone number.")
		.regex(
			/^[0-9+\s()-]{7,20}$/,
			"Please enter a valid phone number."
		),
});

export type CheckoutEmailFormValues = z.infer<typeof checkoutEmailSchema>;

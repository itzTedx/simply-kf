import { z } from "zod";

export const checkoutEmailSchema = z.object({
	email: z
		.email("Please enter a valid email address.")
		.min(1, "Please enter your email address."),
});

export type CheckoutEmailFormValues = z.infer<typeof checkoutEmailSchema>;

import { parseAsStringLiteral } from "nuqs";

export const CHECKOUT_STEPS = ["cart", "checkout", "payment"] as const;
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

export const checkoutStepParser = parseAsStringLiteral(CHECKOUT_STEPS).withDefault(
	"cart",
);

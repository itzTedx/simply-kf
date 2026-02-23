"use client";

import { useEffect } from "react";

import { useCartStore } from "@/stores/cart-store";
export const ClearCart = () => {
	// When Stripe redirects here after 3DS, clear cart so it doesn't persist
	useEffect(() => {
		const params = new URLSearchParams(
			typeof window !== "undefined" ? window.location.search : ""
		);
		if (
			params.get("payment_intent") ||
			params.get("payment_intent_client_secret")
		) {
			useCartStore.getState().clearCart();
		}
	}, []);

	return null;
};

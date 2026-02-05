"use client";

import { useEffect } from "react";

import { useCartStore } from "@/stores/cart-store";

/**
 * Triggers rehydration of the persisted cart store on the client.
 * Required when using skipHydration: true with Next.js so cart data
 * from localStorage is loaded after mount and shows correctly on refresh.
 */
export function CartStoreHydration() {
	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);
	return null;
}

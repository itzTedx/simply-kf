"use client";

import { useCartStore } from "@/stores/cart-store";
export const CartDescription = () => {
	const items = useCartStore((state) => state.items);
	return items.length === 0
		? "Your bag is empty"
		: `${items.length} item${items.length === 1 ? "" : "s"}`;
};

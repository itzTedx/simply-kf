"use client";

import Link from "next/link";

import { RiShoppingBagLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/stores/cart-store";

export const CartButton = () => {
	const cartCount = useCartStore((state) => state.cartCount);
	return (
		<Link href="/cart">
			<Button
				className="relative text-charcoal/80 hover:text-charcoal"
				size="icon"
				variant="ghost"
			>
				<RiShoppingBagLine className="size-5" />
				<span className="sr-only">Cart</span>
				{cartCount > 0 && (
					<span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-accent font-body font-medium text-accent-foreground text-xs">
						{cartCount > 99 ? "99+" : cartCount}
					</span>
				)}
			</Button>
		</Link>
	);
};

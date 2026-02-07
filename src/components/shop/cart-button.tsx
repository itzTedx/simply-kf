"use client";

import Link from "next/link";

import { RiShoppingBagLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/stores/cart-store";

export const CartButton = () => {
	const cartCount = useCartStore((state) =>
		state.items.reduce((sum, item) => sum + item.quantity, 0)
	);
	return (
		<Link href="/cart">
			<Button
				className="relative text-foreground/75 hover:text-foreground"
				size="icon-sm"
				variant="ghost"
			>
				<RiShoppingBagLine className="size-4" />
				<span className="sr-only">Cart</span>
				{cartCount > 0 && (
					<span className="absolute -top-0.5 -right-0.5 flex size-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-body font-medium text-[0.65rem] text-primary-foreground">
						{cartCount > 99 ? "99+" : cartCount}
					</span>
				)}
			</Button>
		</Link>
	);
};

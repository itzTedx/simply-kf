"use client";

import { useEffect } from "react";

import Link from "next/link";

import { RiCheckLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/stores/cart-store";

export default function PaymentSuccessPage() {
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

	return (
		<main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-20 sm:px-6 md:py-28">
			<div className="w-full max-w-md rounded-(--radius) bg-card/50 px-8 py-12 text-center">
				<div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-foreground/10">
					<RiCheckLine className="size-7 text-foreground" />
				</div>
				<h1 className="mb-4 font-display font-normal text-2xl text-foreground">
					Thank you
				</h1>
				<p className="mb-8 font-body text-foreground/70 text-sm leading-relaxed">
					Your order has been placed. You will receive a confirmation email
					shortly.
				</p>
				<Link href="/shop">
					<Button className="w-full rounded-(--radius)" size="lg">
						Continue shopping
					</Button>
				</Link>
			</div>
		</main>
	);
}

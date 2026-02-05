"use client";

import { useEffect } from "react";

import Link from "next/link";

import { RiCheckLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
		<main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16 sm:px-6 md:py-24">
			<Card className="w-full max-w-md text-center shadow-lg">
				<CardHeader>
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<RiCheckLine className="h-8 w-8 text-green-600" />
					</div>
					<CardTitle className="font-bold text-2xl text-gray-900">
						Payment Successful!
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<p className="text-gray-600">
						Thank you for your purchase. Your order has been processed
						successfully. You will receive a confirmation email shortly.
					</p>

					<div className="pt-4">
						<Link href="/shop">
							<Button className="w-full bg-zinc-900 hover:bg-zinc-800">
								Continue Shopping
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}

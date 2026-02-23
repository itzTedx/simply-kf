import type { Metadata } from "next";
import Link from "next/link";

import { RiCheckLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { ClearCart } from "@/modules/checkout/components/clear-cart";

export const metadata: Metadata = {
	title: "Payment Successful",
	description:
		"Thank you for your purchase. Your order has been processed successfully.",
	robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
	return (
		<main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-20 sm:px-6 md:py-28">
			<ClearCart />
			<div className="w-full max-w-md rounded-lg bg-card/50 px-8 py-12 text-center">
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
					<Button className="w-full rounded-lg" size="lg">
						Continue shopping
					</Button>
				</Link>
			</div>
		</main>
	);
}

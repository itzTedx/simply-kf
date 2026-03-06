import { Suspense } from "react";

import type { Metadata } from "next";

import config from "@payload-config";
import { getPayload } from "payload";

import { CartDescription } from "@/modules/checkout/components/cart-description";
import type { ShippingGlobalConfig } from "@/modules/checkout/shipping";

import { CartContent } from "./cart-content";

export const metadata: Metadata = {
	title: "Shopping Cart",
	description: "Review your SIMPLY KF cart and proceed to secure checkout.",
	robots: { index: false, follow: true },
};

function CartFallback() {
	return (
		<main className="container mx-auto max-w-7xl py-20 md:py-28">
			<div className="mb-10 md:mb-12">
				<div className="mb-2 h-8 w-32 animate-pulse rounded bg-muted" />
				<div className="h-4 w-48 animate-pulse rounded bg-muted" />
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="h-64 animate-pulse rounded-lg bg-muted lg:col-span-2" />
				<div className="h-64 animate-pulse rounded-lg bg-muted" />
			</div>
		</main>
	);
}

export default async function CartPage() {
	const payload = await getPayload({ config });

	let shippingConfig: ShippingGlobalConfig | undefined;

	try {
		const shippingSettings = await payload.findGlobal({
			slug: "shipping-settings",
		});

		shippingConfig = {
			baseFee: shippingSettings.defaultShippingFee,
			freeShippingThreshold:
				shippingSettings.freeShippingThreshold ??
				shippingSettings.defaultShippingFee,
			enableFreeShipping: Boolean(shippingSettings.enableFreeShipping),
		};
	} catch (err) {
		console.error(
			"[CartPage] Failed to load shipping-settings global, falling back to defaults",
			err
		);
	}

	return (
		<main className="container mx-auto max-w-7xl py-20 md:py-28">
			<div className="mb-10 md:mb-12">
				<h1 className="mb-2 font-display font-normal text-2xl text-foreground tracking-tight md:text-3xl">
					Your bag
				</h1>
				<CartDescription />
			</div>
			<Suspense fallback={<CartFallback />}>
				<CartContent shippingConfig={shippingConfig} />
			</Suspense>
		</main>
	);
}

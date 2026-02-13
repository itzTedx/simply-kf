import { Suspense } from "react";

import type { Metadata } from "next";

import { ShopHeader } from "@/components/shop/shop-header";

import { getProducts } from "@/modules/products/query";
import { ShopPageContent } from "@/modules/views/shop-page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: "Shop Premium Gulf-Style Abayas Online - Simply KF",
	description:
		"Browse Simply KF’s collection of premium Gulf-style abayas. Discover modest, elegant abayas for everyday wear and special occasions, available for customers across the GCC and UK.",
	alternates: {
		canonical: "/shop",
	},
	keywords: [
		"abayas",
		"abaya shop",
		"abaya online",
		"Gulf abayas",
		"Khaleeji abayas",
		"modest abaya",
		"abaya GCC",
		"abaya UK",
		"occasion abaya",
		"everyday abaya",
	],
	openGraph: {
		type: "website",
		url: `${SITE_URL}/shop`,
		title: "Shop Abayas | Simply KF",
		description:
			"Explore Simply KF’s curated selection of premium Gulf-style abayas with modest, elegant designs for everyday wear and events.",
		siteName: "Simply KF",
	},
	twitter: {
		card: "summary_large_image",
		title: "Shop Abayas | Simply KF",
		description:
			"Discover premium Gulf-style abayas from Simply KF, crafted for modest, elegant dressing across the GCC and UK.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function ShopPage() {
	const products = await getProducts();

	return (
		<main className="min-h-screen overflow-hidden">
			{/* 1. Page Intro */}
			<ShopHeader />
			<Suspense
				fallback={
					<div className="flex items-center justify-center py-20 text-center md:py-28">
						Loading...
					</div>
				}
			>
				<ShopPageContent initialProducts={products} />
			</Suspense>
		</main>
	);
}

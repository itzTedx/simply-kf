import { Suspense } from "react";

import { ShopHeader } from "@/components/shop/shop-header";

import { getProducts } from "@/modules/products/query";
import { ShopPageContent } from "@/modules/views/shop-page";

export default async function ShopPage() {
	const products = await getProducts();

	console.log("products :", products);

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

import Link from "next/link";

import { getProducts } from "@/modules/products/query";

import { ProductCard } from "../shop/product-card";

// const FEATURED_COUNT = 6;

export async function FeaturedProducts() {
	const products = await getProducts();

	if (products.length === 0) return null;

	return (
		<section className="bg-background px-4 py-16 md:px-6 md:py-24">
			<div className="container mx-auto max-w-6xl">
				<div className="mb-10 text-center md:mb-20">
					<p className="font-body text-[0.6875rem] text-foreground/50 uppercase tracking-[0.2em]">
						The edit
					</p>
					<h2 className="mt-3 font-display font-normal text-foreground text-xl tracking-tight md:text-3xl">
						Shop the collection
					</h2>
					<p className="mx-auto mt-3 max-w-md font-body text-foreground/65 text-sm leading-relaxed md:mt-4">
						A curated selection of timeless abayas and essentials.
					</p>
				</div>

				<div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:grid-cols-3 md:gap-y-16">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				<div className="mt-12 text-center md:mt-20">
					<Link
						className="inline-block font-body text-foreground/65 text-xs tracking-wide underline-offset-4 transition-colors hover:text-foreground/90 hover:underline"
						href="/shop"
					>
						View all pieces
					</Link>
				</div>
			</div>
		</section>
	);
}

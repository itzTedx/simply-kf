import Image from "next/image";
import Link from "next/link";

import { PRODUCTS } from "@/constants/products";

const FEATURED_COUNT = 6;

export function FeaturedProducts() {
	const featured = PRODUCTS.filter((p) => p.availability === "in-stock").slice(
		0,
		FEATURED_COUNT
	);

	if (featured.length === 0) return null;

	return (
		<section className="bg-background px-4 py-16 md:px-6 md:py-32">
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
					{featured.map((product) => (
						<Link
							className="group block"
							href={`/shop/${product.slug}`}
							key={product.id}
						>
							<div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-muted/40 active:opacity-95 md:rounded-sm">
								<Image
									alt={product.name}
									className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
									fill
									sizes="(max-width: 768px) 50vw, 33vw"
									src={product.images[0]}
								/>
							</div>
							<div className="mt-3 space-y-0.5 text-center md:mt-5 md:space-y-1 md:text-left">
								<h3 className="font-display font-normal text-[0.8125rem] text-foreground md:text-[0.9375rem]">
									{product.name}
								</h3>
								<p className="font-body text-foreground/50 text-xs">
									Designed in Dubai
								</p>
								<p className="font-body text-foreground text-sm">
									£{product.price}
								</p>
							</div>
						</Link>
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

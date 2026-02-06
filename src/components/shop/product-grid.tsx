import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Product } from "@/constants/products";

interface ProductGridProps {
	products: Product[];
	onClearFilters?: () => void;
}

export function ProductGrid({ products, onClearFilters }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className="py-20 text-center md:py-28">
				<p className="font-body text-foreground/65 text-sm">
					No pieces match your selection.
				</p>
				{onClearFilters && (
					<Button
						className="mt-4 font-body text-foreground/80"
						onClick={onClearFilters}
						variant="link"
					>
						Clear all filters
					</Button>
				)}
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 md:grid-cols-3 md:gap-y-16">
				{products.map((product) => (
					<Link
						className="group block space-y-4"
						href={`/shop/${product.slug}`}
						key={product.id}
					>
						{product.images && (
							<div className="relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted/40">
								<Image
									alt={product.name}
									className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
									fill
									sizes="(max-width: 768px) 50vw, 33vw"
									src={product.images[0]}
								/>
							</div>
						)}
						<div className="space-y-1 text-center md:text-left">
							<h3 className="font-display font-normal text-foreground text-sm md:text-[0.9375rem]">
								{product.name}
							</h3>
							<p className="font-body text-foreground/50 text-xs">
								Designed in Dubai
							</p>
							<p className="pt-0.5 font-body text-foreground text-sm">
								£{product.price}
							</p>
						</div>
					</Link>
				))}
			</div>

			<div className="flex justify-center pt-16 md:pt-20">
				<Button
					className="font-body text-foreground/70 text-xs tracking-wide"
					variant="outline"
				>
					Load More
				</Button>
			</div>
		</>
	);
}

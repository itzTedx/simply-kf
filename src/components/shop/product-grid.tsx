import { Button } from "@/components/ui/button";

import { Product } from "@/constants/products";

import { ProductCard } from "./product-card";

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
					<ProductCard key={product.id} product={product} />
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

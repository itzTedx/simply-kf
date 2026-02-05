import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductGridProps {
	products: Product[];
	onClearFilters?: () => void;
}

export function ProductGrid({ products, onClearFilters }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className="py-24 text-center">
				<p className="font-body text-muted-foreground">
					No pieces match your selection.
				</p>
				{onClearFilters && (
					<Button
						className="mt-4 text-zinc-900"
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
			<div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 md:grid-cols-3 xl:grid-cols-3">
				{products.map((product) => (
					<Link
						className="group block space-y-4"
						href={`/shop/${product.slug}`}
						key={product.id}
					>
						{product.images && (
							<div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-zinc-100">
								<Image
									alt={product.name}
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									fill
									sizes="(max-width: 768px) 50vw, 33vw"
									src={product.images[0]}
								/>
							</div>
						)}

						{/* Product Info */}
						<div className="space-y-1 text-center md:text-left">
							<h3 className="font-display text-sm text-zinc-900 md:text-base">
								{product.name}
							</h3>
							<p className="font-body text-muted-foreground text-xs">
								Designed in Dubai
							</p>
							<p className="pt-1 font-body font-medium text-sm text-zinc-900">
								AED{product.price}
							</p>
						</div>
					</Link>
				))}
			</div>

			{/* Load More */}
			<div className="flex justify-center pt-16 md:pt-24">
				<Button
					className="rounded-none border-zinc-200 px-12 py-6 text-xs text-zinc-900 uppercase tracking-widest hover:bg-zinc-50 hover:text-zinc-900"
					variant="outline"
				>
					Load More
				</Button>
			</div>
		</>
	);
}

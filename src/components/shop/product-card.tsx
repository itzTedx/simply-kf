import Image from "next/image";
import Link from "next/link";

import { getProductDefaultImage, type Product } from "@/constants/products";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Link className="group block space-y-4" href={`/shop/${product.slug}`}>
			{getProductDefaultImage(product) && (
				<div className="relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted/40">
					{product.availability === "pre-order" && (
						<div className="absolute top-2 right-2 z-10 rounded-md bg-background/30 px-2 py-1 text-foreground text-xs">
							Pre-order
						</div>
					)}
					<Image
						alt={product.name}
						className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						fill
						sizes="(max-width: 768px) 50vw, 33vw"
						src={getProductDefaultImage(product)}
					/>
				</div>
			)}
			<div className="space-y-1 text-center md:text-left">
				<h3 className="font-display font-normal text-foreground text-lg md:text-xl">
					{product.name}
				</h3>

				<p className="pt-0.5 font-body font-medium text-foreground text-sm">
					£{product.price}
				</p>
			</div>
		</Link>
	);
}

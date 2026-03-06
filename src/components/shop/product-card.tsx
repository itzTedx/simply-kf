import Link from "next/link";

import { getProductDefaultImage } from "@/constants/products";
import type { Product } from "@/payload-types";

import { Media } from "../payload/media";
import { Badge } from "../ui/badge";

type ProductSize = NonNullable<Product["sizes"]>[number];
type ProductVariant = NonNullable<Product["variants"]>[number];

function isProductOutOfStock(product: Partial<Product>): boolean {
	let anyTracked = false;
	let anyInStock = false;

	// Top‑level stock (no sizes)
	if (typeof product.stock === "number") {
		anyTracked = true;
		if (product.stock > 0) anyInStock = true;
	}

	// Top‑level sizes
	const sizes = product.sizes as ProductSize[] | undefined;
	if (Array.isArray(sizes)) {
		for (const size of sizes) {
			if (typeof size?.stock === "number") {
				anyTracked = true;
				if (size.stock > 0) anyInStock = true;
			}
		}
	}

	// Variant‑level stock and sizes
	const variants = product.variants as ProductVariant[] | undefined;

	if (Array.isArray(variants)) {
		for (const variant of variants) {
			if (typeof variant?.stock === "number") {
				anyTracked = true;
				if (variant.stock > 0) anyInStock = true;
			}

			if (Array.isArray(variant?.sizes)) {
				for (const size of variant.sizes) {
					if (typeof size?.stock === "number") {
						anyTracked = true;
						if (size.stock > 0) anyInStock = true;
					}
				}
			}
		}
	}

	const result = anyTracked && !anyInStock;

	return result;
}

interface ProductCardProps {
	product: Partial<Product>;
}

export function ProductCard({ product }: ProductCardProps) {
	const isOutOfStock =
		isProductOutOfStock(product) && product.availability !== "pre-order";

	return (
		<Link className="group block space-y-4" href={`/shop/${product.slug}`}>
			{getProductDefaultImage(product) && (
				<div className="relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted/40">
					{isOutOfStock && (
						<Badge
							className="absolute top-2 right-2 z-10"
							variant="destructive"
						>
							Out of stock
						</Badge>
					)}
					{product.availability === "pre-order" && (
						<div className="absolute top-2 right-2 z-10 rounded-md bg-linear-to-br from-amber-500/80 to-amber-400/80 px-2 py-1 font-medium text-amber-950 text-xs backdrop-blur-lg">
							Pre-order
						</div>
					)}
					<Media
						alt={product.name ?? ""}
						fill
						imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						src={getProductDefaultImage(product)}
					/>
					{/* <Image
						alt={product.name ?? ""}
						className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						fill
						sizes="(max-width: 768px) 50vw, 33vw"
						src={getProductDefaultImage(product)}
					/> */}
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

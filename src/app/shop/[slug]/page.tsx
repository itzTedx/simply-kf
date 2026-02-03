import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import { PRODUCTS } from "@/data/products";

import { ProductView } from "./product-view";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return PRODUCTS.map((product) => ({
		slug: product.slug,
	}));
}

export default async function ProductPage({ params }: PageProps) {
	const { slug } = await params;
	const product = PRODUCTS.find((p) => p.slug === slug);

	if (!product) {
		notFound();
	}

	// Related products logic: same category, exclude current, limit to 4
	const relatedProducts = PRODUCTS.filter(
		(p) => p.category === product.category && p.slug !== product.slug
	).slice(0, 4);

	return (
		<main className="min-h-screen pt-32 pb-24 lg:pt-40">
			<div className="container mx-auto px-4">
				{/* Back Link */}
				<div className="mb-8 lg:mb-12">
					<Link
						className="text-xs text-zinc-500 uppercase tracking-widest transition-colors hover:text-zinc-900"
						href="/shop"
					>
						← Back to {product.category}
					</Link>
				</div>

				{/* Main Product View */}
				<ProductView product={product} />

				{/* Editorial Section */}
				<section className="mx-auto mt-32 max-w-2xl space-y-6 text-center">
					<span className="font-serif text-xs text-zinc-500 italic">
						The Philosophy
					</span>
					<h2 className="font-display text-3xl text-zinc-900 leading-tight lg:text-4xl">
						&quot;Modesty is not about hiding. It is about revealing your
						dignity with grace.&quot;
					</h2>
					<p className="font-light text-zinc-500 leading-relaxed">
						Designed in Dubai, Simply KF embodies the essence of quiet luxury.
						Each piece is crafted to transcend trends, offering timeless
						elegance for the woman who walks with purpose.
					</p>
				</section>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<section className="mt-32 border-zinc-100 border-t pt-24">
						<div className="mb-12 flex flex-col items-center justify-between md:flex-row">
							<h3 className="font-display text-2xl text-zinc-900">
								More from {product.category}
							</h3>
							<Link
								className="hidden text-xs text-zinc-500 uppercase tracking-widest transition-colors hover:text-zinc-900 md:block"
								href={`/shop?category=${product.category}`}
							>
								View All
							</Link>
						</div>

						<div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
							{relatedProducts.map((item) => (
								<Link
									className="group"
									href={`/shop/${item.slug}`}
									key={item.id}
								>
									<div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm bg-zinc-50">
										<Image
											alt={item.name} // Fallback to singular image if needed, though we updated types
											className="object-cover transition-transform duration-700 group-hover:scale-105"
											fill
											sizes="(max-width: 768px) 50vw, 25vw"
											src={item.images[0] || item.image}
										/>
										<div className="absolute inset-x-0 bottom-0 translate-y-full p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
											<Button className="h-10 w-full bg-white/90 text-xs text-zinc-900 uppercase tracking-wider shadow-sm backdrop-blur-sm hover:bg-white">
												Quick View
											</Button>
										</div>
									</div>
									<div className="space-y-1 text-center md:text-left">
										<h4 className="font-display text-lg text-zinc-900 leading-none">
											{item.name}
										</h4>
										<p className="font-light text-sm text-zinc-500">
											£{item.price}
										</p>
									</div>
								</Link>
							))}
						</div>

						<div className="mt-12 text-center md:hidden">
							<Link
								className="border-zinc-300 border-b pb-1 text-xs text-zinc-500 uppercase tracking-widest transition-colors hover:text-zinc-900"
								href={`/shop?category=${product.category}`}
							>
								View All {product.category}
							</Link>
						</div>
					</section>
				)}
			</div>
		</main>
	);
}

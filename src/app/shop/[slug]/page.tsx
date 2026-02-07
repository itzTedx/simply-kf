import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PRODUCTS } from "@/constants/products";

import { ProductView } from "./product-view";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return PRODUCTS.map((product) => ({
		slug: product.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const product = PRODUCTS.find((p) => p.slug === slug);
	if (!product) return { title: "Product Not Found" };

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";
	const imageUrl = product.images[0]?.startsWith("http")
		? product.images[0]
		: `${siteUrl}${product.images[0]}`;

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: `${product.name} | Simply KF`,
			description: product.description,
			images: [{ url: imageUrl, alt: product.name }],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${product.name} | Simply KF`,
			description: product.description,
		},
	};
}

export default async function ProductPage({ params }: PageProps) {
	const { slug } = await params;
	const product = PRODUCTS.find((p) => p.slug === slug);

	if (!product) {
		notFound();
	}

	// Related products logic: same category, exclude current, limit to 4
	const relatedProducts = PRODUCTS.filter(
		(p) => p.collection === product.collection && p.slug !== product.slug
	).slice(0, 4);

	return (
		<main className="min-h-screen pt-16 pb-24 md:pt-20 md:pb-28">
			<div className="container mx-auto max-w-6xl px-4 md:px-6">
				<div className="mb-4 sm:mb-10 md:mb-14">
					<Link
						className="font-body text-foreground/55 text-xs tracking-wide transition-colors hover:text-foreground/90"
						href="/shop"
					>
						← Back to Shop
					</Link>
				</div>

				<ProductView product={product} />

				<section className="mx-auto mt-28 max-w-2xl space-y-6 text-center md:mt-36">
					<span className="font-body text-[0.6875rem] text-foreground/45 uppercase tracking-[0.15em]">
						The Philosophy
					</span>
					<h2 className="font-display font-normal text-2xl text-foreground leading-tight md:text-3xl lg:text-4xl">
						&quot;Modesty is not about hiding. It is about revealing your
						dignity with grace.&quot;
					</h2>
					<p className="font-body text-foreground/65 text-sm leading-relaxed md:text-base">
						Designed in Dubai, Simply KF embodies quiet luxury. Each piece is
						crafted to transcend trends, offering timeless elegance for the
						woman who walks with purpose.
					</p>
				</section>

				{relatedProducts.length > 0 && (
					<section className="mt-28 border-border/30 border-t pt-20 md:mt-36 md:pt-24">
						<div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
							<h3 className="font-display font-normal text-foreground text-xl md:text-2xl">
								More from {product.collection}
							</h3>
							<Link
								className="hidden font-body text-foreground/55 text-xs tracking-wide transition-colors hover:text-foreground/85 md:block"
								href={`/shop?collection=${product.collection}`}
							>
								View all
							</Link>
						</div>

						<div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
							{relatedProducts.map((item) => (
								<Link
									className="group block"
									href={`/shop/${item.slug}`}
									key={item.id}
								>
									<div className="relative mb-4 aspect-3/4 overflow-hidden rounded-sm bg-muted/40">
										<Image
											alt={item.name}
											className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
											fill
											sizes="(max-width: 768px) 50vw, 25vw"
											src={item.images[0]}
										/>
									</div>
									<div className="space-y-1 text-center md:text-left">
										<h4 className="font-display font-normal text-foreground text-sm md:text-base">
											{item.name}
										</h4>
										<p className="font-body text-foreground/65 text-sm">
											£{item.price}
										</p>
									</div>
								</Link>
							))}
						</div>

						<div className="mt-10 text-center md:hidden">
							<Link
								className="font-body text-foreground/55 text-xs tracking-wide transition-colors hover:text-foreground/85"
								href={`/shop?collection=${product.collection}`}
							>
								View all {product.collection}
							</Link>
						</div>
					</section>
				)}
			</div>
		</main>
	);
}

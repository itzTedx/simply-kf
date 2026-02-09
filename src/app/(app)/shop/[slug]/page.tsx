import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/shop/product-card";

import { getProductDefaultImage } from "@/constants/products";
import { getProductBySlug, getProducts } from "@/modules/products/query";
import type { Product } from "@/payload-types";

import { ProductView } from "./product-view";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const products = await getProducts();

	return products.map((product) => ({
		slug: product.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const product = await getProductBySlug(slug);
	if (!product) return { title: "Product Not Found" };

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";
	const defaultImage = getProductDefaultImage(product);
	const imageUrl =
		defaultImage && !defaultImage.startsWith("http")
			? `${siteUrl}${defaultImage}`
			: defaultImage;

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: `${product.name} | Simply KF`,
			description: product.description,
			images:
				defaultImage && imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
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
	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	// Related products: use product.relatedProducts when set, otherwise fall back to other published products
	const resolvedRelated =
		product.relatedProducts?.filter(
			(r): r is Product => typeof r === "object" && r?._status === "published"
		) ?? [];
	const relatedProducts =
		resolvedRelated.length > 0
			? resolvedRelated.slice(0, 4)
			: (await getProducts()).filter((p) => p.id !== product.id).slice(0, 4);

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

				<ProductView product={product as Product} />

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
								You may also like
							</h3>
						</div>

						<div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
							{relatedProducts.map((item) => (
								<ProductCard key={item.id} product={item} />
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
}

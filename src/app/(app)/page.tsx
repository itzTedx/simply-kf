import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CraftQuality } from "@/components/home/craft-quality";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { ProductHighlight } from "@/components/home/product-highlight";
import { ReelsShowcaseSection } from "@/components/home/reels-showcase-section";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title:
		"Simply KF - Premium Gulf-Style Abayas Online, Handcrafted Jewelry & Elegant Accessories",
	description:
		"Discover Simply KF’s premium Gulf-style abayas. Shop curated collections of modest, elegant abayas designed for everyday wear and special occasions across the GCC and UK.",
	alternates: {
		canonical: "/",
	},
	keywords: [
		"Simply KF",
		"abayas",
		"abaya online",
		"Gulf abayas",
		"Khaleeji abayas",
		"modest fashion",
		"abaya GCC",
		"abaya UK",
		"black abaya",
		"everyday abaya",
		"occasion abaya",
	],
	applicationName: "Simply KF",
	openGraph: {
		type: "website",
		url: SITE_URL,
		title: "Simply KF | Premium Gulf-Style Abayas Online",
		description:
			"Explore Simply KF’s curated selection of premium Gulf-style abayas with modest, elegant designs for everyday wear and events across the GCC and UK.",
		siteName: "Simply KF",
		images: [
			{
				url: "/images/banner-1.webp",
				width: 1600,
				height: 500,
				alt: "Simply KF premium Gulf-style abayas banner",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Simply KF | Premium Gulf-Style Abayas Online",
		description:
			"Shop Simply KF’s premium Gulf-style abayas with modest, elegant cuts, available for customers across the GCC and UK.",
		images: ["/images/banner-1.webp"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function Home() {
	return (
		<main className="min-h-screen">
			<Hero />
			<FeaturedProducts />
			<section className="md:pb-28">
				<div className="container relative mx-auto aspect-16/5 max-w-6xl overflow-hidden rounded-md">
					<Link href="/shop?availability=sales">
						<Image
							alt="Hero"
							className="object-cover"
							fill
							src="/images/banner-1.webp"
						/>
					</Link>
				</div>
			</section>
			{/* <FeaturedCollections /> */}
			<ProductHighlight />
			<ReelsShowcaseSection />
			<CraftQuality />
			{/* <JournalPreview /> */}
			<Newsletter />
		</main>
	);
}

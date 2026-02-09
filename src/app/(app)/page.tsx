import Image from "next/image";
import Link from "next/link";

import { CraftQuality } from "@/components/home/craft-quality";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { ProductHighlight } from "@/components/home/product-highlight";
import { ReelsShowcaseSection } from "@/components/home/reels-showcase-section";

export default async function Home() {
	return (
		<main className="min-h-screen">
			<Hero />
			<FeaturedProducts />
			<section className="container relative mx-auto aspect-16/5 max-w-6xl overflow-hidden rounded-md">
				<Link href="/shop?availability=sales">
					<Image
						alt="Hero"
						className="object-cover"
						fill
						src="/images/banner-1.webp"
					/>
				</Link>
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

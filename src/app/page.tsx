import Image from "next/image";

import { CraftQuality } from "@/components/home/craft-quality";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { ProductHighlight } from "@/components/home/product-highlight";
import { ReelsShowcase } from "@/components/home/reels-showcase";

export default function Home() {
	return (
		<main className="min-h-screen">
			<Hero />
			<FeaturedProducts />
			<section className="container relative mx-auto aspect-16/5 max-w-6xl overflow-hidden rounded-md">
				<Image
					alt="Hero"
					className="object-cover"
					fill
					src="/images/banner-1.webp"
				/>
			</section>
			<FeaturedCollections />
			<ProductHighlight />
			<ReelsShowcase />
			<CraftQuality />
			{/* <JournalPreview /> */}
			<Newsletter />
		</main>
	);
}

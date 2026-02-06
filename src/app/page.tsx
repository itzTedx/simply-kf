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
			<FeaturedCollections />
			<FeaturedProducts />
			<ProductHighlight />
			<ReelsShowcase />
			<CraftQuality />
			{/* <JournalPreview /> */}
			<Newsletter />
		</main>
	);
}

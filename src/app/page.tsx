import { CraftQuality } from "@/components/home/craft-quality";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { JournalPreview } from "@/components/home/journal-preview";
import { Newsletter } from "@/components/home/newsletter";
import { ProductHighlight } from "@/components/home/product-highlight";
import { ReelsShowcase } from "@/components/home/reels-showcase";

export default function Home() {
	return (
		<main className="min-h-screen">
			<Hero />
			<FeaturedCollections />
			<ProductHighlight />
			<ReelsShowcase />
			<CraftQuality />
			<JournalPreview />
			<Newsletter />
		</main>
	);
}

import { BrandPillars } from "@/components/home/brand-pillars";
import { CraftQuality } from "@/components/home/craft-quality";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { JournalPreview } from "@/components/home/journal-preview";
import { Newsletter } from "@/components/home/newsletter";
import { ProductHighlight } from "@/components/home/product-highlight";

export default function Home() {
	return (
		<main>
			<Hero />
			<BrandPillars />
			<FeaturedCollections />
			<ProductHighlight />
			<CraftQuality />
			<JournalPreview />
			<Newsletter />
		</main>
	);
}

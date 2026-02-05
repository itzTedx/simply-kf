import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Shop Abayas & Modest Essentials",
	description:
		"Shop our collection of timeless abayas, Eid pieces, and modest essentials. Designed in Dubai, curated for the UK. Filter by collection, color, material and more.",
};

export default function ShopLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}

export const collections = [
	{
		id: "essentials",
		title: "Essentials",
		description: "Refined everyday abayas designed for effortless wear.",
		image: "/images/collections/collection-1.webp",
	},
	{
		id: "statement",
		title: "Statement Abayas",
		description: "Elevated designs crafted for presence and quiet confidence.",
		image: "/images/collections/collection-2.webp",
	},
	{
		id: "limited",
		title: "Limited Editions",
		description: "Small-batch designs created in limited quantities.",
		image: "/images/collections/collection-3.webp",
	},
	{
		id: "modest-essentials",
		title: "Modest Essentials",
		description: "Foundational pieces designed to complement every wardrobe.",
		image: "/images/featured.webp",
	},
];

export type Collection = {
	id: string;
	title: string;
	slug: string;
	description: string;
	type: "category" | "editorial" | "seasonal" | "color";
	image: `/images/collections/${string}.webp`;
};

export const COLLECTIONS: Collection[] = [
	{
		id: "abayas",
		title: "Abayas",
		slug: "abayas",
		description:
			"Timeless abayas crafted with elegance, designed for modern modest wear.",
		type: "category",
		image: "/images/collections/collection-1.webp",
	},
	{
		id: "kaftans",
		title: "Kaftans",
		slug: "kaftans",
		description:
			"Flowing kaftans designed for comfort, elegance, and special occasions.",
		type: "category",
		image: "/images/collections/collection-2.webp",
	},

	{
		id: "eid-collection",
		title: "Eid Collection",
		slug: "eid",
		description:
			"Celebration-ready designs curated especially for Eid occasions.",
		type: "seasonal",
		image: "/images/collections/collection-3.webp",
	},
];

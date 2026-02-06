export const collections = [
	{
		id: "current",
		title: "Current Collection",
		description:
			"Available now - our latest designs ready for immediate delivery.",
		image: "/images/collections/collection-1.webp",
	},
	{
		id: "upcoming",
		title: "Upcoming Collection",
		description:
			"Coming soon - exclusive designs launching in the near future.",
		image: "/images/collections/collection-2.webp",
	},
	{
		id: "all",
		title: "All Collections",
		description: "Complete collection - explore our entire range of designs.",
		image: "/images/collections/collection-3.webp",
	},
];

export type Collection = {
	id: string;
	title: string;
	slug: string;
	description: string;
	type: "current" | "eid" | "all";
	image: `/images/collections/${string}.webp`;
};

export const COLLECTIONS: Collection[] = [
	{
		id: "abaya-collection",
		title: "Abaya Collection",
		slug: "in-stock",
		description:
			"Available now - our latest designs ready for immediate delivery.",
		type: "current",
		image: "/images/collections/collection-1.webp",
	},
	{
		id: "eid-collection",
		title: "Eid Collection",
		slug: "pre-order",
		description: "Exclusive designs launching in the near future.",
		type: "eid",
		image: "/images/collections/collection-2.webp",
	},
	{
		id: "all-collection",
		title: "All Collections",
		slug: "all",
		description: "Complete collection - explore our entire range of designs.",
		type: "all",
		image: "/images/collections/collection-3.webp",
	},
];

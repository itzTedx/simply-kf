export type Product = {
	id: string;
	name: string;
	slug: string;
	category: "abaya" | "kaftan";
	collection: "current" | "upcoming";
	description: string;
	features: string[];
	colors: string[];
	size: string;
	material: string;
	length?: string;
	includes: string[];
	images: string[];
	availability: "in-stock" | "upcoming";
};

export const PRODUCTS: Product[] = [
	{
		id: "sheikha-abaya",
		name: "Sheikha Abaya",
		slug: "sheikha-abaya",
		category: "abaya",
		collection: "current",
		description:
			"Introducing our designer abaya gown with full sequin work on both the front and back, created for those who love to stand out with elegance. This piece comes with a white plain inner that can be paired effortlessly with other outfits, offering versatility beyond a single look.",
		features: [
			"Full front and back sequin detailing",
			"Hand-made with premium fabric",
			"Elegant and classy finish",
			"Perfect for parties and weddings",
		],
		colors: ["Cream", "Beauty Hold", "Black", "Grey", "Dusty Rose"],
		size: "One size fits all",
		material: "Premium fabric with sequin work",
		includes: ["Matching belt", "Matching scarf", "White plain inner"],
		images: [],
		availability: "in-stock",
	},

	{
		id: "qamar-abaya",
		name: "Qamar Abaya",
		slug: "qamar-abaya",
		category: "abaya",
		collection: "current",
		description:
			"Introducing our chiffon abaya gown designed for effortless grace. The gown features a unique 3D crushed inner that adds depth and dimension, making it visually striking while remaining versatile enough to pair with other dresses or gowns.",
		features: [
			"3D crushed inner design",
			"Lightweight and breathable chiffon fabric",
			"Tieable long sleeves for adjustable fit",
			"Elegant and versatile silhouette",
		],
		colors: ["Black"],
		size: "One size fits all",
		material: "Chiffon",
		includes: ["Matching belt", "Matching scarf"],
		images: [],
		availability: "in-stock",
	},

	{
		id: "velvet-kaftan",
		name: "Velvet Kaftan",
		slug: "velvet-kaftan",
		category: "kaftan",
		collection: "upcoming",
		description:
			"Introducing our velvet kaftan — a timeless piece designed for elegance and comfort. Featuring a batwing silhouette with detailed front and back work, this kaftan is perfect for special occasions, Eid wear, or evening gatherings.",
		features: [
			"Batwing design",
			"Front and back detailing",
			"Soft and luxurious velvet fabric",
			"Comfortable and flattering fit",
		],
		colors: ["Black", "Deep Maroon", "Emerald Green"],
		size: "One size fits all",
		material: "Velvet",
		length: "Approximately 54–56 inches",
		includes: [],
		images: [],
		availability: "upcoming",
	},
];

export type Product = {
	id: string;
	name: string;
	slug: string;
	collection: "abaya" | "eid" | "all";
	description: string;
	features: string[];
	colors: string[];
	size: string;
	material: string;
	length?: string;
	includes: string[];
	images: string[];
	availability: "in-stock" | "upcoming";
	price: number;
};

export const PRODUCTS: Product[] = [
	{
		id: "sheikha-abaya",
		name: "Sheikha Abaya",
		slug: "sheikha-abaya",
		collection: "abaya",
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
		images: ["/images/products/sheikha-abaya-1.webp"],
		availability: "in-stock",
		price: 450,
	},

	{
		id: "qamar-abaya",
		name: "Qamar Abaya",
		slug: "qamar-abaya",
		collection: "abaya",
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
		images: ["/images/products/qamar-abaya-1.webp"],
		availability: "in-stock",
		price: 380,
	},

	{
		id: "velvet-kaftan",
		name: "Velvet Kaftan",
		slug: "velvet-kaftan",
		collection: "abaya",
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
		images: ["/images/products/velvet-kaftan.webp"],
		availability: "upcoming",
		price: 520,
	},

	{
		id: "classic-abaya",
		name: "Classic Abaya",
		slug: "classic-abaya",
		collection: "eid",
		description:
			"A timeless classic abaya that never goes out of style. Simple, elegant, and versatile - perfect for any occasion.",
		features: [
			"Classic design",
			"Premium fabric",
			"Versatile styling",
			"Comfortable fit",
		],
		colors: ["Black", "Navy", "Brown"],
		size: "One size fits all",
		material: "Premium crepe",
		includes: ["Matching scarf"],
		images: ["/images/products/qamar-abaya-1.webp"],
		availability: "in-stock",
		price: 320,
	},

	{
		id: "silk-kaftan",
		name: "Silk Kaftan",
		slug: "silk-kaftan",
		collection: "eid",
		description:
			"Luxurious silk kaftan with intricate embroidery. Perfect for special occasions and formal events.",
		features: [
			"Premium silk fabric",
			"Hand embroidery",
			"Elegant drape",
			"Luxurious feel",
		],
		colors: ["Gold", "Silver", "Maroon"],
		size: "One size fits all",
		material: "Silk",
		length: "Approximately 58 inches",
		includes: ["Matching belt"],
		images: ["/images/products/qamar-abaya-1.webp"],
		availability: "in-stock",
		price: 680,
	},
];

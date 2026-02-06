export type Product = {
	id: string;
	name: string;
	slug: string;
	collection: "abaya" | "eid" | "all";
	description: string;
	features: string[];
	colors: string[];
	size: string | number[];
	material: string;
	length?: string;
	includes: string[];
	images: string[];
	availability: "in-stock" | "pre-order";
	price: number;
};

export const PRODUCTS: Product[] = [
	{
		id: "sheikha-abaya",
		name: "Sheikha Abaya",
		slug: "sheikha-abaya",
		collection: "abaya",
		description:
			"Introducing our designer abaya/gown with full sequin work on the front and back, perfect for those who want to stand out with elegance. Made from premium hand-crafted fabric, it comes with a white plain inner that can be styled with any colour, making it a versatile, high-quality choice for parties and weddings.",
		features: [
			"Full front and back sequin detailing",
			"Premium hand-made construction",
			"Elegant and classy look, ideal for parties and weddings",
			"Comes with a versatile white inner that can be paired with other outfits",
			"Available in 5 colours with matching sequins",
		],
		colors: ["Cream", "Beauty Hold", "Black", "Grey", "Dusty Rose"],
		size: "One size fits all",
		material: "Premium fabric with sequin work",
		includes: ["Matching belt", "Matching scarf", "White plain inner"],
		images: [
			"/images/products/sheikha-abaya-1.webp",
			"/images/products/sheikha-abaya-2.webp",
			"/images/products/sheikha-abaya-3.webp",
			"/images/products/sheikha-abaya-4.webp",
		],
		availability: "in-stock",
		price: 24.99,
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
		price: 24.99,
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
		availability: "in-stock",
		price: 29.99,
	},

	{
		id: "classic-abaya",
		name: "Simple Calligraphy Black & Gold",
		slug: "classic-abaya",
		collection: "eid",
		description:
			"A timeless Simple Calligraphy Black & Gold (Limited Edition) that never goes out of style. Simple, elegant, and versatile - perfect for any occasion.",
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
		images: [
			"/images/products/elegant-abaya-1.jpeg",
			"/images/products/elegant-abaya-2.jpeg",
			"/images/products/elegant-abaya-3.jpeg",
			"/images/products/elegant-abaya-4.jpeg",
		],
		availability: "pre-order",
		price: 24.99,
	},

	{
		id: "silk-kaftan",
		name: "Velvet Kaftan",
		slug: "silk-kaftan",
		collection: "eid",
		description:
			"Luxurious velvet kaftan with intricate embroidery. Perfect for special occasions and formal events.",
		features: [
			"Premium silk fabric",
			"Hand embroidery",
			"Elegant drape",
			"Luxurious feel",
		],
		colors: ["Gold", "Silver", "Maroon"],
		size: [54, 46],
		material: "Silk",
		length: "Approximately 58 inches",
		includes: ["Matching belt"],
		images: ["/images/products/pre-order-velvet.webp"],
		availability: "pre-order",
		price: 29.99,
	},
];

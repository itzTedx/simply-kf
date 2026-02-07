export type Product = {
	id: string;
	name: string;
	slug: string;
	collection: "abaya" | "eid" | "all";
	description: string;
	features: string[];
	colors: string[];
	size: string | number[];

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
		colors: [
			"Maroon",
			"Navy Blue",
			"Olive Green",
			"Golden Beige",
			"Chocolate brown",
		],
		size: "One size fits all",

		images: [
			"/images/products/sheikha-1.webp",
			"/images/products/sheikha-2.webp",
			"/images/products/sheikha-3.webp",
			"/images/products/sheikha-4.webp",
			"/images/products/sheikha-5.webp",
			"/images/products/sheikha-6.webp",
			"/images/products/sheikha-7.webp",
			"/images/products/sheikha-8.webp",
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
		colors: ["Black", "Electric Blue", "Olive Green", "Silver Grey"],
		size: "One size fits all",

		images: [
			"/images/products/qamar-1.webp",
			"/images/products/qamar-2.webp",
			"/images/products/qamar-3.webp",
			"/images/products/qamar-4.webp",
			"/images/products/qamar-5.webp",
			"/images/products/qamar-6.webp",
			"/images/products/qamar-7.webp",
		],
		availability: "in-stock",
		price: 24.99,
	},

	{
		id: "velvet-kaftan",
		name: "Velvet Kaftan",
		slug: "velvet-kaftan",
		collection: "abaya",
		description:
			"Introducing our velvet kaftan - a timeless piece designed for elegance and comfort. Featuring a batwing silhouette with detailed front and back work, this kaftan is perfect for special occasions, Eid wear, or evening gatherings.",
		features: [
			"Batwing design",
			"Front and back detailing",
			"Soft and luxurious velvet fabric",
			"Comfortable and flattering fit",
		],
		colors: ["Black"],
		size: "One size fits all",

		images: [
			"/images/products/velvet-kaftan.webp",
			"/images/products/velvet-2.webp",
			"/images/products/velvet-3.webp",
			"/images/products/velvet-4.webp",
		],
		availability: "in-stock",
		price: 29.99,
	},

	{
		id: "simple-calligraphy-black-gold",
		name: "Simple Calligraphy Black & Gold",
		slug: "simple-calligraphy-black-gold",
		collection: "eid",
		description:
			"A timeless Simple Calligraphy Black & Gold (Limited Edition) that never goes out of style. Simple, elegant, and versatile - perfect for any occasion.",
		features: [
			"Classic design",
			"Premium fabric",
			"Versatile styling",
			"Comfortable fit",
		],
		colors: ["Black"],
		size: "One size fits all",

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
		id: "velvet-kaftan-eid",
		name: "Velvet Kaftan",
		slug: "velvet-kaftan-eid",
		collection: "eid",
		description:
			"Luxurious velvet kaftan with intricate embroidery. Perfect for special occasions and formal events.",
		features: [
			"Premium silk fabric",
			"Hand embroidery",
			"Elegant drape",
			"Luxurious feel",
		],
		colors: ["Black"],
		size: [54, 56],

		images: [
			"/images/products/velvet-eid-1.webp",
			"/images/products/velvet-eid-2.webp",
		],
		availability: "pre-order",
		price: 29.99,
	},
];

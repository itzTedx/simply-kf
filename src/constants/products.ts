export type ColorVariant = {
	color: string;
	images: string[];
};

export type Product = {
	id: string;
	name: string;
	slug: string;
	collection: "abaya" | "eid" | "all";
	description: string;
	features: string[];
	variants: ColorVariant[];
	size: string | number[];
	availability: "sales" | "pre-order";
	price: number;
};

/** Get colors list from product variants */
export function getProductColors(product: Product): string[] {
	return product.variants.map((v) => v.color);
}

/** Get images for a color; falls back to first variant if color not found */
export function getProductImagesForColor(
	product: Product,
	color: string
): string[] {
	const variant = product.variants.find(
		(v) => v.color.toLowerCase() === color.toLowerCase()
	);
	return variant?.images ?? product.variants[0]?.images ?? [];
}

/** First image for a product (e.g. for cards, OG) – uses first variant */
export function getProductDefaultImage(product: Product): string {
	return product.variants[0]?.images[0] ?? "";
}

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
		variants: [
			{
				color: "Maroon",
				images: [
					"/images/products/sheikha-1.webp",
					"/images/products/sheikha-2.webp",
					"/images/products/sheikha-3.webp",
					"/images/products/sheikha-4.webp",
				],
			},
			{
				color: "Navy Blue",
				images: [
					"/images/products/sheikha-5.webp",
					"/images/products/sheikha-blue-2.webp",
					"/images/products/sheikha-blue-3.webp",
					"/images/products/sheikha-blue-4.webp",
				],
			},
			{
				color: "Olive Green",
				images: [
					"/images/products/sheikha-6.webp",
					"/images/products/sheikha-green-2.webp",
					"/images/products/sheikha-green-3.webp",
				],
			},
			{
				color: "Golden Beige",
				images: [
					"/images/products/sheikha-7.webp",
					"/images/products/sheikha-beige-2.webp",
					"/images/products/sheikha-beige-3.webp",
				],
			},
			{
				color: "Chocolate brown",
				images: [
					"/images/products/sheikha-8.webp",
					"/images/products/sheikha-brown-2.webp",
					"/images/products/sheikha-brown-3.webp",
					"/images/products/sheikha-brown-4.webp",
				],
			},
		],
		size: "One size fits all",
		availability: "sales",
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
		variants: [
			{
				color: "Black",
				images: [
					"/images/products/qamar-1.webp",
					"/images/products/qamar-2.webp",
					"/images/products/qamar-3.webp",
					"/images/products/qamar-4.webp",
				],
			},
			{
				color: "Olive Green",
				images: [
					"/images/products/qamar-5.webp",
					"/images/products/qamar-green-2.webp",
					"/images/products/qamar-green-3.webp",
					"/images/products/qamar-green-4.webp",
				],
			},
			{
				color: "Silver Grey",
				images: [
					"/images/products/qamar-6.webp",
					"/images/products/qamar-silver-2.webp",
					"/images/products/qamar-silver-3.webp",
				],
			},
			{
				color: "Electric Blue",
				images: [
					"/images/products/qamar-7.webp",
					"/images/products/qamar-blue-2.webp",
					"/images/products/qamar-blue-3.webp",
				],
			},
		],
		size: "One size fits all",
		availability: "sales",
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
		variants: [
			{
				color: "Black",
				images: [
					"/images/products/velvet-kaftan.webp",
					"/images/products/velvet-2.webp",
					"/images/products/velvet-3.webp",
					"/images/products/velvet-4.webp",
				],
			},
		],
		size: "One size fits all",
		availability: "sales",
		price: 34.99,
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
		variants: [
			{
				color: "Black",
				images: [
					"/images/products/elegant-abaya-1.jpeg",
					"/images/products/elegant-abaya-2.jpeg",
					"/images/products/elegant-abaya-3.jpeg",
					"/images/products/elegant-abaya-4.jpeg",
				],
			},
		],
		size: "One size fits all",
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
		variants: [
			{
				color: "Black",
				images: [
					"/images/products/velvet-eid-1.webp",
					"/images/products/velvet-eid-2.webp",
				],
			},
		],
		size: [54, 56],
		availability: "pre-order",
		price: 29.99,
	},
];

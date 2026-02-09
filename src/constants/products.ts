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

/**
 * Get colors list from product variants.
 *
 * Supports both the static `Product` shape from this file and the
 * Payload `Product` shape (from `@/payload-types`), which also exposes
 * a `variants` array with a `color` field.
 */
export function getProductColors(product: {
	variants?: { color?: string | null }[] | null;
}): string[] {
	if (!product.variants) return [];
	return product.variants
		.map((v) => v?.color)
		.filter((color): color is string => Boolean(color));
}

/**
 * Get images for a given color.
 *
 * - For static products, `images` is a `string[]`.
 * - For Payload products, `images` is an array of `{ image: number | Media }`.
 *   We resolve these to their `url` (falling back to `thumbnailURL` if needed).
 */
export function getProductImagesForColor(
	product: {
		variants?:
			| {
					color?: string | null;
					images?: unknown;
			  }[]
			| null;
		images?: unknown;
	},
	color: string
): string[] {
	const variants = product.variants ?? [];

	const variant = variants.find((v) => {
		const variantColor = (v?.color ?? "").toString();
		return variantColor.toLowerCase() === color.toLowerCase();
	});

	const imagesSource: unknown =
		(variant ?? variants[0])?.images ?? product.images ?? [];

	// Static shape: string[]
	if (Array.isArray(imagesSource) && typeof imagesSource[0] === "string") {
		return imagesSource as string[];
	}

	// Payload shape: { image: number | Media }[]
	if (Array.isArray(imagesSource)) {
		const resolved = imagesSource
			.map((entry) => {
				const image = entry?.image ?? entry;
				if (!image) return null;

				// Already a URL string
				if (typeof image === "string") return image;

				// Media object from Payload
				if (typeof image === "object") {
					if (typeof image.url === "string") return image.url;
					if (typeof image.thumbnailURL === "string") return image.thumbnailURL;
				}

				return null;
			})
			.filter((url): url is string => Boolean(url));

		if (resolved.length > 0) return resolved;
	}

	return [];
}

/**
 * First image for a product (e.g. for cards, OG).
 *
 * Uses the first variant image when available, and falls back to any
 * top‑level product images in the Payload shape.
 */
export function getProductDefaultImage(product: {
	variants?:
		| {
				color?: string | null;
				images?: unknown;
		  }[]
		| null;
	images?: unknown;
}): string {
	const variants = product.variants ?? [];
	if (variants.length > 0) {
		const firstVariantColor = variants[0]?.color ?? "";
		const fromVariant = getProductImagesForColor(
			product,
			firstVariantColor.toString()
		)[0];
		if (fromVariant) return fromVariant;
	}

	// Fallback to any top‑level images
	const topLevelImages = getProductImagesForColor(product, "");
	return topLevelImages[0] ?? "";
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
		availability: "pre-order",
		price: 34.99,
	},
];

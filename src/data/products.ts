export interface Product {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	category: string;
	sizes: string[];
	colors: string[];
}

export const PRODUCTS: Product[] = [
	{
		id: "1",
		slug: "the-classic-abaya-in-noir",
		name: "The Classic Abaya in Noir",
		description:
			"A masterclass in understated elegance, this Classic Abaya in Noir is crafted for the modern woman who values both style and modesty. Its fluid drape and premium fabric ensure a sophisticated silhouette suitable for any occasion.",
		price: 180,
		images: [
			"/images/products/product-1.webp",
			"/images/products/product-1.webp",
			"/images/products/product-1.webp",
		],
		category: "Abayas",
		sizes: ["52", "54", "56", "58", "60"],
		colors: ["Black"],
	},
	{
		id: "2",
		slug: "silk-crepe-kimono",
		name: "Silk Crepe Kimono",
		description:
			"Elevate your layering with our Silk Crepe Kimono. Featuring a relaxed fit and luxurious texture, it adds a refined touch to any ensemble. Designed in Dubai with meticulous attention to detail.",
		price: 220,
		images: [
			"/images/products/product-2.webp",
			"/images/products/product-2.webp",
			"/images/products/product-2.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Beige"],
	},
	{
		id: "3",
		slug: "structured-liner-abaya",
		name: "Structured Liner Abaya",
		description:
			"Defined by its clean lines and structured silhouette, this Liner Abaya offers a contemporary take on traditional modest wear. Perfect for the professional environment or formal gatherings.",
		price: 195,
		images: [
			"/images/products/product-3.webp",
			"/images/products/product-3.webp",
			"/images/products/product-3.webp",
		],
		category: "Abayas",
		sizes: ["52", "54", "56", "58"],
		colors: ["Navy"],
	},
	{
		id: "4",
		slug: "soft-touch-modal-set",
		name: "Soft Touch Modal Set",
		description:
			"Experience unparalleled comfort with our Soft Touch Modal Set. This coordinating two-piece features a relaxed tunic and wide-leg trousers, perfect for stylish lounging or casual outings.",
		price: 150,
		images: [
			"/images/products/product-4.webp",
			"/images/products/product-4.webp",
			"/images/products/product-4.webp",
		],
		category: "Essentials",
		sizes: ["S", "M", "L"],
		colors: ["Taupe"],
	},
	{
		id: "5",
		slug: "elevated-wrap-abaya",
		name: "Elevated Wrap Abaya",
		description:
			"The Elevated Wrap Abaya features a unique crossover design that cinches gently at the waist. Crafted from high-quality fabric that moves with you, it's a statement piece for the discerning wardrobe.",
		price: 210,
		images: [
			"/images/products/product-5.webp",
			"/images/products/product-5.webp",
			"/images/products/product-5.webp",
		],
		category: "Abayas",
		sizes: ["52", "54", "56", "58"],
		colors: ["Grey"],
	},
	{
		id: "6",
		slug: "textured-linen-dress-white",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-6.webp",
			"/images/products/product-6.webp",
			"/images/products/product-6.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["White"],
	},
	{
		id: "7",
		slug: "textured-linen-dress-natural",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-7.webp",
			"/images/products/product-7.webp",
			"/images/products/product-7.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Natural"],
	},
	{
		id: "8",
		slug: "textured-linen-dress-olive",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-8.webp",
			"/images/products/product-8.webp",
			"/images/products/product-8.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Olive"],
	},
	{
		id: "9",
		slug: "textured-linen-dress-black",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-9.webp",
			"/images/products/product-9.webp",
			"/images/products/product-9.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Black"],
	},
	{
		id: "10",
		slug: "textured-linen-dress-sand",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-10.webp",
			"/images/products/product-10.webp",
			"/images/products/product-10.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Sand"],
	},
	{
		id: "11",
		slug: "textured-linen-dress-charcoal",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-11.webp",
			"/images/products/product-11.webp",
			"/images/products/product-11.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Charcoal"],
	},
	{
		id: "12",
		slug: "textured-linen-dress-navy",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-12.webp",
			"/images/products/product-12.webp",
			"/images/products/product-12.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Navy"],
	},
	{
		id: "13",
		slug: "textured-linen-dress-rust",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-13.webp",
			"/images/products/product-13.webp",
			"/images/products/product-13.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Rust"],
	},
	{
		id: "14",
		slug: "textured-linen-dress-moss",
		name: "Textured Linen Dress",
		description:
			"Breathable and chic, the Textured Linen Dress is an essential for warmer days. Its minimalist cut and premium linen construction embody the essence of quiet luxury.",
		price: 165,
		images: [
			"/images/products/product-14.webp",
			"/images/products/product-14.webp",
			"/images/products/product-14.webp",
		],
		category: "Essentials",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Moss"],
	},
];

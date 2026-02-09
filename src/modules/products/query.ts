import { payload } from "@/lib/payload";
import { Product } from "@/payload-types";

export async function getProducts(): Promise<Partial<Product>[]> {
	const result = await payload.find({
		collection: "products",
		draft: false,
		where: {
			status: { equals: "published" },
		},
		sort: ["availability", "-createdAt"],
		select: {
			name: true,
			price: true,
			availability: true,
			categories: true,
			variants: true,
			slug: true,
		},
		depth: 2,
	});

	return result.docs;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
	const result = await payload.find({
		collection: "products",
		draft: false,
		where: {
			slug: { equals: slug },
			status: { equals: "published" },
		},
		limit: 1,
		depth: 2,
	});

	return result.docs[0] ?? null;
}

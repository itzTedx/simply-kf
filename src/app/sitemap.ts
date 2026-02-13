import type { MetadataRoute } from "next";

import { getProducts } from "@/modules/products/query";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes: MetadataRoute.Sitemap = [
		"",
		"/shop",
		"/about",
		"/contact",
	].map((path) => ({
		url: `${SITE_URL}${path}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.7,
	}));

	const products = await getProducts();

	const productRoutes: MetadataRoute.Sitemap = (products ?? []).map(
		(product) => ({
			url: `${SITE_URL}/shop/${product.slug}`,
			lastModified: product.updatedAt
				? new Date(product.updatedAt as string)
				: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		})
	);

	return [...staticRoutes, ...productRoutes];
}

import { revalidatePath } from "next/cache";

import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from "payload";

import type { Product } from "@/payload-types";

function revalidateProductPages(doc: Product | null, slug?: string) {
	["/", "/shop"].forEach((path) => revalidatePath(path));
	if (doc?.slug) revalidatePath(`/shop/${doc.slug}`);
	if (slug && slug !== doc?.slug) revalidatePath(`/shop/${slug}`);
}

export const revalidateAfterChange: CollectionAfterChangeHook<
	Product
> = async ({ doc, previousDoc, req }) => {
	revalidateProductPages(doc, previousDoc?.slug as string | undefined);

	// Revalidate pages of products that include this one in relatedProducts
	const related = await req.payload.find({
		collection: "products",
		where: { relatedProducts: { contains: doc.id } },
		limit: 100,
		depth: 0,
	});
	for (const p of related.docs) {
		if (typeof p.slug === "string") revalidatePath(`/shop/${p.slug}`);
	}
	return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({
	doc,
	req,
}) => {
	if (doc && typeof doc === "object" && "slug" in doc) {
		revalidateProductPages(doc as Product);
		// Revalidate product pages that had this in relatedProducts
		const id = "id" in doc ? doc.id : null;
		if (id != null) {
			const related = await req.payload.find({
				collection: "products",
				where: { relatedProducts: { contains: id } },
				limit: 100,
				depth: 0,
			});
			for (const p of related.docs) {
				if (typeof p.slug === "string") revalidatePath(`/shop/${p.slug}`);
			}
		}
	} else {
		["/", "/shop"].forEach((path) => revalidatePath(path));
	}
};

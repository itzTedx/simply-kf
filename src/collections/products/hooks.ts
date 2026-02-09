import { revalidatePath, revalidateTag } from "next/cache";

import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from "payload";

import { Product } from "@/payload-types";

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
	doc,
	previousDoc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		if (doc._status === "published") {
			const path = `/shop/${doc.slug}`;

			payload.logger.info(`Revalidating post at path: ${path}`);

			revalidatePath(path);
			revalidatePath("/shop");
			revalidateTag("products", "max");
			revalidateTag(`product:${doc.slug}`, "max");
		}

		// If the post was previously published, we need to revalidate the old path
		if (previousDoc._status === "published" && doc._status !== "published") {
			const oldPath = `/shop/${previousDoc.slug}`;

			payload.logger.info(`Revalidating old post at path: ${oldPath}`);

			revalidatePath(oldPath);
			revalidatePath("/shop");
			revalidateTag("products", "max");
			revalidateTag(`product:${previousDoc.slug}`, "max");
		}
	}
	return doc;
};

export const revalidateDeleteProduct: CollectionAfterDeleteHook<Product> = ({
	doc,
	req: { context },
}) => {
	if (!context.disableRevalidate) {
		const path = `/shop/${doc?.slug}`;

		revalidatePath(path);
		revalidatePath("/shop");
		revalidateTag("products", "max");
		if (doc?.slug) {
			revalidateTag(`product:${doc.slug}`, "max");
		}
	}

	return doc;
};

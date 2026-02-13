import { revalidatePath, revalidateTag } from "next/cache";

import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
	CollectionBeforeValidateHook,
} from "payload";

import { Product } from "@/payload-types";

/**
 * Ensures product slug is unique by appending -2, -3, ... when the slug already exists.
 */
export const ensureUniqueSlug: CollectionBeforeValidateHook<Product> = async ({
	data,
	operation,
	originalDoc,
	req,
}) => {
	const slug = data?.slug;
	if (!slug || typeof slug !== "string") return data;

	const currentId = data?.id ?? originalDoc?.id;
	const where: { slug: { equals: string }; id?: { not_equals: string } } = {
		slug: { equals: slug },
	};
	if (operation === "update" && currentId != null) {
		where.id = { not_equals: String(currentId) };
	}

	const existing = await req.payload.find({
		collection: "products",
		where,
		limit: 1,
		depth: 0,
	});

	if (existing.docs.length === 0) return data;

	let candidate = slug;
	let serial = 2;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		candidate = `${slug}-${serial}`;
		const whereSerial: {
			slug: { equals: string };
			id?: { not_equals: string };
		} = {
			slug: { equals: candidate },
		};
		if (operation === "update" && currentId != null) {
			whereSerial.id = { not_equals: String(currentId) };
		}
		const match = await req.payload.find({
			collection: "products",
			where: whereSerial,
			limit: 1,
			depth: 0,
		});
		if (match.docs.length === 0) break;
		serial += 1;
	}

	return { ...data, slug: candidate } as Partial<Product>;
};

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
			revalidatePath("/");
			revalidateTag("products", "max");
			revalidateTag(`product:${doc.slug}`, "max");
		}

		// If the post was previously published, we need to revalidate the old path
		if (previousDoc._status === "published" && doc._status !== "published") {
			const oldPath = `/shop/${previousDoc.slug}`;

			payload.logger.info(`Revalidating old post at path: ${oldPath}`);

			revalidatePath(oldPath);
			revalidatePath("/shop");
			revalidatePath("/");
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
		revalidatePath("/");
		revalidateTag("products", "max");
		if (doc?.slug) {
			revalidateTag(`product:${doc.slug}`, "max");
		}
	}

	return doc;
};

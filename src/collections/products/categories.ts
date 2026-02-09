import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const ProductCategories: CollectionConfig = {
	slug: "productCategories",
	labels: {
		plural: "Categories",
		singular: "Category",
	},
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "updatedAt"],
		group: "Products",
	},
	access: {
		read: () => true,
	},
	fields: [
		slugField({
			useAsSlug: "name",
			name: "slug",
			required: true,
		}),
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Optional short description for the category.",
			},
		},
	],
};

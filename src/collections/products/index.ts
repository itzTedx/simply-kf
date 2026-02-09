import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const Products: CollectionConfig = {
	slug: "products",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "price", "status", "updatedAt"],
		group: "Products",
	},
	access: {
		read: () => true,
	},
	fields: [
		// Sidebar fields (outside tabs so they always show)

		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "price",
					type: "number",
					required: true,
					min: 0,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			type: "textarea",
			name: "description",
			label: "Description",
			required: true,
		},
		{
			name: "categories",
			type: "relationship",
			relationTo: "productCategories",

			admin: {
				position: "sidebar",
			},
		},

		{
			name: "status",
			type: "select",
			required: true,
			defaultValue: "draft",
			options: [
				{ label: "Draft", value: "draft" },
				{ label: "Published", value: "published" },
			],
			admin: {
				position: "sidebar",
			},
		},
		slugField({
			useAsSlug: "name",
			name: "slug",
			required: true,
			position: "sidebar",
		}),
		{
			type: "tabs",
			tabs: [
				{
					label: "Basic Info",
					fields: [
						{
							name: "overview",
							type: "richText",
						},
						{
							name: "features",
							type: "array",
							label: "Features",

							fields: [
								{
									name: "feature",
									type: "text",
									required: true,
								},
							],
						},
					],
				},
				{
					label: "Media",
					description: "Product and variant images.",
					fields: [
						{
							name: "images",
							type: "array",
							label: "Product images",
							admin: {
								description:
									"Used when the product has no variants, or as fallback. For variant-specific images, add them on each variant.",
							},
							fields: [
								{
									name: "image",
									type: "upload",
									relationTo: "media",
									required: true,
								},
							],
						},
						{
							name: "variants",
							type: "array",
							label: "Variants",
							admin: {
								components: {
									RowLabel:
										"@/components/payload/VariantRowLabel#VariantRowLabel",
								},
							},
							fields: [
								{
									type: "row",
									fields: [
										{
											name: "color",
											type: "text",
											required: true,
											admin: {
												width: "25%",
												description:
													"Color or option name (e.g. Maroon, Navy Blue). Used for the frontend color selector.",
											},
										},
										{
											name: "size",
											type: "text",
											admin: {
												width: "25%",
												description:
													"Size (e.g. S, M, L, XL, One Size). Leave empty if not applicable.",
											},
										},
										{
											name: "price",
											type: "number",
											min: 0,
											admin: {
												width: "25%",
												description:
													"Override product price for this variant (leave empty to use base price)",
											},
										},
										{
											name: "stock",
											type: "number",
											min: 0,
											admin: {
												width: "25%",
												description: "Quantity in stock",
											},
										},
									],
								},
								{
									name: "images",
									type: "array",
									label: "Variant images",
									required: true,
									fields: [
										{
											name: "image",
											type: "upload",
											relationTo: "media",
											required: true,
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
};

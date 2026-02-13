import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
	OrderedListFeature,
	UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig, Where } from "payload";
import { slugField } from "payload";

import { generatePreviewPath } from "@/lib/payload/utils/generatePreviewPath";
import { slugify } from "@/lib/utils";

import {
	ensureUniqueSlug,
	revalidateDeleteProduct,
	revalidateProduct,
} from "./hooks";

export const Products: CollectionConfig = {
	slug: "products",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "price", "collections", "_status", "updatedAt"],
		group: "Products",
		preview: (data) =>
			generatePreviewPath({
				slug: data?.slug as string,
			}),
	},
	access: {
		read: () => true,
	},
	hooks: {
		beforeValidate: [ensureUniqueSlug],
		afterChange: [revalidateProduct],
		afterDelete: [revalidateDeleteProduct],
	},
	defaultPopulate: {
		name: true,
		price: true,
		collections: true,
		relatedProducts: true,
		availability: true,
		slug: true,
		overview: true,
		features: true,
		images: true,
		variants: true,
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
			name: "collections",
			type: "relationship",
			relationTo: "collections",
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "relatedProducts",
			type: "relationship",
			relationTo: "products",
			hasMany: true,
			admin: {
				position: "sidebar",
				description:
					'Products to show in "You may also like" section. Leave empty to show other published products.',
			},
			filterOptions: ({ id }): Where =>
				id != null ? { id: { not_equals: id } } : ({} as Where),
		},

		{
			name: "availability",
			type: "select",
			required: true,
			defaultValue: "sales",
			options: [
				{ label: "Sales", value: "sales" },
				{ label: "Pre-order", value: "pre-order" },
			],
			admin: {
				position: "sidebar",
			},
		},
		slugField({
			useAsSlug: "name",
			slugify: ({ valueToSlugify }) => slugify(valueToSlugify),
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
							editor: lexicalEditor({
								features: [
									HeadingFeature({
										enabledHeadingSizes: ["h2", "h3", "h4"],
									}),
									UnorderedListFeature(),
									OrderedListFeature(),
									FixedToolbarFeature({
										customGroups: {
											text: {
												type: "buttons",
											},
										},
									}),
									InlineToolbarFeature(),
									HorizontalRuleFeature(),
								],
							}),
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
					fields: [
						{
							type: "group",
							label: "Product Details",
							admin: {
								description: "Product images and sizes.",
							},
							fields: [
								{
									name: "images",
									type: "array",
									label: "Gallery",
									fields: [
										{
											name: "image",
											type: "upload",
											relationTo: "media",
											required: true,
										},
									],
									admin: {
										condition: (data) => !data?.enableVariants,
									},
								},
								{
									name: "stock",
									type: "number",
									min: 0,
									admin: {
										condition: (data) => !data?.enableVariants,
										description:
											"Quantity in stock (when product has no size options)",
									},
								},
								{
									name: "sizes",
									type: "array",

									fields: [
										{ name: "size", type: "text", required: true },
										{
											name: "stock",
											type: "number",
											min: 0,
											admin: {
												description: "Quantity in stock for this size",
											},
										},
									],
									admin: {
										condition: (data) => !data?.enableVariants,
									},
								},
								{
									name: "enableVariants",
									type: "checkbox",
									label: "Enable variants",
								},
							],
						},
						{
							type: "group",
							label: "Variants",
							admin: {
								description: "Add color variants for the product.",
							},
							fields: [
								{
									name: "variants",
									type: "array",
									label: "Color Variants",

									admin: {
										condition: (data) => Boolean(data?.enableVariants),
										components: {
											RowLabel:
												"@/components/payload/VariantRowLabel#VariantRowLabel",
										},
									},
									fields: [
										{
											name: "color",
											type: "text",
											required: true,
											admin: {
												description:
													"Color or option name (e.g. Maroon, Navy Blue). Used for the frontend color selector.",
											},
										},
										{
											name: "stock",
											type: "number",
											min: 0,
											admin: {
												condition: (data) =>
													!data?.sizes || data?.sizes?.length === 0,
												description:
													"Quantity in stock (when variant has no size options)",
											},
										},
										{
											name: "images",
											type: "array",
											label: "Variant images",
											required: true,
											admin: {
												description:
													"Images for this color variant. First image is used as the thumbnail.",
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
											name: "sizes",
											type: "array",
											label: "Sizes",
											admin: {
												description:
													"Add sizes for this color. Leave empty if product has no size options.",
												components: {
													RowLabel:
														"@/components/payload/SizeRowLabel#SizeRowLabel",
												},
											},
											fields: [
												{
													type: "row",
													fields: [
														{
															name: "size",
															type: "text",
															required: true,
															admin: {
																width: "33%",
																description: "Size (e.g. One Size, 42, 44, 46)",
															},
														},

														{
															name: "stock",
															type: "number",
															min: 0,
															admin: {
																width: "33%",
																description: "Quantity in stock for this size",
															},
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
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),

						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};

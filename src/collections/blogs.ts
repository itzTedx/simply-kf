import type { CollectionConfig } from "payload";

export const Blogs: CollectionConfig = {
	slug: "blogs",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
	upload: true,
};

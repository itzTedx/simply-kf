import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
	slug: "homepage",
	label: "Homepage",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "image",
			label: "Hero Image",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				description: "Main hero image shown on the homepage.",
			},
		},
		{
			name: "title",
			label: "Hero Title",
			type: "text",
			required: true,
			admin: {
				description: "Primary heading text for the homepage hero.",
			},
		},
		{
			name: "description",
			label: "Hero Description",
			type: "textarea",
			required: true,
			admin: {
				description: "Supporting description text for the homepage hero.",
			},
		},
	],
};

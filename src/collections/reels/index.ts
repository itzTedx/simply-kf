import type { CollectionConfig } from "payload";

export const Reels: CollectionConfig = {
	slug: "reels",
	admin: {
		useAsTitle: "caption",
		defaultColumns: ["caption", "platform", "updatedAt"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "caption",
			type: "text",

			admin: {
				description: "Short caption or title for the reel",
			},
		},
		{
			name: "platform",
			type: "select",
			required: true,
			defaultValue: "tiktok",
			options: [
				{ label: "TikTok", value: "tiktok" },
				{ label: "Instagram", value: "instagram" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "thumbnail",
			type: "upload",
			relationTo: "media",

			filterOptions: {
				mimeType: { contains: "image" },
			},
			admin: {
				description: "Thumbnail image for the reel (used before play)",
			},
		},
		{
			name: "video",
			type: "upload",
			relationTo: "videos",
			required: true,
			admin: {
				description: "Video file for the reel (stored in uploads/videos)",
			},
		},

		{
			name: "link",
			type: "text",
			admin: {
				description:
					"Optional link to the original post (e.g. TikTok or Instagram URL)",
			},
		},
	],
};

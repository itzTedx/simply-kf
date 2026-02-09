import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig<"videos"> = {
	slug: "videos",
	admin: {
		group: "Media",
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			admin: {
				description: "Alt text for the video",
			},
		},
	],
	upload: {
		staticDir: "public/uploads/videos",
		mimeTypes: ["video/*"],
	},
};

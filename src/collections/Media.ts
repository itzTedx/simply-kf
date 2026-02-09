import type { CollectionConfig } from "payload";

export const Media: CollectionConfig<"media"> = {
	slug: "media",
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
		},
	],
	upload: {
		staticDir: "public/uploads",
		formatOptions: {
			format: "webp",
		},
		adminThumbnail: "thumbnail",
		mimeTypes: ["image/*"],
	},
};

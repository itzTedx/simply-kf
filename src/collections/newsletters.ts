import type { CollectionConfig } from "payload";

export const Newsletters: CollectionConfig = {
	slug: "newsletters",
	admin: {
		useAsTitle: "email",
		defaultColumns: ["email", "source", "createdAt"],
		group: "Marketing",
		description: "Newsletter signups collected from the storefront.",
	},
	access: {
		read: ({ req }) => {
			if (!req.user) return false;
			// Limit read access to admins
			return req.user.role === "admin";
		},
		create: () => true,
		update: ({ req }) => {
			if (!req.user) return false;
			return req.user.role === "admin";
		},
		delete: ({ req }) => {
			if (!req.user) return false;
			return req.user.role === "admin";
		},
	},
	fields: [
		{
			name: "email",
			type: "email",
			required: true,
			unique: true,
		},
		{
			name: "source",
			type: "text",
			required: false,
			admin: {
				description:
					"Where this signup originated (e.g. homepage newsletter section).",
			},
		},
	],
	timestamps: true,
};

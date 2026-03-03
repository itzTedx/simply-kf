import { betterAuthStrategy } from "@delmaredigital/payload-better-auth";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		disableLocalStrategy: true,
		strategies: [betterAuthStrategy()],
	},
	admin: {
		defaultColumns: ["name", "email", "role"],
		useAsTitle: "name",
		group: "Auth",
	},
	access: {
		read: ({ req }) => {
			if (!req.user) return false;
			if (req.user.role === "admin") return true;
			return { id: { equals: req.user.id } };
		},
		admin: ({ req }) => req.user?.role === "admin",
	},
	fields: [
		{ name: "email", type: "email", required: true, unique: true },
		{ name: "emailVerified", type: "checkbox", defaultValue: false },
		{ name: "name", type: "text" },
		{ name: "image", type: "text" },
		{
			name: "role",
			type: "select",
			defaultValue: "user",
			options: [
				{ label: "User", value: "user" },
				{ label: "Admin", value: "admin" },
			],
		},
	],
	timestamps: true,
};

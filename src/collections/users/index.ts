import { betterAuthStrategy } from "@delmaredigital/payload-better-auth";
import type { CollectionConfig, PayloadRequest } from "payload";

import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

type AuthedRequest = PayloadRequest & {
	user?: {
		id: number | string;
		role?: string | null;
	};
};

export const Users: CollectionConfig = {
	slug: "users",
	admin: {
		useAsTitle: "email",
	},
	auth: {
		disableLocalStrategy: true,
		strategies: [betterAuthStrategy()],
	},
	access: {
		read: ({ req }) => {
			if (!req.user) return false;
			// Admins can read all users
			if (req.user.role === "admin") return true;
			// Regular users can only read their own user record
			return {
				id: {
					equals: req.user.id,
				},
			};
		},
		admin: ({ req }) => {
			const request = req as AuthedRequest;
			return request.user?.role === "admin";
		},
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
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin],
			},
		},
	],
};

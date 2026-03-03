import type { FieldHook } from "payload";

import type { User } from "@/payload-types";

export const ensureFirstUserIsAdmin: FieldHook<User> = async ({
	operation,
	req,
	value,
}) => {
	if (operation === "create") {
		const users = await req.payload.find({
			collection: "users",
			depth: 0,
			limit: 0,
		});

		// If this is the very first user, make them an admin
		if (users.totalDocs === 0) {
			return "admin";
		}
	}

	// For all subsequent users, preserve whatever was chosen in the admin UI
	return value ?? "user";
};

import { passkey } from "@better-auth/passkey";
import type { BetterAuthOptions } from "better-auth";

export const betterAuthOptions: Partial<BetterAuthOptions> = {
	user: {
		additionalFields: {
			role: { type: "string", defaultValue: "user" },
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 30, // 30 days
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	plugins: [passkey()],
};

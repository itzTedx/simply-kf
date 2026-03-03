import { createPayloadAuthClient } from "@delmaredigital/payload-better-auth/client";

export const authClient = createPayloadAuthClient({
	/** The base URL of the server */
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export const { signIn, signUp, useSession, signOut, changePassword } =
	authClient;

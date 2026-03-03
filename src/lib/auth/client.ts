"use client";

import { passkeyClient } from "@better-auth/passkey/client";
import {
	createAuthClient,
	payloadAuthPlugins,
} from "@delmaredigital/payload-better-auth/client";

export const authClient = createAuthClient({
	plugins: [...payloadAuthPlugins, passkeyClient()],
});

export const { useSession, signIn, signUp, signOut, twoFactor, passkey } =
	authClient;

import { createPayloadAuthClient } from "@delmaredigital/payload-better-auth/client";

export const authClient = createPayloadAuthClient();
export const { useSession, signIn, signUp, signOut, twoFactor } = authClient;

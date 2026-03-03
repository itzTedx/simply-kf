import {
	betterAuthCollections,
	createBetterAuthPlugin,
	payloadAdapter,
} from "@delmaredigital/payload-better-auth";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { betterAuth } from "better-auth";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Homepage } from "./collections/global/homepage";
import { Media } from "./collections/Media";
import { Orders } from "./collections/orders";
import { Products } from "./collections/products";
import { Collections } from "./collections/products/collections";
import { Reels } from "./collections/reels";
import { Users } from "./collections/users";
import { Videos } from "./collections/Videos";
import { betterAuthOptions } from "./lib/auth/config";
import { getBaseUrl } from "./lib/auth/getBaseUrl";
import { defaultLexical } from "./lib/payload/fields/defaultLexical";
import { plugins as seoPlugins } from "./lib/payload/plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (!process.env.PAYLOAD_SECRET) {
	throw new Error("PAYLOAD_SECRET is not set");
}

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

if (!process.env.BETTER_AUTH_SECRET) {
	throw new Error("BETTER_AUTH_SECRET is not set");
}

const baseUrl = getBaseUrl();

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		meta: {
			icons: [
				{
					rel: "icon",
					type: "image/png",
					url: "/icon1.png",
				},
			],
			robots: "noindex, nofollow",
		},
	},
	collections: [Users, Products, Collections, Orders, Reels, Media, Videos],
	globals: [Homepage],
	editor: defaultLexical,
	secret: process.env.PAYLOAD_SECRET,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL || "",
		},
	}),
	sharp,
	plugins: [
		betterAuthCollections({
			betterAuthOptions,
			skipCollections: ["user"],
		}),
		createBetterAuthPlugin({
			createAuth: (payload) =>
				betterAuth({
					...betterAuthOptions,
					baseURL: baseUrl,
					database: payloadAdapter({
						payloadClient: payload,
						adapterConfig: {
							enableDebugLogs: process.env.NODE_ENV === "development",
						},
					}),

					advanced: {
						database: {
							generateId: "serial",
						},
					},
					secret: process.env.BETTER_AUTH_SECRET!,
					trustedOrigins: [
						"http://localhost:3000",
						"https://localhost:3000",
						process.env.NEXT_PUBLIC_BASE_URL,
						process.env.NEXT_PUBLIC_SITE_URL,
						baseUrl,
					].filter(Boolean) as string[],
					// Ensure emailAndPassword config is preserved
					emailAndPassword: betterAuthOptions.emailAndPassword,
				}),
			admin: {
				betterAuthOptions, // Required for management UI auto-detection
				login: {
					title: "Sign in to Simply KF",
					enablePasskey: true,
					afterLoginPath: "/admin",
					requiredRole: ["admin"],
					// enableSignUp: false,
				},
			},
		}),
		...seoPlugins,
	],
});

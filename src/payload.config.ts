import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Homepage } from "./collections/global/homepage";
import { Media } from "./collections/Media";
import { Products } from "./collections/products";
import { Collections } from "./collections/products/collections";
import { Reels } from "./collections/reels";
import { Users } from "./collections/Users";
import { Videos } from "./collections/Videos";
import { defaultLexical } from "./lib/payload/fields/defaultLexical";
import { plugins } from "./lib/payload/plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (!process.env.PAYLOAD_SECRET) {
	throw new Error("PAYLOAD_SECRET is not set");
}

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Products, Collections, Reels, Media, Videos],
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
	plugins,
});

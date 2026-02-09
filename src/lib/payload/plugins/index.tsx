import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Plugin } from "payload";

import type { Product } from "@/payload-types";

import { getServerSideURL } from "../utils/get-url";

const generateTitle: GenerateTitle<Product> = ({ doc }) => {
	return doc?.name ? `${doc.name} | Simply KF` : "Simply KF";
};

const generateURL: GenerateURL<Product> = ({ doc }) => {
	const url = getServerSideURL();

	return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
	seoPlugin({
		generateTitle,
		generateURL,
	}),
];

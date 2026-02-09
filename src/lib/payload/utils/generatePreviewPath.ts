import { getServerSideURL } from "./get-url";

type Props = {
	slug: string;
};

export const generatePreviewPath = ({ slug }: Props) => {
	// Allow empty strings, e.g. for the homepage
	if (slug === undefined || slug === null) {
		return null;
	}

	// Encode to support slugs with special characters
	const encodedSlug = encodeURIComponent(slug);

	// const encodedParams = new URLSearchParams({
	// 	slug: encodedSlug,
	// 	collection,
	// 	path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
	// 	previewSecret: process.env.PREVIEW_SECRET || "",
	// });

	const url = `${getServerSideURL()}/shop/${encodedSlug}`;

	return url;
};

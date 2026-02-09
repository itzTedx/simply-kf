import { getClientSideURL } from "./getURL";

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (
	url: string | null | undefined,
	cacheTag?: string | null
): string => {
	if (!url) return "";

	if (cacheTag && cacheTag !== "") {
		// biome-ignore lint/style/noParameterAssign: It maybe anyProps
		cacheTag = encodeURIComponent(cacheTag);
	}

	// Check if URL already has http/https protocol
	if (url.startsWith("http://") || url.startsWith("https://")) {
		return cacheTag ? `${url}?${cacheTag}` : url;
	}

	// If it's a relative path (starts with /), return it as is for UI components
	// This allows Next.js Image component to handle it as an internal asset
	// and fixes the "upstream image resolved to private ip" error in Docker/Production
	if (url.startsWith("/")) {
		return cacheTag ? `${url}?${cacheTag}` : url;
	}

	// Otherwise prepend client-side URL
	const baseUrl = getClientSideURL();

	return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`;
};

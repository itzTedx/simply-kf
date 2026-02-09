import { unstable_cache } from "next/cache";

import { payload } from "@/lib/payload";
import { getMediaUrl } from "@/lib/payload/utils/getMediaUrl";
import type { Homepage, Media } from "@/payload-types";

export type HomepageContent = {
	title: string;
	description: string;
	imageUrl: string;
};

async function getHomepageUncached(): Promise<HomepageContent> {
	const global = (await payload.findGlobal({
		slug: "homepage",
		depth: 2,
	})) as Homepage;

	const image =
		global.image && typeof global.image === "object"
			? (global.image as Media)
			: null;

	const imageUrl =
		(image?.url && getMediaUrl(image.url)) ||
		"/images/london-muslin-shopping-fesst.webp";

	return {
		title: global.title,
		description: global.description,
		imageUrl,
	};
}

export const getHomepage = unstable_cache(getHomepageUncached, ["homepage"], {
	tags: ["global:homepage"],
});

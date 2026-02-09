import type { Reel as UiReel } from "@/constants/reels";
import { payload } from "@/lib/payload";
import { getMediaUrl } from "@/lib/payload/utils/getMediaUrl";
import type { Reel as CmsReel, Video } from "@/payload-types";

export async function getReels(): Promise<UiReel[]> {
	const result = await payload.find({
		collection: "reels",
		sort: "-createdAt",
		depth: 2,
	});

	return result.docs.map((doc) => {
		const reel = doc as CmsReel;

		const video =
			reel.video && typeof reel.video === "object"
				? (reel.video as Video)
				: null;

		const videoUrl = video?.url ? getMediaUrl(video.url) : "";

		return {
			id: String(reel.id),
			thumbnail: videoUrl,
			videoUrl,
			caption: reel.caption ?? "",
			platform: reel.platform,
			link: reel.link ?? undefined,
		};
	});
}

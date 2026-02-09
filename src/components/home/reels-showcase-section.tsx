import { getReels } from "@/modules/reels/query";

import { ReelsShowcase } from "./reels-showcase";

export async function ReelsShowcaseSection() {
	const reels = await getReels();

	if (!reels.length) return null;

	return <ReelsShowcase reels={reels} />;
}

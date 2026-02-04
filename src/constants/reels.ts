export interface Reel {
	id: string;
	thumbnail: string;
	videoUrl: string;
	caption: string;
	platform: "tiktok" | "instagram";
	link?: string;
}

export const mockReels: Reel[] = [
	{
		id: "1",
		thumbnail: "/videos/reel-1.mp4",
		videoUrl: "/videos/reel-1.mp4",
		caption: "Effortless elegance for everyday moments",
		platform: "tiktok",
		link: "https://www.tiktok.com/@simplykfabayas",
	},
	{
		id: "2",
		thumbnail: "/videos/reel-2.mp4",
		videoUrl: "/videos/reel-2.mp4",
		caption: "Timeless modest fashion, redefined",
		platform: "instagram",
		link: "https://instagram.com/simplykf",
	},
	{
		id: "3",
		thumbnail: "/videos/reel-3.mp4",
		videoUrl: "/videos/reel-3.mp4",
		caption: "Dubai design, London spirit",
		platform: "tiktok",
		link: "https://www.tiktok.com/@simplykfabayas",
	},
	{
		id: "4",
		thumbnail: "/videos/reel-4.mp4",
		videoUrl: "/videos/reel-4.mp4",
		caption: "Minimal pieces, maximum impact",
		platform: "instagram",
		link: "https://instagram.com/simplykf",
	},
	{
		id: "5",
		thumbnail: "/videos/reel-5.mp4",
		videoUrl: "/videos/reel-5.mp4",
		caption: "Quiet luxury in motion",
		platform: "tiktok",
		link: "https://www.tiktok.com/@simplykfabayas",
	},
	{
		id: "6",
		thumbnail: "/videos/reel-6.mp4",
		videoUrl: "/videos/reel-6.mp4",
		caption: "Designed for the modern woman",
		platform: "instagram",
		link: "https://instagram.com/simplykf",
	},
	{
		id: "7",
		thumbnail: "/videos/reel-7.mp4",
		videoUrl: "/videos/reel-7.mp4",
		caption: "Refined simplicity, elevated style",
		platform: "tiktok",
		link: "https://www.tiktok.com/@simplykfabayas",
	},
	{
		id: "8",
		thumbnail: "/videos/reel-8.mp4",
		videoUrl: "/videos/reel-8.mp4",
		caption: "The art of modest dressing",
		platform: "instagram",
		link: "https://instagram.com/simplykf",
	},
];

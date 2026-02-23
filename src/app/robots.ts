import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: ["/", "/shop", "/about", "/contact"],
				disallow: [
					"/cart",
					"/payment/",
					"/api/",
					"/admin/",
					"/_next/",
					"/static/",
				],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL.replace(/^https?:\/\//, ""),
	};
}

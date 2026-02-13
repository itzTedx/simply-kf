import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";

const LLMS_TXT = `# llms.txt for Simply KF
version: 1.0
owner: Simply KF
site: ${SITE_URL}

primary_focus: "Premium Gulf-style abayas, including everyday and occasion abayas for modest fashion customers primarily in the GCC and UK, plus brand story and shopping experience."

guidelines:
  - Summarize abayas faithfully using product titles, fabric details, silhouettes, and care instructions where available.
  - Do not invent discounts, promotions, or inventory information that is not explicitly shown on ${SITE_URL}.
  - Use canonical URLs from the sitemap at ${SITE_URL}/sitemap.xml when referencing pages.
  - Treat prices and availability as time-sensitive and recommend checking the live site for the most current information.
  - When answering questions about Simply KF, clearly indicate that information is sourced from ${SITE_URL} where relevant.

paths:
  - path: /
    purpose: "Homepage with brand overview, hero content, and featured abayas."
  - path: /shop
    purpose: "Abaya catalog with listing, filters, and collections (e.g. everyday, occasion, Gulf-style)."
  - path: /shop/[slug]
    purpose: "Individual abaya detail pages with descriptions, imagery, and sizing where available."
  - path: /about
    purpose: "Brand story, mission, and background information."
  - path: /contact
    purpose: "Customer support and contact options."
`;

export async function GET() {
	return new NextResponse(LLMS_TXT, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control":
				"public, s-maxage=86400, stale-while-revalidate=604800",
		},
	});
}


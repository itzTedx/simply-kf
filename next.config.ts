import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
	/* config options here */
	typedRoutes: true,
	reactCompiler: true,
	// Performance optimizations
	experimental: {
		// Enable filesystem caching for `next dev`
		turbopackFileSystemCacheForDev: true,
		// Enable filesystem caching for `next build`
		turbopackFileSystemCacheForBuild: true,
	},
	images: {
		qualities: [100, 75],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "http",
				hostname: "20.174.166.85",
			},
			{
				protocol: "https",
				hostname: "simply-kf.vercel.app",
			},
			{
				protocol: "https",
				hostname: "simplykf.com",
			},
		],
	},
};

export default withPayload(nextConfig);

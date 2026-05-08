import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import { Toaster } from "sonner";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Providers from "@/components/providers";
import { CartStoreHydration } from "@/components/stores/cart-store-hydration";

import { blinka, inter, malibu } from "@/assets/fonts";

import { cn } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplykf.com";

export const viewport: Viewport = {
	themeColor: "#f5f2ed",
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Simply KF | Timeless Modest Abayas & Essentials",
		template: "%s | Simply KF",
	},
	description:
		"Elevated modest wear designed in Dubai. Exclusively for the UK. Discover timeless abayas, elegant essentials, and refined modest fashion.",
	keywords: [
		"modest fashion",
		"abaya",
		"modest wear UK",
		"Dubai abaya",
		"elegant abaya",
		"modest clothing",
		"Simply KF",
	],
	authors: [{ name: "Simply KF", url: siteUrl }],
	creator: "Simply KF",
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: siteUrl,
		siteName: "Simply KF",
		title: "Simply KF | Timeless Modest Abayas & Essentials",
		description:
			"Elevated modest wear designed in Dubai. Exclusively for the UK.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Simply KF | Timeless Modest Abayas",
		description:
			"Elevated modest wear designed in Dubai. Exclusively for the UK.",
	},
	robots: {
		index: true,
		follow: true,
	},
	verification: {
		google: "mAUrhc02aMtcXDMnb1c3Eyw0UHuLM1smbiLlT_aCXcE",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"h-full min-h-screen font-body antialiased",
					malibu.variable,
					blinka.variable,
					inter.className
				)}
			>
				<Providers>
					<CartStoreHydration />
					<Header />
					{children}
					<Footer />
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}

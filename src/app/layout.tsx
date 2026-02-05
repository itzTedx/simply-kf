import type { Metadata } from "next";
import "@/styles/globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import { blinka, inter, malibu } from "@/assets/fonts";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Simply KF",
	description: "Modest fashion brand",
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
				<NuqsAdapter>
					<Header />
					{children}
					<Footer />
				</NuqsAdapter>
				<Toaster />
			</body>
		</html>
	);
}

import { Route } from "next";
import Link from "next/link";

import { RiInstagramLine, RiTiktokLine } from "@remixicon/react";

import { Logo } from "@/assets/logo";

export function Footer() {
	const footerLinks = [
		{ name: "Shop", href: "/shop" },
		{ name: "Size Guide", href: "#" },
		{ name: "Delivery & Returns", href: "#" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<footer className="mt-auto border-border/30 border-t bg-background pt-20 pb-10">
			<div className="container mx-auto max-w-6xl px-4 md:px-6">
				<div className="flex flex-col items-center gap-12 text-center md:items-start md:text-left">
					<div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
						<div className="space-y-4">
							<div className="flex items-center gap-2 text-amber-700">
								<Logo />
								<h5 className="font-display font-normal text-foreground text-lg">
									Simply KF
								</h5>
							</div>
							<p className="font-body text-foreground/60 text-sm leading-relaxed">
								Designed in Dubai. Exclusively for the UK.
							</p>
						</div>

						<nav className="flex flex-wrap justify-center gap-x-10 gap-y-1 md:justify-end">
							{footerLinks.map((link) => (
								<Link
									className="font-body text-foreground/55 text-sm transition-colors duration-200 hover:text-foreground/90"
									href={link.href as Route}
									key={link.name}
								>
									{link.name}
								</Link>
							))}
						</nav>
					</div>

					<div className="h-px w-full max-w-4xl bg-border/30" />

					<div className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-between">
						<p className="font-body text-foreground/40 text-xs">
							© {new Date().getFullYear()} SIMPLY KF. All rights reserved.
						</p>
						<ul className="flex items-center gap-6">
							<li>
								<Link
									className="text-foreground/50 transition-colors duration-200 hover:text-foreground/80"
									href="https://instagram.com"
									rel="noopener noreferrer"
									target="_blank"
								>
									<RiInstagramLine className="size-4" />
									<span className="sr-only">Instagram</span>
								</Link>
							</li>
							<li>
								<Link
									className="text-foreground/50 transition-colors duration-200 hover:text-foreground/80"
									href="https://tiktok.com"
									rel="noopener noreferrer"
									target="_blank"
								>
									<RiTiktokLine className="size-4" />
									<span className="sr-only">TikTok</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

import { Route } from "next";
import Link from "next/link";

import { RiInstagramLine } from "@remixicon/react";

export function Footer() {
	return (
		<footer className="border-border/40 border-t bg-ivory pt-16 pb-8">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-8 text-center md:items-start md:text-left">
					{/* Brand & Social */}
					<div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start">
						<div className="space-y-4 text-center md:text-left">
							<h3 className="font-display font-semibold text-charcoal text-lg">
								SIMPLY KF
							</h3>
							<p className="font-body text-charcoal/60 text-sm">
								Designed in Dubai. Exclusively for the UK.
							</p>
						</div>

						{/* Links Group */}
						<div className="flex flex-wrap justify-center gap-8 md:justify-end">
							{[
								{ name: "Shop", href: "#" },
								{ name: "About", href: "#" },
								{ name: "Size Guide", href: "#" },
								{ name: "Delivery & Returns", href: "#" },
								{ name: "Contact", href: "#" },
							].map((link) => (
								<Link
									className="font-body text-charcoal/60 text-sm transition-colors hover:text-charcoal"
									href={link.href as Route}
									key={link.name}
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					<div className="h-px w-full bg-border/40" />

					{/* Bottom Bar */}
					<div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
						<p className="font-body text-charcoal/40 text-xs">
							© {new Date().getFullYear()} SIMPLY KF. All rights reserved.
						</p>

						<a
							className="text-charcoal/60 transition-colors hover:text-charcoal"
							href="https://instagram.com"
							rel="noopener noreferrer"
							target="_blank"
						>
							<RiInstagramLine className="h-5 w-5" />
							<span className="sr-only">Instagram</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

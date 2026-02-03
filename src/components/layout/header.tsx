import { Route } from "next";
import Link from "next/link";

import { RiMenuLine, RiShoppingBagLine, RiUserLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { Logo } from "@/assets/logo";

const NAV_LINKS = [
	{ name: "Home", href: "/" },
	{ name: "Shop", href: "/shop" },
	{ name: "Collections", href: "/collections" },
	{ name: "About", href: "/about" },
	{ name: "Journal", href: "/journal" },
	{ name: "Contact", href: "/contact" },
] as const;

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-border/40 border-b bg-white/80 backdrop-blur-lg supports-backdrop-filter:bg-white/60">
			<div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
				{/* Mobile Menu (Hidden on Desktop) */}
				<Button className="md:hidden" size="icon" variant="ghost">
					<RiMenuLine className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>

				{/* Logo */}
				<Link href="/">
					<Logo />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden gap-8 md:flex">
					{NAV_LINKS.map((link) => (
						<Link
							className="font-body font-medium text-charcoal/80 text-sm transition-colors hover:text-charcoal"
							href={link.href as Route}
							key={link.name}
						>
							{link.name}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-2">
					<Button
						className="text-charcoal/80 hover:text-charcoal"
						size="icon"
						variant="ghost"
					>
						<RiUserLine className="h-5 w-5" />
						<span className="sr-only">Account</span>
					</Button>
					<Button
						className="text-charcoal/80 hover:text-charcoal"
						size="icon"
						variant="ghost"
					>
						<RiShoppingBagLine className="h-5 w-5" />
						<span className="sr-only">Cart</span>
					</Button>
				</div>
			</div>
		</header>
	);
}

import { Route } from "next";
import Link from "next/link";

import { RiMenuLine, RiUserLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { Logo } from "@/assets/logo";

import { CartButton } from "../shop/cart-button";

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
		<header className="fixed top-3 left-1/2 z-50 -translate-x-1/2 max-sm:w-full">
			<div className="flex items-center justify-between gap-4 px-4">
				<div className="flex items-center gap-3">
					{/* Mobile Menu (Hidden on Desktop) */}
					<Button className="md:hidden" size="icon" variant="ghost">
						<RiMenuLine className="size-5" />
						<span className="sr-only">Toggle menu</span>
					</Button>

					{/* Logo */}
					<Link
						className="flex size-12 items-center justify-center rounded-full border-border/40 bg-white/80 backdrop-blur-lg transition-colors hover:bg-white supports-backdrop-filter:bg-white/60 sm:size-14"
						href="/"
					>
						<Logo className="size-8 md:size-10" />
					</Link>
				</div>

				<div className="flex h-14 items-center gap-6 rounded-xl border-border/40 bg-white/80 px-4 backdrop-blur-lg supports-backdrop-filter:bg-white/60 md:px-6">
					{/* Desktop Navigation */}
					<nav className="hidden gap-8 md:flex">
						{NAV_LINKS.map((link) => (
							<Link
								className="font-body font-medium text-charcoal/80 text-sm transition-colors hover:text-amber-600"
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
							<RiUserLine className="size-5" />
							<span className="sr-only">Account</span>
						</Button>
						<CartButton />
					</div>
				</div>
			</div>
		</header>
	);
}

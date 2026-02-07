"use client";

import { useState } from "react";

import { Route } from "next";
import Link from "next/link";

import { RiMenuLine, RiUserLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Logo } from "@/assets/logo";

import { CartButton } from "../shop/cart-button";

const NAV_LINKS = [
	{ name: "Home", href: "/" },
	{ name: "Shop", href: "/shop" },
	// { name: "Collections", href: "/collections" },
	// { name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
] as const;

export function Header() {
	const [open, setOpen] = useState(false);
	return (
		<header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 max-sm:w-full sm:max-w-[calc(100%-2rem)]">
			<div className="flex items-center justify-between gap-4 px-4 sm:px-0">
				<div className="flex items-center gap-3">
					<Sheet onOpenChange={setOpen} open={open}>
						<SheetTrigger
							render={
								<Button
									aria-label="Toggle menu"
									className="md:hidden"
									size="icon"
									variant="ghost"
								/>
							}
						>
							<RiMenuLine className="size-5" />
						</SheetTrigger>
						<SheetContent
							className="w-[280px] border-0 bg-card/95 backdrop-blur-md sm:w-[320px]"
							side="left"
						>
							<SheetHeader className="pb-6 text-left">
								<SheetTitle className="font-display font-normal text-foreground text-lg">
									Menu
								</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-0.5">
								{NAV_LINKS.map((link) => (
									<Link
										className="rounded-md px-4 py-3 font-body text-foreground/80 text-sm transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground"
										href={link.href as Route}
										key={link.name}
										onClick={() => setOpen(false)}
									>
										{link.name}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>

					<Link
						className="flex size-11 items-center justify-center rounded-full bg-card/90 backdrop-blur-md transition-all duration-300 hover:bg-card sm:size-12"
						href="/"
					>
						<Logo className="size-7 md:size-8" />
					</Link>
				</div>

				<div className="flex h-12 items-center gap-8 rounded-full bg-card/90 px-5 backdrop-blur-md md:h-12 md:px-8">
					<nav className="hidden gap-8 md:flex">
						{NAV_LINKS.map((link) => (
							<Link
								className="font-body text-[0.8125rem] text-foreground/75 tracking-wide transition-colors duration-300 hover:text-foreground"
								href={link.href as Route}
								key={link.name}
							>
								{link.name}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-1">
						<Button
							className="text-foreground/70 hover:text-foreground"
							size="icon-sm"
							variant="ghost"
						>
							<RiUserLine className="size-4" />
							<span className="sr-only">Account</span>
						</Button>
						<CartButton />
					</div>
				</div>
			</div>
		</header>
	);
}

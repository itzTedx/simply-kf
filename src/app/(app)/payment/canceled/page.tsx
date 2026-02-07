"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function PaymentCanceled() {
	return (
		<main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-20 md:py-28">
			<div className="w-full max-w-md rounded-(--radius) bg-card/50 px-8 py-12 text-center">
				<div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-destructive/10">
					<svg
						className="size-7 text-destructive"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M6 18L18 6M6 6l12 12"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
						/>
					</svg>
				</div>
				<h1 className="mb-4 font-display font-normal text-2xl text-foreground">
					Payment canceled
				</h1>
				<p className="mb-6 font-body text-foreground/70 text-sm leading-relaxed">
					No charges were made. You may have canceled the process or there was
					an issue with the payment method.
				</p>
				<div className="space-y-3">
					<Link href="/shop">
						<Button className="w-full rounded-(--radius)" size="lg">
							Try again
						</Button>
					</Link>
					<Link href="/">
						<Button className="w-full rounded-(--radius)" variant="outline">
							Return home
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}

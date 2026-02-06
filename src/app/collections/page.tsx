import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { COLLECTIONS } from "@/constants/collections";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Our Collections",
	description:
		"Explore SIMPLY KF collections — a considered edit of timeless abayas and essentials. Designed with intention in Dubai.",
};

export default function CollectionsPage() {
	return (
		<main className="min-h-screen bg-background">
			<section className="container mx-auto max-w-6xl px-4 py-24 text-center md:px-6 md:py-32">
				<div className="mx-auto max-w-2xl space-y-5">
					<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-5xl lg:text-6xl">
						Our Collections
					</h1>
					<p className="font-body text-base text-foreground/65 leading-relaxed md:text-lg">
						A considered edit of timeless abayas and essentials.
					</p>
				</div>
			</section>

			<section className="container mx-auto max-w-6xl space-y-24 px-4 pb-24 md:space-y-32 md:px-6 md:pb-32">
				{COLLECTIONS.map((collection, index) => (
					<div
						className={cn(
							"flex flex-col items-center gap-10 md:gap-20",
							index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
						)}
						key={collection.id}
					>
						<div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted/40 md:w-1/2">
							<Image
								alt=""
								className="object-cover transition-transform duration-500 ease-out hover:scale-[1.01]"
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								src={collection.image}
							/>
						</div>
						<div className="w-full space-y-6 px-2 text-center md:w-1/2 md:px-12 md:text-left">
							<h2 className="font-display font-normal text-2xl text-foreground md:text-4xl lg:text-5xl">
								{collection.title}
							</h2>
							<p className="mx-auto max-w-md font-body text-foreground/70 text-sm leading-relaxed md:mx-0 md:text-base">
								{collection.description}
							</p>
							<div className="pt-2">
								<Link
									className="inline-flex items-center justify-center rounded-[var(--radius)] border border-foreground/20 bg-transparent px-8 py-4 font-body text-foreground text-xs tracking-wide transition-colors duration-200 hover:bg-foreground/5"
									href="/shop"
								>
									Explore collection
								</Link>
							</div>
						</div>
					</div>
				))}
			</section>

			<section className="bg-secondary/20 py-24 md:py-32">
				<div className="container mx-auto max-w-2xl space-y-6 px-4 text-center md:px-6">
					<h2 className="font-display font-normal text-2xl text-foreground md:text-3xl">
						Designed with intention
					</h2>
					<p className="font-body text-foreground/70 text-sm leading-relaxed md:text-base">
						Each SIMPLY KF collection is created with longevity in mind — clean
						silhouettes, thoughtful fabrics, and refined construction.
					</p>
				</div>
			</section>

			<section className="py-16 md:py-20">
				<div className="container mx-auto max-w-xl px-4 text-center md:px-6">
					<p className="font-body text-[0.6875rem] text-foreground/45 uppercase leading-relaxed tracking-[0.15em] md:text-xs">
						All SIMPLY KF collections are designed and crafted in Dubai,
						reflecting modern refinement rooted in tradition.
					</p>
				</div>
			</section>

			<section className="flex flex-col items-center gap-4 pb-24 md:pb-32">
				<Link
					className="inline-flex min-w-[200px] items-center justify-center rounded-[var(--radius)] bg-primary px-8 py-4 font-body text-primary-foreground text-xs tracking-wide transition-opacity duration-200 hover:opacity-90"
					href="/shop"
				>
					Shop all
				</Link>
				<Link
					className="inline-flex min-w-[200px] items-center justify-center rounded-[var(--radius)] border border-border/80 px-8 py-4 font-body text-foreground/80 text-xs tracking-wide transition-colors duration-200 hover:bg-foreground/5"
					href="/shop"
				>
					Explore essentials
				</Link>
			</section>
		</main>
	);
}

import type { Metadata } from "next";
import { Route } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about SIMPLY KF — modest fashion designed in Dubai, curated for the UK. Our philosophy: timeless over trends, thoughtful design, and quality craftsmanship.",
};

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-background font-body text-foreground">
			<section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden sm:min-h-[55vh] md:h-[65vh]">
				<div className="absolute inset-0 bg-muted/60" />
				<div className="flex h-full w-full items-center justify-center text-foreground/15">
					<span className="font-body text-[0.65rem] uppercase tracking-[0.2em]">
						Editorial
					</span>
				</div>
				<div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
					<h1 className="mb-5 font-display font-normal text-3xl text-foreground tracking-tight md:text-5xl lg:text-6xl">
						About SIMPLY KF
					</h1>
					<p className="font-body text-base text-foreground/75 leading-relaxed md:text-lg">
						Timeless modest wear, thoughtfully designed in Dubai.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-4xl px-4 py-24 text-center md:px-6 md:py-28">
				<div className="mx-auto max-w-xl space-y-8">
					<span className="font-body text-[0.6875rem] text-foreground/50 uppercase tracking-[0.15em]">
						Our philosophy
					</span>
					<h2 className="font-display font-normal text-2xl text-foreground leading-tight md:text-4xl">
						Designed with purpose
					</h2>
					<div className="space-y-6 font-body text-foreground/75 text-sm leading-relaxed md:text-base">
						<p>
							SIMPLY KF was created for women who value modesty, elegance, and
							longevity in their wardrobe.
						</p>
						<p>
							Each piece is designed with intention — clean silhouettes, refined
							fabrics, and effortless wearability.
						</p>
					</div>
				</div>
			</section>

			<section className="w-full px-4 py-16 md:px-6 md:py-20">
				<div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
					<div className="flex aspect-4/5 items-center justify-center overflow-hidden rounded-sm bg-muted/50 text-foreground/20">
						<span className="font-body text-[0.65rem] uppercase tracking-[0.15em]">
							Studio
						</span>
					</div>
					<div className="max-w-md space-y-5">
						<h2 className="font-display font-normal text-2xl text-foreground md:text-3xl">
							Designed in Dubai
						</h2>
						<div className="h-px w-10 bg-foreground/15" />
						<p className="font-body text-foreground/70 text-sm leading-relaxed">
							Our designs are created in Dubai, where tradition meets modern
							refinement. Every abaya reflects thoughtful craftsmanship, precise
							tailoring, and attention to detail.
						</p>
					</div>
				</div>
			</section>

			<section className="bg-secondary/20 px-4 py-24 md:py-28">
				<div className="mx-auto max-w-2xl space-y-5 text-center">
					<h2 className="font-display font-normal text-2xl text-foreground md:text-4xl">
						Timeless over trends
					</h2>
					<p className="font-body text-foreground/70 text-sm leading-relaxed md:text-base">
						We create pieces that transcend seasons. SIMPLY KF focuses on
						enduring design — abayas that remain relevant, wearable, and elegant
						year after year.
					</p>
				</div>
			</section>

			<section className="w-full px-4 py-16 md:px-6 md:py-20">
				<div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
					<div className="order-2 max-w-md space-y-5 md:order-1 md:ml-auto md:text-right">
						<h2 className="font-display font-normal text-2xl text-foreground md:text-3xl">
							Exclusively for the UK
						</h2>
						<div className="h-px w-10 bg-foreground/15 md:ml-auto" />
						<p className="font-body text-foreground/70 text-sm leading-relaxed">
							SIMPLY KF is curated exclusively for women in the UK. From fit to
							fabric, each design is considered with the UK lifestyle, climate,
							and sensibility in mind.
						</p>
					</div>
					<div className="order-1 flex aspect-4/5 items-center justify-center overflow-hidden rounded-sm bg-muted/50 text-foreground/20 md:order-2">
						<span className="font-body text-[0.65rem] uppercase tracking-[0.15em]">
							Lifestyle
						</span>
					</div>
				</div>
			</section>

			<section className="px-4 py-24 md:px-6 md:py-28">
				<div className="mx-auto max-w-4xl">
					<div className="grid grid-cols-1 gap-8 border-border/30 border-t pt-12 text-center sm:grid-cols-2 sm:gap-12 sm:border-0 sm:pt-0 lg:grid-cols-4">
						{[
							"Thoughtful design",
							"Quality craftsmanship",
							"Considered production",
							"Respect for modest fashion values",
						].map((item, i) => (
							<div
								className="space-y-2 sm:border-border/30 sm:border-l sm:pl-8 first:sm:border-0 first:sm:pl-0"
								key={item}
							>
								<span className="block font-display text-foreground/90 text-lg">
									0{i + 1}
								</span>
								<span className="font-body text-foreground/65 text-sm">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="flex items-center justify-center px-4 py-28 md:py-36">
				<div className="max-w-2xl text-center">
					<p className="font-display font-normal text-2xl text-foreground leading-relaxed md:text-4xl lg:text-5xl">
						“SIMPLY KF is an expression of quiet confidence — created to be
						worn, lived in, and loved.”
					</p>
				</div>
			</section>

			<section className="flex flex-col items-center gap-4 px-4 pb-28 sm:flex-row md:pb-32">
				<Button
					className="min-w-[200px] rounded-(--radius)"
					nativeButton={false}
					render={<Link href={"/shop" as Route} />}
					size="lg"
				>
					Explore the collection
				</Button>
				<Button
					className="min-w-[200px] rounded-(--radius)"
					nativeButton={false}
					render={<Link href={"/shop" as Route} />}
					size="lg"
					variant="outline"
				>
					Shop essentials
				</Button>
			</section>
		</main>
	);
}

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-ivory font-body text-charcoal selection:bg-taupe selection:text-ivory">
			{/* 1. Page Hero */}
			<section className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden">
				{/* Background Placeholder */}
				<div className="fade-in absolute inset-0 animate-in bg-stone-200 transition-opacity duration-700">
					<div className="flex h-full w-full items-center justify-center bg-neutral-200/50 font-display text-taupe/30 text-xl uppercase tracking-widest">
						[Editorial Hero Image Placeholder]
					</div>
				</div>

				{/* Content Overlay */}
				<div className="slide-in-from-bottom-8 relative z-10 mx-auto max-w-3xl animate-in fill-mode-forwards px-6 text-center opacity-0 delay-150 duration-700">
					<h1 className="mb-6 font-display text-4xl text-charcoal tracking-tight md:text-6xl lg:text-7xl">
						About SIMPLY KF
					</h1>
					<p className="font-body font-light text-charcoal/80 text-lg tracking-wide md:text-xl">
						Timeless modest wear, thoughtfully designed in Dubai.
					</p>
				</div>
			</section>

			{/* 2. Brand Story Section */}
			<section className="mx-auto max-w-screen-xl px-6 py-24 md:px-12 lg:px-24">
				<div className="mx-auto max-w-2xl space-y-8 text-center">
					<span className="font-semibold text-taupe text-xs uppercase tracking-[0.2em]">
						Our Philosophy
					</span>
					<h2 className="font-display text-3xl text-charcoal leading-tight md:text-4xl lg:text-5xl">
						Designed with Purpose
					</h2>
					<div className="space-y-6 font-light text-charcoal/80 text-lg leading-relaxed">
						<p>
							SIMPLY KF was created for women who value modesty, elegance, and
							longevity in their wardrobe.
						</p>
						<p>
							Each piece is designed with intention — balancing clean
							silhouettes, refined fabrics, and effortless wearability.
						</p>
					</div>
				</div>
			</section>

			{/* 3. Designed in Dubai */}
			<section className="w-full px-0 py-16 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 items-center gap-0 md:grid-cols-2 md:gap-12 lg:gap-24">
					{/* Image */}
					<div className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-neutral-100 text-sm text-taupe/20 uppercase tracking-widest">
						<div className="absolute inset-0 bg-stone-100 transition-transform duration-1000 group-hover:scale-105" />
						<span className="relative z-10">[Design Studio Image]</span>
					</div>

					{/* Text */}
					<div className="max-w-lg space-y-6 px-6 py-12 md:px-0 md:py-0">
						<h2 className="font-display text-3xl text-charcoal md:text-4xl">
							Designed in Dubai
						</h2>
						<div className="h-0.5 w-12 bg-charcoal/10" />
						<p className="font-light text-charcoal/70 leading-relaxed">
							Our designs are created in Dubai, where tradition meets modern
							refinement. Every abaya reflects thoughtful craftsmanship, precise
							tailoring, and attention to detail.
						</p>
					</div>
				</div>
			</section>

			{/* 4. Timeless Over Trends */}
			<section className="bg-beige/30 px-6 py-24">
				<div className="mx-auto max-w-3xl space-y-6 text-center">
					<h2 className="font-display text-3xl text-charcoal md:text-5xl">
						Timeless Over Trends
					</h2>
					<p className="mx-auto max-w-2xl font-light text-charcoal/70 text-lg leading-relaxed md:text-xl">
						We believe in creating pieces that transcend seasons. SIMPLY KF
						focuses on enduring design — abayas that remain relevant, wearable,
						and elegant year after year.
					</p>
				</div>
			</section>

			{/* 5. Exclusively for the UK */}
			<section className="w-full px-0 py-16 pt-0 md:px-12 md:pt-16 lg:px-24">
				<div className="grid grid-cols-1 items-center gap-0 md:grid-cols-2 md:gap-12 lg:gap-24">
					{/* Text (Order 2 on mobile, Order 1 on desktop) */}
					<div className="order-2 max-w-lg space-y-6 px-6 py-12 md:order-1 md:ml-auto md:px-0 md:py-0 md:text-right">
						<h2 className="font-display text-3xl text-charcoal md:text-4xl">
							Exclusively for the UK
						</h2>
						<div className="h-0.5 w-12 bg-charcoal/10 md:ml-auto" />
						<p className="font-light text-charcoal/70 leading-relaxed">
							SIMPLY KF is curated exclusively for women in the UK. From fit to
							fabric, each design is considered with the UK lifestyle, climate,
							and sensibility in mind.
						</p>
					</div>

					{/* Image (Order 1 on mobile, Order 2 on desktop) */}
					<div className="group relative order-1 flex aspect-[4/5] items-center justify-center overflow-hidden bg-neutral-100 text-sm text-taupe/20 uppercase tracking-widest md:order-2">
						<div className="absolute inset-0 bg-stone-100 transition-transform duration-1000 group-hover:scale-105" />
						<span className="relative z-10">[UK Lifestyle Image]</span>
					</div>
				</div>
			</section>

			{/* 6. Our Commitment */}
			<section className="px-6 py-24">
				<div className="mx-auto max-w-4xl">
					<div className="grid grid-cols-1 gap-8 divide-y divide-charcoal/10 text-center sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:text-left lg:grid-cols-4">
						{[
							"Thoughtful design",
							"Quality craftsmanship",
							"Considered production",
							"Respect for modest fashion values",
						].map((item, i) => (
							<div
								className="flex items-center justify-center pt-8 first:pl-0 last:pr-0 sm:block sm:px-8 sm:pt-0"
								key={i}
							>
								<span className="mb-2 block font-display text-charcoal text-xl">
									0{i + 1}
								</span>
								<span className="font-body text-charcoal/70 text-sm tracking-wide">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 7. Closing Statement */}
			<section className="flex items-center justify-center px-6 py-32">
				<div className="max-w-2xl text-center">
					<p className="font-display text-3xl text-charcoal leading-tight md:text-5xl lg:text-6xl">
						“SIMPLY KF is an expression of quiet confidence — created to be
						worn, lived in, and loved.”
					</p>
				</div>
			</section>

			{/* 8. Call to Action */}
			<section className="px-6 pb-32">
				<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
					<Button
						className="rounded-none bg-charcoal px-10 py-6 text-ivory text-sm uppercase tracking-widest transition-all duration-300 hover:bg-charcoal/90"
						nativeButton={false}
						render={<Link href="/shop" />}
					>
						Explore the Collection
					</Button>
					<Button
						className="rounded-none border-charcoal px-10 py-6 text-charcoal text-sm uppercase tracking-widest transition-all duration-300 hover:bg-charcoal/5"
						nativeButton={false}
						render={<Link href="/shop/essentials" />}
						variant="outline"
					>
						Shop Essentials
					</Button>
				</div>
			</section>
		</main>
	);
}

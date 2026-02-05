import Image from "next/image";
import Link from "next/link";

import { COLLECTIONS } from "@/constants/collections";
import { cn } from "@/lib/utils";

export default function CollectionsPage() {
	return (
		<main className="min-h-screen bg-white">
			{/* 1. Page Hero / Intro */}
			<section className="container mx-auto px-4 py-24 text-center md:py-32">
				<div className="fade-in slide-in-from-bottom-4 mx-auto max-w-2xl animate-in space-y-6 duration-700">
					<h1 className="font-display text-4xl text-zinc-900 tracking-tight md:text-6xl">
						Our Collections
					</h1>
					<p className="font-body font-light text-lg text-zinc-500 tracking-wide md:text-xl">
						A considered edit of timeless abayas and essentials.
					</p>
				</div>
			</section>

			{/* 2. Collections Grid (Vertical Stack) */}
			<section className="container mx-auto space-y-24 px-4 pb-24 md:space-y-32 md:pb-32">
				{COLLECTIONS.map((collection, index) => (
					<div
						className={cn(
							"flex flex-col items-center gap-8 md:gap-16",
							// Alternating layout for desktop: even items reverse
							index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
						)}
						key={collection.id}
					>
						<div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-zinc-100 md:aspect-4/5 md:w-1/2">
							<Image
								alt={`Image for ${collection.title}`}
								className="object-cover"
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								src={collection.image}
							/>
						</div>

						{/* Content */}
						<div className="w-full space-y-6 px-4 text-center md:w-1/2 md:px-12 md:text-left">
							<h2 className="font-display text-3xl text-zinc-800 md:text-5xl">
								{collection.title}
							</h2>
							<p className="mx-auto max-w-md font-body text-base text-zinc-600 leading-relaxed md:mx-0 md:text-lg">
								{collection.description}
							</p>
							<div className="pt-4">
								<Link
									className="inline-flex items-center justify-center rounded-none border-zinc-900 px-8 py-6 text-sm text-zinc-900 uppercase tracking-widest transition-all duration-300 hover:bg-zinc-900 hover:text-white"
									href={"/collections"}
								>
									Explore Collection
								</Link>
							</div>
						</div>
					</div>
				))}
			</section>

			{/* 3. Philosophy Section */}
			<section className="bg-zinc-50 py-24 md:py-32">
				<div className="container mx-auto max-w-3xl space-y-8 px-4 text-center">
					<h2 className="font-display text-3xl text-zinc-800 md:text-4xl">
						Designed with Intention
					</h2>
					<p className="font-body font-light text-lg text-zinc-600 leading-relaxed md:text-xl">
						Each SIMPLY KF collection is created with longevity in mind —
						balancing clean silhouettes, thoughtful fabrics, and refined
						construction.
					</p>
				</div>
			</section>

			{/* 4. Designed in Dubai Note */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-xl px-4 text-center">
					<p className="font-body text-xs text-zinc-400 uppercase leading-loose tracking-widest md:text-sm">
						All SIMPLY KF collections are designed and crafted in Dubai,
						reflecting modern refinement rooted in tradition.
					</p>
				</div>
			</section>

			{/* 5. Closing CTA */}
			<section className="space-y-8 pb-24 text-center md:pb-32">
				<div className="flex flex-colsm:flex-col items-center justify-center gap-4">
					<Link
						className="inline-flex w-64 items-center justify-center rounded-none bg-zinc-900 px-10 py-7 text-sm text-white uppercase tracking-widest shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md"
						href={"/shop"}
					>
						Shop All Abayas
					</Link>
					<Link
						className="inline-flex w-64 items-center justify-center rounded-none px-10 py-7 text-sm text-zinc-600 uppercase tracking-widest hover:bg-transparent hover:text-zinc-900"
						href={"/shop"}
					>
						Explore Essentials
					</Link>
				</div>
			</section>
		</main>
	);
}

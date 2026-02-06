import Image from "next/image";
import Link from "next/link";

import { COLLECTIONS } from "@/constants/collections";

export function FeaturedCollections() {
	return (
		<section className="bg-background px-4 py-16 md:px-6 md:py-32">
			<div className="container mx-auto max-w-6xl">
				<div className="mb-10 text-center md:mb-16">
					<p className="font-body text-[0.6875rem] text-foreground/50 uppercase tracking-[0.2em]">
						Collections
					</p>
					<h2 className="mt-3 font-display font-normal text-foreground text-xl tracking-tight md:text-3xl">
						Explore by style
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
					{COLLECTIONS.map((collection, index) => (
						<div
							className="group relative flex flex-col"
							key={`${index}-${collection.title}`}
						>
							<div className="relative flex aspect-[3/4] items-end overflow-hidden rounded-md bg-muted/50 active:opacity-95 md:rounded-sm">
								<Image
									alt=""
									className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									src={collection.image}
								/>
								<div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
								<div className="relative z-10 space-y-2 p-5 pt-10 text-center md:p-6 md:pt-12 md:text-left">
									<h3 className="font-display font-normal text-foreground text-xl md:text-2xl">
										{collection.title}
									</h3>
									<p className="font-body text-foreground/70 text-sm leading-relaxed">
										{collection.description}
									</p>
									<span className="inline-block font-body text-foreground/60 text-xs tracking-wide transition-colors duration-200 group-hover:text-foreground/90">
										View Collection
									</span>
								</div>
								<Link
									className="absolute inset-0 z-10"
									href={`/shop?collection=${collection.id}`}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

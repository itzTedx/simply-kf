import Image from "next/image";
import Link from "next/link";

import { COLLECTIONS } from "@/constants/collections";

export function FeaturedCollections() {
	return (
		<section className="bg-white py-16 md:py-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{COLLECTIONS.map((collection, index) => (
						<div
							className="group relative flex flex-col gap-4"
							key={`${index}-${collection.title}`}
						>
							<div className="relative flex aspect-3/4 items-end overflow-hidden rounded-md bg-muted p-6">
								<Image
									alt="Collection Image"
									className="object-cover transition-all duration-300 ease-out group-hover:scale-105"
									fill
									src={collection.image}
								/>
								<div className="relative z-10 mt-2 space-y-2 text-center md:text-left">
									<h3 className="font-medium text-2xl text-black">
										{collection.title}
									</h3>
									<p className="font-body text-charcoal/80 text-sm">
										{collection.description}
									</p>

									<span className="font-body font-semibold text-muted-foreground text-xs underline decoration-charcoal/30 underline-offset-4 transition-all group-hover:decoration-charcoal">
										View Collection
									</span>
								</div>
								<Link
									className="absolute inset-0 z-10"
									href={`/shop?collection=${collection.id}`}
								/>
								<div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-linear-to-t from-15% from-card" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

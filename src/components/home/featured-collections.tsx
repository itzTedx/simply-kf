import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCollections() {
	const collections = [
		{
			title: "Essential Abayas",
			description: "Everyday elegance for the modern woman.",
			image: "/images/collections/collection-1.webp",
			href: "#",
		},
		{
			title: "Statement Abayas",
			description: "Bold designs for special occasions.",
			image: "/images/collections/collection-2.webp",
			href: "#",
		},
		{
			title: "Modest Essentials",
			description: "Foundational pieces for your wardrobe.",
			image: "/images/collections/collection-3.webp",
			href: "#",
		},
	];

	return (
		<section className="bg-white py-16 md:py-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{collections.map((collection, index) => (
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
									<h3 className="font-display font-medium text-2xl text-charcoal">
										{collection.title}
									</h3>
									<p className="font-body text-charcoal/60 text-sm">
										{collection.description}
									</p>

									<Link
										className="t font-body font-semibold text-muted-foreground text-xs underline decoration-charcoal/30 underline-offset-4 transition-all hover:decoration-charcoal"
										href={collection.href as Route}
									>
										View Collection
									</Link>
								</div>

								<div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-linear-to-t from-10% from-neutral-50/90" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

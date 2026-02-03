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
							<div className="relative aspect-3/4 overflow-hidden rounded-md bg-muted">
								<Image alt="Collection Image" fill src={collection.image} />
							</div>

							<div className="mt-2 space-y-2 text-center md:text-left">
								<h3 className="font-display font-medium text-2xl text-charcoal">
									{collection.title}
								</h3>
								<p className="font-body text-charcoal/60 text-sm">
									{collection.description}
								</p>
								<div className="pt-2">
									<Link
										className="font-body font-semibold text-charcoal text-xs uppercase tracking-widest underline decoration-charcoal/30 underline-offset-4 transition-all hover:decoration-charcoal"
										href={collection.href as Route}
									>
										View Collection
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

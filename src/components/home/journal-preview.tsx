import Link from "next/link";

export function JournalPreview() {
	const articles = [
		{
			title: "Styling a Timeless Abaya in the UK",
			category: "Styling",
			href: "#",
		},
		{ title: "Caring for Your Abaya", category: "Care Guide", href: "#" },
		{ title: "The Meaning of Modest Luxury", category: "Culture", href: "#" },
	];

	return (
		<section className="bg-white py-16 md:py-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="mb-12 flex items-center justify-between">
					<h2 className="font-display font-medium text-2xl text-charcoal">
						The Journal
					</h2>
					<Link
						className="font-body font-medium text-charcoal/60 text-sm hover:text-charcoal"
						href="#"
					>
						View All
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{articles.map((article, index) => (
						<div
							className="group cursor-pointer space-y-4"
							key={`${index}-${article.title}`}
						>
							<div className="aspect-4/3 w-full overflow-hidden bg-muted transition-transform duration-500 group-hover:bg-muted/80">
								<div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-300">
									<span className="font-mono text-xs uppercase tracking-widest">
										[Article Img]
									</span>
								</div>
							</div>
							<div className="space-y-2">
								<span className="font-body font-semibold text-charcoal/40 text-xs uppercase tracking-widest">
									{article.category}
								</span>
								<h3 className="font-display font-medium text-charcoal text-xl decoration-charcoal/30 underline-offset-4 group-hover:underline">
									{article.title}
								</h3>
								<div className="pt-2">
									<span className="font-body font-medium text-charcoal/60 text-xs hover:text-charcoal">
										Read Story
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

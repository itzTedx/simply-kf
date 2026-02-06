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
		<section className="bg-secondary/20 py-20 md:py-28">
			<div className="container mx-auto max-w-6xl px-4 md:px-6">
				<div className="mb-14 flex items-end justify-between">
					<h2 className="font-display font-normal text-foreground text-xl tracking-tight md:text-2xl">
						The Journal
					</h2>
					<Link
						className="font-body text-foreground/55 text-xs tracking-wide transition-colors hover:text-foreground/85"
						href="#"
					>
						View All
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
					{articles.map((article, index) => (
						<Link
							className="group block space-y-4"
							href={article.href}
							key={`${index}-${article.title}`}
						>
							<div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted/50 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
								<div className="flex h-full w-full items-center justify-center text-foreground/20">
									<span className="font-body text-[0.65rem] uppercase tracking-[0.15em]">
										Article
									</span>
								</div>
							</div>
							<div className="space-y-2">
								<span className="font-body text-[0.6875rem] text-foreground/45 uppercase tracking-[0.15em]">
									{article.category}
								</span>
								<h3 className="font-display font-normal text-foreground text-lg leading-snug transition-colors group-hover:text-foreground/85">
									{article.title}
								</h3>
								<span className="inline-block font-body text-foreground/55 text-xs transition-colors group-hover:text-foreground/80">
									Read Story
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

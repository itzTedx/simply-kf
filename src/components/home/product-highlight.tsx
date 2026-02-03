import { Button } from "@/components/ui/button";

export function ProductHighlight() {
	return (
		<section className="bg-beige/20 py-16 md:py-0">
			<div className="grid grid-cols-1 md:grid-cols-2">
				{/* Image Side */}
				<div className="relative aspect-square w-full bg-muted md:aspect-auto md:h-full md:min-h-[600px]">
					<div className="flex h-full w-full items-center justify-center bg-stone-200 text-stone-400">
						<span className="font-mono text-sm uppercase tracking-widest">
							[Product Highlight Img]
						</span>
					</div>
				</div>

				{/* Content Side */}
				<div className="flex flex-col justify-center px-4 py-12 md:px-16 md:py-24 lg:px-24">
					<span className="mb-4 font-body font-semibold text-charcoal/50 text-xs uppercase tracking-widest">
						Editorial Pick
					</span>
					<h2 className="mb-6 font-display font-medium text-3xl text-charcoal md:text-4xl lg:text-5xl">
						The Everyday Abaya
					</h2>
					<p className="mb-8 font-body text-charcoal/70 md:text-lg">
						Designed for the modern woman who values elegance without
						compromise. The Everyday Abaya combines fluid movement with
						structure, creating a silhouette that is both relaxing and refined.
					</p>

					<ul className="mb-8 space-y-3 font-body text-charcoal/80 text-sm">
						<li className="flex items-start gap-3">
							<span className="mt-1.5 h-1 w-1 rounded-full bg-charcoal" />
							Fluid drape that moves with you
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1.5 h-1 w-1 rounded-full bg-charcoal" />
							Premium fabric sourced for comfort
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1.5 h-1 w-1 rounded-full bg-charcoal" />
							Designed for everyday elegance
						</li>
					</ul>

					<Button
						className="w-fit bg-charcoal text-white hover:bg-charcoal/90"
						size="lg"
					>
						Shop Now
					</Button>
				</div>
			</div>
		</section>
	);
}

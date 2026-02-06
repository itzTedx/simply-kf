import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ProductHighlight() {
	return (
		<section className="bg-secondary/30 py-16 md:py-0">
			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="relative aspect-square w-full bg-muted/40 md:aspect-auto md:min-h-[580px]">
					<Image
						alt=""
						className="object-cover"
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						src="/images/featured.webp"
					/>
				</div>

				<div className="flex flex-col justify-center px-5 py-14 md:px-16 md:py-32 lg:px-24">
					<span className="mb-4 font-body text-[0.6875rem] text-foreground/50 uppercase tracking-[0.2em]">
						Editorial pick
					</span>
					<h2 className="mb-5 font-display font-normal text-2xl text-foreground leading-tight md:mb-6 md:text-4xl lg:text-[2.75rem]">
						The Everyday Abaya
					</h2>
					<p className="mb-6 font-body text-[0.9375rem] text-foreground/75 leading-relaxed md:mb-8 md:text-lg">
						Designed for the modern woman who values elegance without
						compromise. Fluid movement with structure — relaxed and refined.
					</p>

					<ul className="mb-8 space-y-3 font-body text-foreground/70 text-sm leading-relaxed md:mb-10 md:space-y-4">
						<li className="flex items-start gap-3">
							<span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
							Fluid drape that moves with you
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
							Premium fabric sourced for comfort
						</li>
						<li className="flex items-start gap-3">
							<span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
							Designed for everyday elegance
						</li>
					</ul>

					<Button
						className="h-12 min-h-12 w-full md:h-11 md:w-fit"
						render={<Link href="/shop" />}
						size="lg"
					>
						Explore
					</Button>
				</div>
			</div>
		</section>
	);
}

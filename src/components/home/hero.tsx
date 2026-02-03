import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="relative flex h-[90vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-beige/30">
			<div className="absolute inset-0 z-0 bg-neutral-200">
				<Image
					alt="Hero Image"
					className="object-cover"
					fill
					src="/images/hero.webp"
				/>
				{/* Overlay */}
				<div className="absolute inset-0 bg-black/10" />
			</div>

			<div className="container relative z-10 mx-auto">
				<h1 className="font-display font-semibold text-4xl text-white leading-tight drop-shadow-sm md:text-6xl lg:text-7xl">
					Timeless Abayas,
					<br className="hidden md:block" /> Thoughtfully Made
				</h1>
				<p className="font-body text-lg text-white/90 drop-shadow-sm md:text-xl">
					Elevated modest wear, designed in Dubai. Exclusively for the UK.
				</p>

				<div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
					<Button className="min-w-[180px]" size="lg">
						Shop the Collection
					</Button>
					<Button className="min-w-[180px]" size="lg" variant="outline">
						Explore Essentials
					</Button>
				</div>
			</div>
		</section>
	);
}

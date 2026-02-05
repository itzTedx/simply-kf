"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="relative h-svh w-full overflow-hidden bg-beige/30">
			<Image
				alt="Hero Image"
				className="object-cover"
				fill
				src="/images/carousel/hero-carousel-1.webp"
			/>
			<div className="container absolute inset-0 z-10 mx-auto flex items-center justify-center px-4 text-center sm:justify-start sm:text-start">
				<div className="max-w-2xl space-y-3">
					<h1 className="font-display font-semibold text-4xl text-primary leading-tight drop-shadow-sm md:text-6xl lg:text-7xl">
						Timeless Abayas,
						<br className="hidden md:block" /> Thoughtfully Made
					</h1>
					<p className="font-body text-lg text-muted-foreground md:text-xl">
						Elevated modest wear, designed in Dubai. Exclusively for the UK.
					</p>

					<div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
						<Button className="w-full md:w-auto" size="lg">
							Shop the Collection
						</Button>
						<Button className="w-full md:w-auto" size="lg" variant="outline">
							Explore Essentials
						</Button>
					</div>
				</div>
			</div>
			{/* <Carousel
				className="flex h-svh w-full"
				opts={{
					align: "start",
				}}
				plugins={[
					Autoplay({
						delay: 3000,
					}),
					WheelGesturesPlugin(),
				]}
			>
				<CarouselContent className="h-full">
					<CarouselItem className="relative h-full">
						
					</CarouselItem>
				</CarouselContent>
			</Carousel> */}
		</section>
	);
}

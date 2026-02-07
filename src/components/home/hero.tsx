import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="relative min-h-svh w-full overflow-hidden bg-muted/30">
			<Image
				alt=""
				className="object-cover"
				fill
				priority
				sizes="100vw"
				src="/images/london-muslin-shopping-fesst.webp"
			/>

			<div className="container absolute inset-0 z-10 mx-auto flex items-center justify-center pb-[max(2rem,env(safe-area-inset-bottom))] text-center md:items-center md:justify-start md:px-10 md:pt-0 md:pb-0 md:text-left lg:px-12">
				<div className="w-full max-w-2xl px-5 md:px-0">
					<p className="font-body text-[0.6875rem] text-muted uppercase tracking-[0.25em] md:text-[0.6875rem]">
						Designed in Dubai · For the UK
					</p>
					<h1 className="font-display font-normal text-[2.25rem] text-card text-shadow-foreground text-shadow-md leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
						Timeless Abayas.
						<br />
						Thoughtfully Made.
					</h1>
					<p className="mt-4 font-body text-[0.9375rem] text-card leading-relaxed sm:max-w-md sm:text-base md:text-lg lg:text-xl">
						Elevated modest wear. Quiet luxury, refined for every day.
					</p>

					<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:pt-2 md:justify-start">
						<Button
							className="h-12 min-h-12 w-full md:h-11 md:w-auto md:min-w-[140px]"
							nativeButton={false}
							render={<Link href="/shop" />}
							size="lg"
						>
							Explore
						</Button>
						{/* <Button
							className="h-12 min-h-12 w-full text-white md:h-11 md:w-auto md:min-w-[140px]"
							nativeButton={false}
							render={<Link href="/shop?availability=sales" />}
							size="lg"
							variant="outline"
						>
							Discover
						</Button> */}
					</div>
				</div>
			</div>
		</section>
	);
}

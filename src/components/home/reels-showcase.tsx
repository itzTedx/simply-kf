"use client";

import { useState } from "react";

import Link from "next/link";

import { RiPlayLine } from "@remixicon/react";
import Autoplay from "embla-carousel-autoplay";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { mockReels, type Reel } from "@/constants/reels";

interface ReelsShowcaseProps {
	reels?: Reel[];
}

export function ReelsShowcase({ reels = mockReels }: ReelsShowcaseProps) {
	const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openReel = (reel: Reel) => {
		setSelectedReel(reel);
		setIsDialogOpen(true);
	};

	return (
		<section className="container mx-auto max-w-6xl px-4 py-16 md:py-28">
			<div className="mb-10 text-center md:mb-20">
				<h2 className="mb-3 font-display font-normal text-foreground text-xl tracking-tight md:mb-4 md:text-3xl">
					Styled in Motion
				</h2>
				<p className="mx-auto max-w-xl font-body text-foreground/65 text-sm leading-relaxed md:text-base">
					Discover how SIMPLY KF is worn — effortless, refined, timeless.
				</p>
			</div>

			<Carousel
				className="mb-10 md:mb-14"
				opts={{ align: "start" }}
				plugins={[Autoplay({ delay: 4000 }), WheelGesturesPlugin()]}
			>
				<CarouselContent className="-ml-2">
					{reels.map((reel) => (
						<CarouselItem className="basis-1/2 pl-2 lg:basis-1/4" key={reel.id}>
							<ReelCard onClick={() => openReel(reel)} reel={reel} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="border-0 bg-card/90 text-foreground/80 hover:bg-card hover:text-foreground" />
				<CarouselNext className="border-0 bg-card/90 text-foreground/80 hover:bg-card hover:text-foreground" />
			</Carousel>

			<div className="text-center">
				<Link
					href="https://www.tiktok.com/@simplykfabayas"
					rel="noopener noreferrer"
					target="_blank"
				>
					<Button size="sm" variant="outline">
						View on TikTok
					</Button>
				</Link>
				<p className="mt-4 font-body text-foreground/50 text-xs">
					Follow{" "}
					<Link
						className="text-foreground/70 underline-offset-2 transition-colors hover:text-foreground"
						href="https://instagram.com/simplykf"
						rel="noopener noreferrer"
						target="_blank"
					>
						@simplykf
					</Link>
				</p>
			</div>

			<Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
				<DialogContent className="max-w-2xl border-0 bg-card/98 p-0 backdrop-blur-sm">
					<DialogHeader className="sr-only">
						<DialogTitle>Reel Video</DialogTitle>
						<DialogDescription>View SIMPLY KF reel video</DialogDescription>
					</DialogHeader>
					{selectedReel && (
						<div className="relative aspect-9/16 w-full">
							<video
								autoPlay
								className="h-full w-full object-cover"
								controls
								playsInline
								preload="metadata"
							>
								<source src={selectedReel.videoUrl} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</section>
	);
}

interface ReelCardProps {
	reel: Reel;
	onClick: () => void;
}

function ReelCard({ reel, onClick }: ReelCardProps) {
	const [videoLoaded, setVideoLoaded] = useState(false);

	return (
		<div
			className="group cursor-pointer space-y-2.5"
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
			role="button"
			tabIndex={0}
		>
			<div className="relative aspect-9/16 w-full overflow-hidden rounded-sm bg-muted/50">
				{!videoLoaded && <Skeleton className="absolute inset-0" />}
				<video
					autoPlay
					className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
						videoLoaded ? "opacity-100" : "opacity-0"
					}`}
					loop
					muted
					onLoadedData={() => setVideoLoaded(true)}
					onMouseEnter={(e) => e.currentTarget.play()}
					onMouseLeave={(e) => e.currentTarget.pause()}
					playsInline
				>
					<source src={reel.thumbnail} type="video/mp4" />
				</video>
				<div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10">
					<div className="rounded-full bg-card/95 p-2.5 shadow-none transition-transform duration-300 group-hover:scale-105">
						<RiPlayLine className="size-5 text-foreground" />
					</div>
				</div>
			</div>
			{reel.caption && (
				<p className="line-clamp-2 font-body text-foreground/65 text-xs leading-relaxed">
					{reel.caption}
				</p>
			)}
		</div>
	);
}

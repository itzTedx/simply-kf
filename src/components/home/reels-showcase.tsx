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
		<section className="container mx-auto py-16 md:py-24">
			{/* Section Header */}
			<div className="mb-12 text-center md:mb-16">
				<h2 className="mb-4 font-display text-3xl text-neutral-900 md:text-4xl">
					Styled in Motion
				</h2>
				<p className="mx-auto max-w-2xl font-body text-neutral-600 md:text-lg">
					Discover how SIMPLY KF is worn — effortless, refined, timeless.
				</p>
			</div>

			{/* Reels Grid */}

			<Carousel
				className="mb-12"
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
				<CarouselContent>
					{reels.map((reel) => (
						<CarouselItem className="basis-1/2 lg:basis-1/4" key={reel.id}>
							<div className="p-1">
								<ReelCard
									key={reel.id}
									onClick={() => openReel(reel)}
									reel={reel}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="relative" />
				<CarouselNext className="relative" />
			</Carousel>

			{/* Call to Action */}
			<div className="text-center">
				<Link
					href="https://www.tiktok.com/@simplykfabayas"
					rel="noopener noreferrer"
					target="_blank"
				>
					<Button variant="outline">View on TikTok</Button>
				</Link>
				<p className="mt-3 font-body text-neutral-500 text-sm">
					Follow{" "}
					<Link
						className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900"
						href="https://instagram.com/simplykf"
						rel="noopener noreferrer"
						target="_blank"
					>
						@simplykf
					</Link>
				</p>
			</div>

			{/* Video Modal */}
			<Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
				<DialogContent className="max-w-2xl p-0">
					<DialogHeader className="sr-only">
						<DialogTitle>Reel Video</DialogTitle>
						<DialogDescription>View SIMPLY KF reel video</DialogDescription>
					</DialogHeader>
					{selectedReel && (
						<div className="relative aspect-9/16 w-full">
							{/* Actual video */}
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
			className="group cursor-pointer space-y-3"
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
			{/* Video Thumbnail Container */}
			<div className="relative aspect-9/16 w-full overflow-hidden rounded-lg bg-neutral-100">
				{/* Loading skeleton */}
				{!videoLoaded && <Skeleton className="absolute inset-0" />}

				{/* Video thumbnail */}
				<video
					autoPlay
					className={`object-cover transition-transform duration-300 ease-out group-hover:scale-105 ${
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

				{/* Play icon overlay */}
				<div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
					<div className="rounded-full bg-white/90 p-3 transition-transform duration-300 group-hover:scale-110">
						<RiPlayLine className="size-6 text-neutral-900" />
					</div>
				</div>
			</div>

			{/* Caption */}
			{reel.caption && (
				<p className="line-clamp-2 font-body text-neutral-700 text-sm leading-relaxed">
					{reel.caption}
				</p>
			)}
		</div>
	);
}

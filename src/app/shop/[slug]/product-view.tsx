"use client";

import { useState } from "react";

import Image from "next/image";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductViewProps {
	product: Product;
}

export function ProductView({ product }: ProductViewProps) {
	const [selectedSize, setSelectedSize] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
	const [mainImage, setMainImage] = useState<string>(product.images[0]);
	const [isImageLoading, setIsImageLoading] = useState(true);

	return (
		<div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
			{/* Left Column: Image Gallery */}
			<div className="flex flex-col gap-4">
				<div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-zinc-50">
					{isImageLoading && (
						<Skeleton className="absolute inset-0 size-full" />
					)}
					<Image
						alt={product.name}
						className={cn(
							"object-cover transition-opacity duration-500",
							isImageLoading ? "opacity-0" : "opacity-100"
						)}
						fill
						onLoad={() => setIsImageLoading(false)}
						priority
						sizes="(max-width: 768px) 100vw, 50vw"
						src={mainImage}
					/>
				</div>
				<div className="grid grid-cols-4 gap-4">
					{product.images.map((img, idx) => (
						<button
							className={cn(
								"relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-zinc-50 transition-all",
								mainImage === img
									? "ring-1 ring-zinc-900"
									: "opacity-60 hover:opacity-80"
							)}
							key={idx}
							onClick={() => setMainImage(img)}
						>
							<Image
								alt={`${product.name} view ${idx + 1}`}
								className="object-cover"
								fill
								sizes="(max-width: 768px) 25vw, 12vw"
								src={img}
							/>
						</button>
					))}
				</div>
			</div>

			{/* Right Column: Product Info & Actions */}
			<div className="flex h-full flex-col">
				<div className="sticky top-24 space-y-8">
					{/* Header */}
					<div className="space-y-4 border-zinc-100 border-b pb-6">
						<h1 className="font-display text-4xl text-zinc-900 lg:text-5xl">
							{product.name}
						</h1>
						<div className="flex items-center justify-between">
							<p className="font-light text-xl text-zinc-600">
								£{product.price}
							</p>
							<span className="text-xs text-zinc-400 uppercase tracking-widest">
								Designed in Dubai
							</span>
						</div>
					</div>

					{/* Description */}
					<p className="font-light text-zinc-600 leading-relaxed">
						{product.description}
					</p>

					{/* Selectors */}
					<div className="space-y-6 pt-2">
						{/* Colors */}
						<div className="space-y-3">
							<span className="text-xs text-zinc-500 uppercase tracking-widest">
								Color: <span className="text-zinc-900">{selectedColor}</span>
							</span>
							<div className="flex flex-wrap gap-3">
								{product.colors.map((color) => (
									<button
										className={cn(
											"h-8 rounded-full border px-4 text-sm transition-all",
											selectedColor === color
												? "border-zinc-900 bg-zinc-900 text-white"
												: "border-zinc-200 text-zinc-600 hover:border-zinc-400"
										)}
										key={color}
										onClick={() => setSelectedColor(color)}
									>
										{color}
									</button>
								))}
							</div>
						</div>

						{/* Sizes */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-xs text-zinc-500 uppercase tracking-widest">
									Size: <span className="text-zinc-900">{selectedSize}</span>
								</span>
								<button className="text-xs text-zinc-400 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900">
									Size Guide
								</button>
							</div>
							<div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
								{product.sizes.map((size) => (
									<button
										className={cn(
											"flex h-12 w-full items-center justify-center border text-sm transition-all",
											selectedSize === size
												? "border-zinc-900 bg-zinc-50 font-medium text-zinc-900"
												: "border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
										)}
										key={size}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="space-y-3 pt-6">
						<Button
							className="h-14 w-full rounded-none bg-zinc-900 text-base text-white uppercase tracking-wide hover:bg-zinc-800"
							disabled={!selectedSize}
						>
							{selectedSize ? "Add to Bag" : "Select a Size"}
						</Button>
						<button className="w-full py-2 text-center text-xs text-zinc-400 uppercase tracking-widest transition-colors hover:text-zinc-900">
							Save for Later
						</button>
					</div>

					{/* Details Accordion */}
					<div className="pt-8">
						<Accordion className="w-full" collapsible type="single">
							<AccordionItem value="details">
								<AccordionTrigger className="font-display font-normal text-lg text-zinc-900">
									Description
								</AccordionTrigger>
								<AccordionContent className="font-light text-zinc-600 leading-relaxed">
									{product.description}
									<br />
									<br />
									Our {product.name} is a testament to the Simply KF philosophy
									where craftsmanship meets contemporary design.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="fabric">
								<AccordionTrigger className="font-display font-normal text-lg text-zinc-900">
									Fabric & Care
								</AccordionTrigger>
								<AccordionContent className="font-light text-zinc-600 leading-relaxed">
									<ul className="list-inside list-disc space-y-1">
										<li>Premium crepe blend</li>
										<li>Dry clean only recommended</li>
										<li>Steam iron on low heat</li>
										<li>Do not bleach or tumble dry</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="delivery">
								<AccordionTrigger className="font-display font-normal text-lg text-zinc-900">
									Delivery & Returns
								</AccordionTrigger>
								<AccordionContent className="font-light text-zinc-600 leading-relaxed">
									<p className="mb-2">UK & International Shipping available.</p>
									<p>
										Standard UK Delivery: 2-3 Working Days.
										<br />
										Next Day Delivery available at checkout.
									</p>
									<p className="mt-2 text-xs text-zinc-400">
										Free returns within 14 days of purchase.
									</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
		</div>
	);
}

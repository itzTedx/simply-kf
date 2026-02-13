"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { parseAsString, useQueryStates } from "nuqs";
import { toast } from "sonner";

import { Media } from "@/components/payload/media";
import RichText from "@/components/payload/rich-text";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import {
	getProductColors,
	getProductImagesForColor,
	getProductOrVariantStock,
	getProductSizes,
	isProductOrVariantInStock,
	isSizeInStock,
} from "@/constants/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/payload-types";
import { useCartStore } from "@/stores/cart-store";

interface ProductViewProps {
	product: Product;
}

export function ProductView({ product }: ProductViewProps) {
	const addItem = useCartStore((state) => state.addItem);

	const colors = getProductColors(product);
	const [queryState, setQueryState] = useQueryStates({
		color: parseAsString,
		size: parseAsString,
	});

	const selectedColor = useMemo(
		() =>
			queryState.color && colors.includes(queryState.color)
				? queryState.color
				: colors[0],
		[queryState.color, colors]
	);

	// Get available sizes for the current color/variant
	const availableSizes = useMemo(
		() => getProductSizes(product, selectedColor),
		[product, selectedColor]
	);

	// Selected size from query state, defaulting to first available size
	const selectedSize = useMemo(() => {
		if (availableSizes.length === 0) return null;
		const sizeFromQuery = queryState.size;
		if (sizeFromQuery && availableSizes.some((s) => s.size === sizeFromQuery)) {
			return sizeFromQuery;
		}
		// Default to first in-stock size, or first size if none in stock
		const firstInStock = availableSizes.find(
			(s) => s.stock === null || s.stock > 0
		);
		return firstInStock?.size ?? availableSizes[0]?.size ?? null;
	}, [availableSizes, queryState.size]);

	// Check if selected size is in stock (or product/variant stock when no sizes)
	const isSelectedSizeInStock = useMemo(
		() =>
			selectedSize
				? isSizeInStock(product, selectedSize, selectedColor)
				: isProductOrVariantInStock(product, selectedColor),
		[product, selectedSize, selectedColor]
	);

	// Get stock count for selected size (or product/variant stock when no sizes)
	const selectedSizeStock = useMemo(() => {
		if (selectedSize) {
			const sizeItem = availableSizes.find((s) => s.size === selectedSize);
			return sizeItem?.stock ?? null;
		}
		return getProductOrVariantStock(product, selectedColor);
	}, [availableSizes, product, selectedColor, selectedSize]);

	const currentImages = getProductImagesForColor(product, selectedColor);
	const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
	const [thumbCarouselApi, setThumbCarouselApi] = useState<
		CarouselApi | undefined
	>();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isImageLoading, setIsImageLoading] = useState(true);

	const onSelect = useCallback((api: CarouselApi) => {
		if (!api) return;
		setSelectedIndex(api.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!carouselApi) return;
		onSelect(carouselApi);
		carouselApi.on("select", onSelect);
		return () => {
			carouselApi.off("select", onSelect);
		};
	}, [carouselApi, onSelect]);

	useEffect(() => {
		thumbCarouselApi?.scrollTo(selectedIndex);
	}, [thumbCarouselApi, selectedIndex]);

	// When color changes, reset carousel to first slide and show new variant images
	// biome-ignore lint/correctness/useExhaustiveDependencies: no need to re-run this effect when the color changes
	useEffect(() => {
		carouselApi?.scrollTo(0);
		setSelectedIndex(0);
		thumbCarouselApi?.scrollTo(0);
	}, [selectedColor, carouselApi, thumbCarouselApi]);

	const scrollToSlide = useCallback(
		(index: number) => {
			carouselApi?.scrollTo(index);
		},
		[carouselApi]
	);

	const handleAddToCart = () => {
		// Validate size selection if sizes are available
		if (availableSizes.length > 0 && !selectedSize) {
			toast.error("Please select a size.");
			return;
		}

		// Validate stock availability
		if (!isSelectedSizeInStock) {
			toast.error("Sorry, this size is currently out of stock.");
			return;
		}

		const resolvedSize =
			selectedSize != null ? String(selectedSize) : undefined;

		// If stock is tracked, check we're not already at max in cart
		const maxStock =
			selectedSizeStock != null && selectedSizeStock > 0
				? selectedSizeStock
				: null;
		if (maxStock != null) {
			const items = useCartStore.getState().items;
			const inCart = items.find(
				(item) =>
					item.id === product.id &&
					item.color === selectedColor &&
					item.size === resolvedSize
			);
			if (inCart && inCart.quantity >= maxStock) {
				toast.error(
					`Maximum quantity (${maxStock}) already in your bag for this size.`
				);
				return;
			}
		}

		addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
			image:
				currentImages[0] ??
				(colors.length > 0
					? getProductImagesForColor(product, colors[0])[0]
					: undefined) ??
				"",
			color: selectedColor,
			size: resolvedSize,
			stock: maxStock,
		});

		toast.success(`${product.name} has been added to your bag.`);
	};

	const isPreOrder = product.availability === "pre-order";

	return (
		<div className="grid grid-cols-1 gap-x-10 gap-y-10 md:gap-y-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-16">
			<div className="flex h-fit flex-col gap-5 lg:sticky lg:top-40">
				<Carousel
					className="w-full"
					key={selectedColor}
					opts={{ align: "start", loop: true }}
					plugins={[Autoplay({ delay: 5000 })]}
					setApi={setCarouselApi}
				>
					<CarouselContent>
						{currentImages.map((img, idx) => (
							<CarouselItem key={`${product.name}-${idx}`}>
								<div className="relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted/40">
									{idx === 0 && isImageLoading && (
										<Skeleton className="absolute inset-0 size-full" />
									)}
									<Media
										alt={`${product.name} view ${idx + 1}`}
										fill
										onLoad={() => idx === 0 && setIsImageLoading(false)}
										priority={idx === 0}
										src={img}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						className={cn(
							"top-1/2 -left-4 size-9 rounded-full border-border/80 bg-background/90 shadow-md transition-colors hover:bg-background md:-left-6 md:size-10"
						)}
					/>
					<CarouselNext
						className={cn(
							"top-1/2 -right-4 size-9 rounded-full border-border/80 bg-background/90 shadow-md transition-colors hover:bg-background md:-right-6 md:size-10"
						)}
					/>
				</Carousel>
				<Carousel
					className="w-full"
					key={`thumbs-${selectedColor}`}
					opts={{ align: "start", containScroll: "trimSnaps" }}
					setApi={setThumbCarouselApi}
				>
					<CarouselContent className="-ml-2">
						{currentImages.map((img, idx) => (
							<CarouselItem
								className="basis-1/4 pl-2 sm:basis-1/5"
								key={`${product.name}-thumb-${idx}`}
							>
								<button
									aria-label={`View image ${idx + 1}`}
									className={cn(
										"relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted/40 transition-all duration-200",
										selectedIndex === idx
											? "ring-1 ring-foreground/30"
											: "opacity-60 hover:opacity-90"
									)}
									onClick={() => scrollToSlide(idx)}
									type="button"
								>
									<Media
										alt={`${product.name} thumbnail ${idx + 1}`}
										className="object-cover"
										fill
										src={img}
									/>
								</button>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<div className="flex flex-col gap-6">
				<div className="space-y-5 border-border/40 border-b pb-8">
					<h1 className="font-normal font-sans text-3xl text-yellow-900 leading-tight md:text-4xl lg:text-[2.75rem]">
						{product.name}
					</h1>
					<div className="flex items-center justify-between">
						<p className="font-body text-foreground text-xl">
							£{product.price}
						</p>
						<span className="font-body text-foreground/50 text-xs uppercase tracking-wider">
							Designed in Dubai
						</span>
					</div>
				</div>

				<p className="order-3 font-body text-base text-foreground/75 leading-relaxed md:text-lg lg:order-2">
					{product.description}
				</p>

				<div className="order-2 space-y-6 pt-1 lg:order-3">
					<div className="space-y-3">
						<p className="font-body text-foreground/60 text-xs uppercase tracking-wider">
							Colour: <span className="text-foreground">{selectedColor}</span>
						</p>
						<div className="flex flex-wrap gap-2">
							{colors.map((color) => (
								<button
									className={cn(
										"h-8 rounded-full border px-4 font-body text-xs transition-colors duration-200",
										selectedColor === color
											? "border-primary bg-primary text-primary-foreground"
											: "border-border/80 text-foreground/70 hover:border-foreground/25 hover:text-foreground"
									)}
									key={color}
									onClick={() => setQueryState({ color })}
								>
									{color}
								</button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="font-body text-foreground/55 text-xs uppercase tracking-wider">
								Size:{" "}
								<span className="text-foreground">
									{selectedSize ?? "One size"}
								</span>
								{selectedSizeStock !== null &&
									selectedSizeStock <= 5 &&
									selectedSizeStock > 0 && (
										<span className="ml-2 text-amber-600">
											({selectedSizeStock} left)
										</span>
									)}
							</span>
							<button className="font-body text-foreground/45 text-xs underline-offset-2 transition-colors hover:text-foreground/75">
								Size guide
							</button>
						</div>
						{availableSizes.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{availableSizes.map((sizeItem) => {
									const isOutOfStock =
										sizeItem.stock !== null && sizeItem.stock <= 0;
									const isSelected = selectedSize === sizeItem.size;
									const isLowStock =
										sizeItem.stock !== null &&
										sizeItem.stock > 0 &&
										sizeItem.stock <= 3;

									return (
										<button
											className={cn(
												"relative h-10 min-w-12 rounded-md border px-4 font-body text-sm transition-colors duration-200",
												isOutOfStock
													? "cursor-not-allowed border-border/40 text-foreground/30 line-through"
													: isSelected
														? "border-primary bg-primary text-primary-foreground"
														: "border-border/80 text-foreground/70 hover:border-foreground/25 hover:text-foreground"
											)}
											disabled={isOutOfStock}
											key={sizeItem.id ?? sizeItem.size}
											onClick={() => setQueryState({ size: sizeItem.size })}
											title={
												isOutOfStock
													? "Out of stock"
													: isLowStock
														? `Only ${sizeItem.stock} left`
														: undefined
											}
											type="button"
										>
											{sizeItem.size}
											{isLowStock && !isOutOfStock && (
												<span className="absolute -top-1 -right-1 size-2 rounded-full bg-amber-500" />
											)}
										</button>
									);
								})}
							</div>
						)}

						{/* Low stock alert */}
						{isSelectedSizeInStock &&
							selectedSizeStock !== null &&
							selectedSizeStock > 0 &&
							selectedSizeStock <= 5 && (
								<Alert
									className="mb-3"
									variant={selectedSizeStock <= 2 ? "destructive" : "default"}
								>
									<AlertDescription className="flex items-center gap-3 font-body">
										<span className="relative flex size-2">
											<span
												className={cn(
													"absolute inline-flex size-full animate-ping rounded-full opacity-75",
													selectedSizeStock <= 2 ? "bg-red-400" : "bg-amber-400"
												)}
											/>
											<span
												className={cn(
													"relative inline-flex size-2 rounded-full",
													selectedSizeStock <= 2 ? "bg-red-500" : "bg-amber-500"
												)}
											/>
										</span>
										{selectedSizeStock === 1
											? "Only 1 left in stock - order soon!"
											: selectedSizeStock === 2
												? "Only 2 left in stock - order soon!"
												: `Low stock - only ${selectedSizeStock} left`}
									</AlertDescription>
								</Alert>
							)}
					</div>
				</div>

				<div className="order-2 pt-4 lg:order-3">
					<Button
						className="relative w-full"
						disabled={!isSelectedSizeInStock}
						onClick={handleAddToCart}
						size="lg"
					>
						{isPreOrder && isSelectedSizeInStock && (
							<Badge className="absolute -top-3 right-3 rounded-md bg-foreground/60 backdrop-blur-lg">
								Pre-order
							</Badge>
						)}
						{!isSelectedSizeInStock ? "Out of stock" : "Add to bag"}
					</Button>
				</div>

				<div className="order-4 pt-6">
					<Accordion
						className="w-full border-0"
						defaultValue={["details"]}
						multiple
					>
						<AccordionItem
							className="border-0 border-border/40 border-b"
							value="details"
						>
							<AccordionTrigger className="py-4 font-normal font-sans text-foreground hover:no-underline">
								Description
							</AccordionTrigger>
							<AccordionContent className="pb-4 font-body text-foreground leading-relaxed">
								{product.overview ? (
									<RichText data={product.overview} enableGutter={false} />
								) : (
									<p className="text-lg">
										{product.description}
										<br />
										<br />
										Our {product.name} reflects the Simply KF philosophy —
										craftsmanship meets contemporary design.
									</p>
								)}
							</AccordionContent>
						</AccordionItem>
						{product.features && product.features.length > 0 && (
							<AccordionItem
								className="border-0 border-border/40 border-b"
								value="fabric"
							>
								<AccordionTrigger className="py-4 font-normal font-sans text-foreground hover:no-underline">
									Fabric & care
								</AccordionTrigger>
								<AccordionContent className="pb-4 font-body text-foreground leading-relaxed">
									<ul className="list-inside list-disc space-y-1.5">
										{product.features?.map((feat) => (
											<li className="text-lg" key={feat.id ?? feat.feature}>
												{feat.feature}
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						)}
						<AccordionItem
							className="border-0 border-border/40 border-b"
							value="delivery"
						>
							<AccordionTrigger className="py-4 font-normal font-sans text-foreground hover:no-underline">
								Delivery & returns
							</AccordionTrigger>
							<AccordionContent className="pb-4 font-body text-foreground text-lg leading-relaxed">
								<p className="mb-2">UK & international shipping available.</p>
								<p>Standard UK delivery: 2–3 working days.</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
}

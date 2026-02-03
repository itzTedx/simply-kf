"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { RiEqualizerLine } from "@remixicon/react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

import { PRODUCTS } from "@/data/products";

const FILTERS = {
	categories: ["Abayas", "Essentials", "Sets", "Hijabs"],
	colors: ["Black", "White", "Beige", "Taupe", "Navy", "Grey", "Olive"],
	fabrics: ["Silk Crepe", "Linen", "Nida", "Modal", "Chiffon"],
	lengths: ["52", "54", "56", "58", "60", "62"],
};

export default function ShopPage() {
	const [priceRange, setPriceRange] = useState([0, 500]);
	const [selectedSort, setSelectedSort] = useState("newest");

	const FilterSection = () => (
		<div className="space-y-8">
			{/* Price Filter */}
			<div className="space-y-4">
				<h3 className="font-body font-medium text-sm text-zinc-900 uppercase tracking-wide">
					Price Range
				</h3>
				<Slider
					className="py-4"
					defaultValue={[0, 500]}
					max={500}
					onValueChange={(value) => setPriceRange(value as number[])}
					step={10}
					value={priceRange}
				/>
				<div className="flex items-center justify-between text-muted-foreground text-xs">
					<span>AED{priceRange[0]}</span>
					<span>AED{priceRange[1]}</span>
				</div>
			</div>

			{/* Filter Groups */}
			<Accordion className="w-full" defaultValue={["category"]} multiple>
				<AccordionItem className="border-zinc-200" value="category">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Category
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{FILTERS.categories.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`category-${item}`}
									/>
									<label
										className="font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`category-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem className="border-zinc-200" value="color">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Colour
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{FILTERS.colors.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`color-${item}`}
									/>
									<label
										className="font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`color-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem className="border-zinc-200" value="fabric">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Fabric
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{FILTERS.fabrics.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`fabric-${item}`}
									/>
									<label
										className="font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`fabric-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem className="border-zinc-200" value="length">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Length
					</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-3 gap-2 pt-2">
							{FILTERS.lengths.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`length-${item}`}
									/>
									<label
										className="font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`length-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);

	return (
		<main className="min-h-screen bg-white pt-16 pb-32">
			{/* 1. Page Intro */}
			<section className="container mx-auto px-4 pb-12 text-center md:pb-20 md:text-left">
				<h1 className="font-display text-4xl text-zinc-900 tracking-tight md:text-5xl">
					Shop
				</h1>
				<p className="mt-4 font-body font-light text-muted-foreground md:text-xl">
					A curated selection of timeless abayas and modest essentials.
				</p>
			</section>

			<div className="container mx-auto px-4">
				<div className="flex flex-col gap-12 lg:flex-row">
					{/* 2. Filters (Sidebar) - Desktop Only */}
					<aside className="hidden w-64 shrink-0 lg:block">
						<div className="sticky top-32">
							<FilterSection />
						</div>
					</aside>

					{/* Mobile Filter & Sort Bar */}
					<div className="flex items-center justify-between pb-6 lg:hidden">
						<Sheet>
							<SheetTrigger
								render={
									<Button
										className="h-10 gap-2 border-zinc-200 font-body text-zinc-900 uppercase tracking-wider"
										size="sm"
										variant="outline"
									/>
								}
							>
								<RiEqualizerLine className="size-4" />
								Filters
							</SheetTrigger>
							<SheetContent className="w-[300px] sm:w-[400px]" side="left">
								<SheetHeader className="text-left">
									<SheetTitle className="font-display text-2xl uppercase">
										Filters
									</SheetTitle>
									<SheetDescription>Refine your selection.</SheetDescription>
								</SheetHeader>
								<div className="py-8">
									<FilterSection />
								</div>
							</SheetContent>
						</Sheet>

						<div className="w-[180px]">
							<Select
								onValueChange={(value) => setSelectedSort(value || "newest")}
								value={selectedSort}
							>
								<SelectTrigger className="h-10 border-zinc-200 font-body text-xs text-zinc-900 uppercase tracking-wider focus:ring-zinc-900">
									<SelectValue placeholder="Sort By" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="newest">Newest</SelectItem>
									<SelectItem value="price-asc">Price: Low to High</SelectItem>
									<SelectItem value="price-desc">Price: High to Low</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="flex-1 space-y-8">
						{/* Desktop Sorting (Top Right) */}
						<div className="hidden flex-row-reverse lg:flex">
							<div className="w-[200px]">
								<Select
									onValueChange={(value) => setSelectedSort(value || "newest")}
									value={selectedSort}
								>
									<SelectTrigger className="border-0 border-zinc-200 border-b px-0 font-body text-sm text-zinc-900 uppercase tracking-wider shadow-none focus:ring-0">
										<SelectValue placeholder="Sort By" />
									</SelectTrigger>
									<SelectContent align="end">
										<SelectItem value="newest">Newest</SelectItem>
										<SelectItem value="price-asc">
											Price: Low to High
										</SelectItem>
										<SelectItem value="price-desc">
											Price: High to Low
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* 4. Product Grid */}
						<div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 md:grid-cols-3 xl:grid-cols-3">
							{PRODUCTS.map((product) => (
								<Link
									className="group block space-y-4"
									href={`/shop/${product.slug}`}
									key={product.id}
								>
									{/* Image Placeholder */}
									<div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-zinc-100">
										<Image
											alt={product.name}
											className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
											fill
											sizes="(max-width: 768px) 50vw, 33vw"
											src={product.images[0]}
										/>
									</div>

									{/* Product Info */}
									<div className="space-y-1 text-center md:text-left">
										<h3 className="font-display text-sm text-zinc-900 md:text-base">
											{product.name}
										</h3>
										<p className="font-body text-muted-foreground text-xs">
											Designed in Dubai
										</p>
										<p className="pt-1 font-body font-medium text-sm text-zinc-900">
											AED{product.price}
										</p>
									</div>
								</Link>
							))}
						</div>

						{/* 6. Empty State (Hidden by default, shown based on logic) */}
						{PRODUCTS.length === 0 && (
							<div className="py-24 text-center">
								<p className="font-body text-muted-foreground">
									No pieces match your selection.
								</p>
								<Button className="mt-4 text-zinc-900" variant="link">
									Clear all filters
								</Button>
							</div>
						)}

						{/* 7. Load More */}
						<div className="flex justify-center pt-16 md:pt-24">
							<Button
								className="rounded-none border-zinc-200 px-12 py-6 text-xs text-zinc-900 uppercase tracking-widest hover:bg-zinc-50 hover:text-zinc-900"
								variant="outline"
							>
								Load More
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

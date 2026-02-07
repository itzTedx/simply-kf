"use client";

import { Suspense, useMemo, useState } from "react";

import { useQueryStates } from "nuqs";

import { FilterAndSortBar } from "@/components/shop/filter-and-sort-bar";
import { FilterSection } from "@/components/shop/filter-section";
import { ProductGrid } from "@/components/shop/product-grid";
import { ShopHeader } from "@/components/shop/shop-header";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { getProductColors, PRODUCTS } from "@/constants/products";

function ShopPageContent() {
	const [priceRange, setPriceRange] = useState([0, 100]);
	const [selectedSort, setSelectedSort] = useState("newest");

	const [filters, setFilters] = useQueryStates({
		colors: {
			parse: (value: string) => value.split(",").filter(Boolean),
			serialize: (value: string[]) => value.join(","),
			default: [] as string[],
		},

		availability: {
			parse: (value: string) => value.split(",").filter(Boolean),
			serialize: (value: string[]) => value.join(","),
			default: [] as string[],
		},
	});

	// Reset all filters function
	const resetAllFilters = () => {
		setFilters({
			colors: [],

			availability: [],
		});
		setPriceRange([0, 100]);
		setSelectedSort("newest");
	};

	// Filter products based on selected filters
	const filteredProducts = useMemo(() => {
		let filtered = PRODUCTS;

		// Filter by colors
		if (filters.colors && filters.colors.length > 0) {
			filtered = filtered.filter((product) =>
				getProductColors(product).some((color) =>
					filters.colors!.includes(color)
				)
			);
		}

		// Filter by availability
		if (filters.availability && filters.availability.length > 0) {
			filtered = filtered.filter((product) =>
				filters.availability!.includes(product.availability)
			);
		}

		// Filter by price range
		filtered = filtered.filter(
			(product) =>
				product.price >= priceRange[0] && product.price <= priceRange[1]
		);

		// Sort products
		switch (selectedSort) {
			case "price-asc":
				return filtered.sort((a, b) => a.price - b.price);
			case "price-desc":
				return filtered.sort((a, b) => b.price - a.price);
			case "newest":
			default:
				return filtered.sort(
					(a, b) => Number.parseInt(b.id, 10) - Number.parseInt(a.id, 10)
				);
		}
	}, [
		filters.colors,

		filters.availability,
		priceRange,
		selectedSort,
	]);

	return (
		<div className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
			<div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
				<aside className="hidden w-56 shrink-0 lg:block">
					<div className="sticky top-28">
						<FilterSection
							filters={filters}
							priceRange={priceRange}
							setFilters={setFilters}
							setPriceRange={setPriceRange}
						/>
					</div>
				</aside>

				<FilterAndSortBar
					filters={filters}
					priceRange={priceRange}
					selectedSort={selectedSort}
					setFilters={setFilters}
					setPriceRange={setPriceRange}
					setSelectedSort={setSelectedSort}
				/>

				<div className="flex-1 space-y-8">
					<div className="hidden items-center justify-between lg:flex">
						<button
							className="font-body text-foreground/50 text-xs tracking-wide transition-colors hover:text-foreground/80"
							onClick={resetAllFilters}
						>
							Reset filters
						</button>
						<div className="w-[180px]">
							<Select
								onValueChange={(value) => setSelectedSort(value || "newest")}
								value={selectedSort}
							>
								<SelectTrigger className="h-9 border-0 border-border/60 border-b bg-transparent px-0 font-body text-foreground/80 text-xs tracking-wide shadow-none focus:ring-0 focus-visible:ring-0">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent align="end">
									<SelectItem value="newest">Newest</SelectItem>
									<SelectItem value="price-asc">Price: Low to High</SelectItem>
									<SelectItem value="price-desc">Price: High to Low</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<ProductGrid
						onClearFilters={resetAllFilters}
						products={filteredProducts}
					/>
				</div>
			</div>
		</div>
	);
}

export default function ShopPage() {
	return (
		<main className="min-h-screen overflow-hidden">
			{/* 1. Page Intro */}
			<ShopHeader />
			<Suspense
				fallback={
					<div className="flex items-center justify-center py-20 text-center md:py-28">
						Loading...
					</div>
				}
			>
				<ShopPageContent />
			</Suspense>
		</main>
	);
}

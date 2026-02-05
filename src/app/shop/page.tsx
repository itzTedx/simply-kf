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

import { PRODUCTS } from "@/data/products";

function ShopPageContent() {
	const [priceRange, setPriceRange] = useState([0, 500]);
	const [selectedSort, setSelectedSort] = useState("newest");

	const [filters, setFilters] = useQueryStates({
		categories: {
			parse: (value: string) => value.split(",").filter(Boolean),
			serialize: (value: string[]) => value.join(","),
			default: [] as string[],
		},
		collections: {
			parse: (value: string) => value.split(",").filter(Boolean),
			serialize: (value: string[]) => value.join(","),
			default: [] as string[],
		},
		colors: {
			parse: (value: string) => value.split(",").filter(Boolean),
			serialize: (value: string[]) => value.join(","),
			default: [] as string[],
		},
		materials: {
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

	// Filter products based on selected filters
	const filteredProducts = useMemo(() => {
		let filtered = PRODUCTS;

		// Filter by categories
		if (filters.categories && filters.categories.length > 0) {
			filtered = filtered.filter((product) =>
				filters.categories!.includes(product.category)
			);
		}

		// Filter by collections
		if (filters.collections && filters.collections.length > 0) {
			filtered = filtered.filter((product) =>
				filters.collections!.includes(product.collection)
			);
		}

		// Filter by colors
		if (filters.colors && filters.colors.length > 0) {
			filtered = filtered.filter((product) =>
				product.colors.some((color) => filters.colors!.includes(color))
			);
		}

		// Filter by materials
		if (filters.materials && filters.materials.length > 0) {
			filtered = filtered.filter((product) =>
				filters.materials!.includes(product.material)
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
		filters.categories,
		filters.collections,
		filters.colors,
		filters.materials,
		filters.availability,
		priceRange,
		selectedSort,
	]);

	return (
		<main className="min-h-screen">
			{/* 1. Page Intro */}
			<ShopHeader />

			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col gap-12 lg:flex-row">
					{/* 2. Filters (Sidebar) - Desktop Only */}
					<aside className="hidden w-64 shrink-0 lg:block">
						<div className="sticky top-32">
							<FilterSection
								filters={filters}
								priceRange={priceRange}
								setFilters={setFilters}
								setPriceRange={setPriceRange}
							/>
						</div>
					</aside>

					{/* Mobile Filter & Sort Bar */}
					<FilterAndSortBar
						filters={filters}
						priceRange={priceRange}
						selectedSort={selectedSort}
						setFilters={setFilters}
						setPriceRange={setPriceRange}
						setSelectedSort={setSelectedSort}
					/>

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
						<ProductGrid
							onClearFilters={() =>
								setFilters({
									categories: [],
									collections: [],
									colors: [],
									materials: [],
									availability: [],
								})
							}
							products={filteredProducts}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

export default function ShopPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ShopPageContent />
		</Suspense>
	);
}

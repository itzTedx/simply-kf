"use client";

import { RiEqualizerLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
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

import { FilterSection } from "./filter-section";

interface FilterAndSortBarProps {
	selectedSort: string;
	setSelectedSort: (value: string) => void;
	priceRange: number[];
	setPriceRange: (value: number[]) => void;
	filters: {
		categories?: string[] | null;
		collections?: string[] | null;
		colors?: string[] | null;
		materials?: string[] | null;
		availability?: string[] | null;
	};
	setFilters: (filters: {
		categories?: string[] | null;
		collections?: string[] | null;
		colors?: string[] | null;
		materials?: string[] | null;
		availability?: string[] | null;
	}) => void;
}

export function FilterAndSortBar({
	selectedSort,
	setSelectedSort,
	priceRange,
	setPriceRange,
	filters,
	setFilters,
}: FilterAndSortBarProps) {
	return (
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
						<FilterSection
							filters={filters}
							priceRange={priceRange}
							setFilters={setFilters}
							setPriceRange={setPriceRange}
						/>
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
	);
}

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
		availability?: string[] | null;
	};
	setFilters: (filters: {
		categories?: string[] | null;
		collections?: string[] | null;
		colors?: string[] | null;
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
							className="h-9 gap-2 border-border/70 font-body text-foreground/80 text-xs tracking-wide"
							size="sm"
							variant="outline"
						/>
					}
				>
					<RiEqualizerLine className="size-4" />
					Filters
				</SheetTrigger>
				<SheetContent
					className="w-[280px] border-0 bg-card/98 sm:w-[320px]"
					side="left"
				>
					<SheetHeader className="pb-4 text-left">
						<SheetTitle className="font-display font-normal text-lg">
							Filters
						</SheetTitle>
						<SheetDescription className="text-foreground/60 text-sm">
							Refine your selection.
						</SheetDescription>
					</SheetHeader>
					<div className="p-6">
						<FilterSection
							filters={filters}
							priceRange={priceRange}
							setFilters={setFilters}
							setPriceRange={setPriceRange}
						/>
					</div>
				</SheetContent>
			</Sheet>

			<div className="md:w-[180px]">
				<Select
					onValueChange={(value) => setSelectedSort(value || "newest")}
					value={selectedSort}
				>
					<SelectTrigger className="h-9 border-border/70 font-body text-foreground/80 text-xs tracking-wide">
						<SelectValue className="capitalize" placeholder="Sort by" />
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

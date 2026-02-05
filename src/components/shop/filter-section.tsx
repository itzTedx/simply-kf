"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import { PRODUCTS } from "@/data/products";

// Extract unique values from products
const UNIQUE_CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)));
const UNIQUE_COLLECTIONS = Array.from(
	new Set(PRODUCTS.map((p) => p.collection))
);
const UNIQUE_COLORS = Array.from(new Set(PRODUCTS.flatMap((p) => p.colors)));
const UNIQUE_MATERIALS = Array.from(new Set(PRODUCTS.map((p) => p.material)));
const UNIQUE_AVAILABILITY = Array.from(
	new Set(PRODUCTS.map((p) => p.availability))
);

interface FilterSectionProps {
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

export function FilterSection({
	priceRange,
	setPriceRange,
	filters,
	setFilters,
}: FilterSectionProps) {
	return (
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
			<Accordion
				className="w-full"
				defaultValue={["category", "collection"]}
				multiple
			>
				{/* Categories */}
				<AccordionItem className="border-zinc-200" value="category">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Category
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_CATEGORIES.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.categories?.includes(item) || false}
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`category-${item}`}
										onCheckedChange={(checked) => {
											if (checked) {
												setFilters({
													...filters,
													categories: [...(filters.categories || []), item],
												});
											} else {
												setFilters({
													...filters,
													categories: (filters.categories || []).filter(
														(c) => c !== item
													),
												});
											}
										}}
									/>
									<label
										className="cursor-pointer font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`category-${item}`}
									>
										{item.charAt(0).toUpperCase() + item.slice(1)}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Collections */}
				<AccordionItem className="border-zinc-200" value="collection">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Collection
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_COLLECTIONS.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.collections?.includes(item) || false}
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`collection-${item}`}
										onCheckedChange={(checked) => {
											if (checked) {
												setFilters({
													...filters,
													collections: [...(filters.collections || []), item],
												});
											} else {
												setFilters({
													...filters,
													collections: (filters.collections || []).filter(
														(c) => c !== item
													),
												});
											}
										}}
									/>
									<label
										className="cursor-pointer font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`collection-${item}`}
									>
										{item.charAt(0).toUpperCase() + item.slice(1)}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Colors */}
				<AccordionItem className="border-zinc-200" value="color">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Colour
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_COLORS.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.colors?.includes(item) || false}
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`color-${item}`}
										onCheckedChange={(checked) => {
											if (checked) {
												setFilters({
													...filters,
													colors: [...(filters.colors || []), item],
												});
											} else {
												setFilters({
													...filters,
													colors: (filters.colors || []).filter(
														(c) => c !== item
													),
												});
											}
										}}
									/>
									<label
										className="cursor-pointer font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`color-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Materials */}
				<AccordionItem className="border-zinc-200" value="material">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Material
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_MATERIALS.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.materials?.includes(item) || false}
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`material-${item}`}
										onCheckedChange={(checked) => {
											if (checked) {
												setFilters({
													...filters,
													materials: [...(filters.materials || []), item],
												});
											} else {
												setFilters({
													...filters,
													materials: (filters.materials || []).filter(
														(c) => c !== item
													),
												});
											}
										}}
									/>
									<label
										className="cursor-pointer font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`material-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Availability */}
				<AccordionItem className="border-zinc-200" value="availability">
					<AccordionTrigger className="font-body text-sm text-zinc-900 uppercase tracking-wide hover:no-underline">
						Availability
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_AVAILABILITY.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.availability?.includes(item) || false}
										className="border-zinc-300 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900"
										id={`availability-${item}`}
										onCheckedChange={(checked) => {
											if (checked) {
												setFilters({
													...filters,
													availability: [...(filters.availability || []), item],
												});
											} else {
												setFilters({
													...filters,
													availability: (filters.availability || []).filter(
														(c) => c !== item
													),
												});
											}
										}}
									/>
									<label
										className="cursor-pointer font-body text-sm text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`availability-${item}`}
									>
										{item.charAt(0).toUpperCase() +
											item.slice(1).replace("-", " ")}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

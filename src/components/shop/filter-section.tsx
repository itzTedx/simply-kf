"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

import { getProductColors } from "@/constants/products";
import { Product } from "@/payload-types";

interface FilterSectionProps {
	priceRange: number[];
	setPriceRange: (value: number[]) => void;
	filters: {
		colors?: string[] | null;

		availability?: string[] | null;
	};
	setFilters: (filters: {
		colors?: string[] | null;

		availability?: string[] | null;
	}) => void;
	products: Product[];
}

export function FilterSection({
	priceRange,
	setPriceRange,
	filters,
	setFilters,
	products,
}: FilterSectionProps) {
	const UNIQUE_COLORS = Array.from(
		new Set(products.flatMap((p) => getProductColors(p)))
	);
	const UNIQUE_AVAILABILITY = Array.from(
		new Set(products.map((p) => p.availability))
	);
	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<h3 className="font-body text-[0.6875rem] text-foreground/70 uppercase tracking-[0.12em]">
					Price range
				</h3>
				<Slider
					className="py-4"
					defaultValue={[0, 100]}
					max={100}
					onValueChange={(value) => setPriceRange(value as number[])}
					step={10}
					value={priceRange}
				/>
				<div className="flex justify-between font-body text-foreground/50 text-xs">
					<span>£{priceRange[0]}</span>
					<span>£{priceRange[1]}</span>
				</div>
			</div>

			<Accordion className="w-full border-0" defaultValue={["color"]} multiple>
				<AccordionItem
					className="border-0 border-border/40 border-b"
					value="color"
				>
					<AccordionTrigger className="py-4 font-body text-foreground/80 text-xs uppercase tracking-wide hover:no-underline">
						Colour
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_COLORS.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.colors?.includes(item) || false}
										className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
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
										className="cursor-pointer font-body text-foreground/70 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor={`color-${item}`}
									>
										{item}
									</label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem
					className="border-0 border-border/40 border-b"
					value="availability"
				>
					<AccordionTrigger className="py-4 font-body text-foreground/80 text-xs uppercase tracking-wide hover:no-underline">
						Availability
					</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3 pt-2">
							{UNIQUE_AVAILABILITY.map((item) => (
								<div className="flex items-center space-x-3" key={item}>
									<Checkbox
										checked={filters.availability?.includes(item) || false}
										className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
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
										className="cursor-pointer font-body text-foreground/70 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

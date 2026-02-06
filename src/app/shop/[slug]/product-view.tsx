"use client";

import { useState } from "react";

import Image from "next/image";

import { toast } from "sonner";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import { Product } from "@/constants/products";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

interface ProductViewProps {
	product: Product;
}

export function ProductView({ product }: ProductViewProps) {
	const addItem = useCartStore((state) => state.addItem);

	const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
	const [mainImage, setMainImage] = useState<string>(product.images[0]);
	const initialSelectedSize = Array.isArray(product.size)
		? product.size[0]
		: null;
	const [selectedSize, setSelectedSize] = useState<number | null>(
		initialSelectedSize
	);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [preOrderForm, setPreOrderForm] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isPreOrderSubmitting, setIsPreOrderSubmitting] = useState(false);
	const [preOrderOpen, setPreOrderOpen] = useState(false);

	const handleAddToCart = () => {
		const resolvedSize = Array.isArray(product.size)
			? selectedSize !== null
				? String(selectedSize)
				: String(product.size[0])
			: product.size;

		addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
			image: product.images[0],
			color: selectedColor,
			size: resolvedSize,
		});

		toast.success(`${product.name} has been added to your bag.`);
	};

	const handlePreOrderSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!preOrderForm.name.trim() || !preOrderForm.email.trim()) {
			toast.error("Please enter your name and email.");
			return;
		}
		setIsPreOrderSubmitting(true);
		// Simulate submit – replace with actual API call
		setTimeout(() => {
			setIsPreOrderSubmitting(false);
			setPreOrderForm({ name: "", email: "", message: "" });
			setPreOrderOpen(false);
			toast.success(
				`Pre-order received for ${product.name}. We'll notify you when it's ready.`
			);
		}, 800);
	};

	const isPreOrder = product.availability === "pre-order";

	return (
		<div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-16">
			<div className="flex flex-col gap-5">
				<div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-muted/40">
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
				<div className="grid grid-cols-4 gap-3">
					{product.images.map((img, idx) => (
						<button
							className={cn(
								"relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted/40 transition-all duration-200",
								mainImage === img
									? "ring-1 ring-foreground/30"
									: "opacity-60 hover:opacity-90"
							)}
							key={`${product.name}-${idx}`}
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

			<div className="flex flex-col">
				<div className="sticky top-28 space-y-8">
					<div className="space-y-5 border-border/40 border-b pb-8">
						<h1 className="font-display font-normal text-3xl text-foreground leading-tight md:text-4xl lg:text-[2.75rem]">
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

					<p className="font-body text-base text-foreground/75 leading-relaxed md:text-lg">
						{product.description}
					</p>

					<div className="space-y-6 pt-1">
						<div className="space-y-3">
							<p className="font-body text-foreground/60 text-xs uppercase tracking-wider">
								Colour: <span className="text-foreground">{selectedColor}</span>
							</p>
							<div className="flex flex-wrap gap-2">
								{product.colors.map((color) => (
									<button
										className={cn(
											"h-8 rounded-full border px-4 font-body text-xs transition-colors duration-200",
											selectedColor === color
												? "border-primary bg-primary text-primary-foreground"
												: "border-border/80 text-foreground/70 hover:border-foreground/25 hover:text-foreground"
										)}
										key={color}
										onClick={() => setSelectedColor(color)}
									>
										{color}
									</button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="font-body text-foreground/55 text-xs uppercase tracking-wider">
									Size:{" "}
									<span className="text-foreground">
										{Array.isArray(product.size)
											? (selectedSize ?? product.size[0])
											: product.size}
									</span>
								</span>
								<button className="font-body text-foreground/45 text-xs underline-offset-2 transition-colors hover:text-foreground/75">
									Size guide
								</button>
							</div>
							{Array.isArray(product.size) && (
								<div className="flex flex-wrap gap-2 pt-1">
									{product.size.map((sizeOption) => (
										<button
											className={cn(
												"h-8 rounded-full border px-4 font-body text-xs transition-colors duration-200",
												selectedSize === sizeOption
													? "border-primary bg-primary text-primary-foreground"
													: "border-border/80 text-foreground/70 hover:border-foreground/25 hover:text-foreground"
											)}
											key={sizeOption}
											onClick={() => setSelectedSize(sizeOption)}
											type="button"
										>
											{sizeOption}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					<div className="pt-4">
						{isPreOrder ? (
							<Dialog onOpenChange={setPreOrderOpen} open={preOrderOpen}>
								<DialogTrigger
									render={
										<Button className="w-full" size="lg">
											Pre-order
										</Button>
									}
								/>
								<DialogContent className="sm:max-w-md">
									<DialogHeader>
										<DialogTitle>Pre-order {product.name}</DialogTitle>
										<DialogDescription>
											Leave your details and we&apos;ll notify you when this
											item is ready. Selected: {selectedColor},{" "}
											{Array.isArray(product.size)
												? (selectedSize ?? product.size[0])
												: product.size}
										</DialogDescription>
									</DialogHeader>
									<form
										className="space-y-5 pt-2"
										onSubmit={handlePreOrderSubmit}
									>
										<FieldSet>
											<FieldGroup>
												<Field>
													<FieldLabel htmlFor="preorder-name">Name</FieldLabel>
													<Input
														id="preorder-name"
														onChange={(e) =>
															setPreOrderForm((p) => ({
																...p,
																name: e.target.value,
															}))
														}
														placeholder="Your name"
														required
														value={preOrderForm.name}
													/>
												</Field>
												<Field>
													<FieldLabel htmlFor="preorder-email">
														Email
													</FieldLabel>
													<Input
														id="preorder-email"
														onChange={(e) =>
															setPreOrderForm((p) => ({
																...p,
																email: e.target.value,
															}))
														}
														placeholder="your@email.com"
														required
														type="email"
														value={preOrderForm.email}
													/>
												</Field>
												<Field>
													<FieldLabel htmlFor="preorder-message">
														Message{" "}
														<span className="text-foreground/50">
															(optional)
														</span>
													</FieldLabel>
													<Textarea
														id="preorder-message"
														onChange={(e) =>
															setPreOrderForm((p) => ({
																...p,
																message: e.target.value,
															}))
														}
														placeholder="Special requests or notes..."
														rows={3}
														value={preOrderForm.message}
													/>
												</Field>
											</FieldGroup>
										</FieldSet>
										<Button
											className="w-full"
											disabled={isPreOrderSubmitting}
											size="lg"
											type="submit"
										>
											{isPreOrderSubmitting
												? "Submitting..."
												: "Submit pre-order"}
										</Button>
									</form>
								</DialogContent>
							</Dialog>
						) : (
							<Button className="w-full" onClick={handleAddToCart} size="lg">
								Add to bag
							</Button>
						)}
					</div>

					<div className="pt-6">
						<Accordion className="w-full border-0">
							<AccordionItem
								className="border-0 border-border/40 border-b"
								value="details"
							>
								<AccordionTrigger className="py-4 font-display font-normal text-foreground hover:no-underline">
									Description
								</AccordionTrigger>
								<AccordionContent className="pb-4 font-body text-foreground/75 text-sm leading-relaxed">
									{product.description}
									<br />
									<br />
									Our {product.name} reflects the Simply KF philosophy —
									craftsmanship meets contemporary design.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem
								className="border-0 border-border/40 border-b"
								value="fabric"
							>
								<AccordionTrigger className="py-4 font-display font-normal text-foreground hover:no-underline">
									Fabric & care
								</AccordionTrigger>
								<AccordionContent className="pb-4 font-body text-foreground/75 text-sm leading-relaxed">
									<ul className="list-inside list-disc space-y-1.5">
										<li>Premium crepe blend</li>
										<li>Dry clean only recommended</li>
										<li>Steam iron on low heat</li>
										<li>Do not bleach or tumble dry</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem
								className="border-0 border-border/40 border-b"
								value="delivery"
							>
								<AccordionTrigger className="py-4 font-display font-normal text-foreground hover:no-underline">
									Delivery & returns
								</AccordionTrigger>
								<AccordionContent className="pb-4 font-body text-foreground/75 text-sm leading-relaxed">
									<p className="mb-2">UK & international shipping available.</p>
									<p>Standard UK delivery: 2–3 working days.</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
		</div>
	);
}

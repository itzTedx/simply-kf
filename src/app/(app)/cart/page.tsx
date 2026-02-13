"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { RiAddLine, RiSubtractLine } from "@remixicon/react";

import Checkout from "@/components/payment/checkout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
	const SHIPPING_FEE = 4.5;
	const FREE_SHIPPING_THRESHOLD = 30;

	const items = useCartStore((state) => state.items);
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const clearCart = useCartStore((state) => state.clearCart);
	const [showCheckout, setShowCheckout] = useState(false);

	const handlePaymentSuccess = () => {
		clearCart();
		window.location.href = "/payment/success";
	};

	const handleBackToCart = () => {
		setShowCheckout(false);
	};

	const hasItems = items.length > 0;
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const shipping =
		hasItems && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
	const orderTotal = hasItems ? subtotal + shipping : 0;

	if (showCheckout) {
		return (
			<Checkout
				items={items}
				onBack={handleBackToCart}
				onPaymentSuccess={handlePaymentSuccess}
			/>
		);
	}

	return (
		<main className="container mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 md:mb-12">
				<h1 className="mb-2 font-display font-normal text-2xl text-foreground tracking-tight md:text-3xl">
					Your bag
				</h1>
				<p className="font-body text-foreground/65 text-sm">
					{items.length === 0
						? "Your bag is empty"
						: `${items.length} item${items.length === 1 ? "" : "s"}`}
				</p>
			</div>

			{!hasItems ? (
				<div className="rounded-(--radius) bg-card/50 py-16 text-center">
					<h3 className="mb-3 font-display font-normal text-foreground text-lg">
						Your bag is empty
					</h3>
					<p className="mb-6 font-body text-foreground/65 text-sm">
						Add pieces you love from the shop.
					</p>
					<Link href="/shop">
						<Button className="rounded-(--radius)" size="lg">
							Explore shop
						</Button>
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
					<div className="space-y-6 lg:col-span-2">
						<div className="space-y-6 rounded-(--radius) bg-card/30 py-6 md:px-6 md:py-8">
							<h2 className="px-4 font-display font-normal text-foreground text-sm md:px-0">
								Items
							</h2>
							<div className="space-y-6 border-border/30 border-t pt-6 md:px-0">
								{items.map((item) => (
									<div
										className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:gap-6 md:px-0"
										key={`${item.id}-${item.color}-${item.size}`}
									>
										<div className="relative flex size-24 shrink-0 overflow-hidden rounded-sm bg-muted/50 sm:size-28">
											{item.image ? (
												<Image
													alt={item.name}
													className="object-cover"
													fill
													src={item.image}
												/>
											) : (
												<span className="flex items-center justify-center font-body text-foreground/30 text-xs">
													—
												</span>
											)}
										</div>
										<div className="min-w-0 flex-1 space-y-1">
											<h3 className="truncate font-display font-normal text-foreground text-sm">
												{item.name}
											</h3>
											<div className="font-body text-foreground/55 text-xs">
												{item.color && <span>{item.color}</span>}
												{item.size && <span>, {item.size}</span>}
											</div>
											<p className="font-body text-foreground text-sm">
												£{item.price.toFixed(2)}
											</p>
										</div>
										<div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
											<div className="flex items-center gap-1">
												<Button
													aria-label="Decrease quantity"
													disabled={item.quantity <= 1}
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity - 1,
															item.color,
															item.size
														)
													}
													size="sm"
													variant="outline"
												>
													<RiSubtractLine className="size-4" />
												</Button>
												<span className="min-w-8 text-center font-body text-foreground text-sm">
													{item.quantity}
													{typeof item.stock === "number" && (
														<span className="font-body text-foreground/50 text-xs">
															{" "}
															/ {item.stock}
														</span>
													)}
												</span>
												<Button
													aria-label="Increase quantity"
													disabled={
														typeof item.stock === "number" &&
														item.quantity >= item.stock
													}
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity + 1,
															item.color,
															item.size
														)
													}
													size="sm"
													variant="outline"
												>
													<RiAddLine className="size-4" />
												</Button>
											</div>
											<Button
												className="font-body text-foreground/55 text-xs hover:text-foreground"
												onClick={() =>
													removeItem(item.id, item.color, item.size)
												}
												size="sm"
												variant="ghost"
											>
												Remove
											</Button>
										</div>
										<div className="font-body text-foreground text-sm sm:ml-auto">
											£{(item.price * item.quantity).toFixed(2)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="lg:sticky lg:top-28">
						<div className="space-y-5 rounded-(--radius) bg-card/40 px-6 py-6">
							<h2 className="font-display font-normal text-foreground text-sm">
								Summary
							</h2>
							<div className="space-y-2 border-border/30 border-t pt-4">
								{items.map((item) => (
									<div
										className="flex justify-between font-body text-foreground/80 text-sm"
										key={`${item.id}-${item.color}-${item.size}`}
									>
										<span>
											{item.name} × {item.quantity}
										</span>
										<span>£{(item.price * item.quantity).toFixed(2)}</span>
									</div>
								))}
							</div>
							<Separator className="bg-border/40" />
							<div className="space-y-1 font-body text-foreground text-sm">
								<div className="flex justify-between">
									<span>Subtotal</span>
									<span>£{subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-foreground/80">
									<span>Shipping</span>
									<span>
										{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
									</span>
								</div>
							</div>
							<Separator className="bg-border/40" />
							<div className="flex justify-between font-body text-base text-foreground">
								<span>Total</span>
								<span>£{orderTotal.toFixed(2)}</span>
							</div>
							<Button
								className="w-full rounded-(--radius)"
								onClick={() => setShowCheckout(true)}
								size="lg"
							>
								Proceed to checkout
							</Button>
							<Link href="/shop">
								<Button className="w-full rounded-(--radius)" variant="outline">
									Continue shopping
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}

"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { RiAddLine, RiSubtractLine } from "@remixicon/react";

import Checkout from "@/components/payment/checkout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
	const items = useCartStore((state) => state.items);
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const total = useCartStore((state) => state.total);
	const clearCart = useCartStore((state) => state.clearCart);
	const [showCheckout, setShowCheckout] = useState(false);

	const handlePaymentSuccess = () => {
		clearCart();
		window.location.href = "/payment/success";
	};

	const handleBackToCart = () => {
		setShowCheckout(false);
	};

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
		<main className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
			<div className="mb-6 md:mb-8">
				<h1 className="mb-2 font-display font-bold text-2xl text-charcoal sm:text-3xl md:text-4xl">
					Shopping Cart
				</h1>
				<p className="font-body text-charcoal/70 text-sm sm:text-base">
					{items.length === 0
						? "Your cart is empty"
						: `${items.length} item(s) in your cart`}
				</p>
			</div>

			{items.length === 0 ? (
				<Card>
					<CardContent className="px-4 py-12 text-center sm:px-6">
						<h3 className="mb-4 font-display font-semibold text-xl text-charcoal">
							Your cart is empty
						</h3>
						<p className="mb-6 font-body text-charcoal/70">
							Add some beautiful abayas to your cart!
						</p>
						<Link href="/shop">
							<Button className="w-full sm:w-auto">Continue Shopping</Button>
						</Link>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
					{/* Cart Items */}
					<div className="space-y-4 lg:col-span-2 lg:space-y-0">
						<Card>
							<CardHeader className="px-4 sm:px-6">
								<CardTitle className="font-display text-lg sm:text-xl">
									Items
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 px-4 sm:px-6">
								{items.map((item) => {
									return (
										<div
											className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-4"
											key={`${item.id}-${item.color}-${item.size}`}
										>
											<div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
												{item.image ? (
													<Image
														alt={item.name}
														className="object-cover"
														fill
														src={item.image}
													/>
												) : (
													<span className="text-gray-500 text-xs">Image</span>
												)}
											</div>
											<div className="min-w-0 flex-1 space-y-1">
												<h3 className="font-display font-semibold text-charcoal truncate">
													{item.name}
												</h3>
												<div className="font-body text-charcoal/60 text-sm">
													{item.color && <span>{item.color}</span>}
													{item.size && <span>, {item.size}</span>}
												</div>
												<p className="font-medium text-charcoal">
													£{item.price.toFixed(2)}
												</p>
											</div>
											<div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
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
													<span className="min-w-[2rem] text-center font-medium">
														{item.quantity}
													</span>
													<Button
														aria-label="Increase quantity"
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
													className="text-red-600 hover:text-red-700"
													onClick={() =>
														removeItem(item.id, item.color, item.size)
													}
													size="sm"
													variant="ghost"
												>
													Remove
												</Button>
											</div>
											<div className="font-display font-semibold text-charcoal sm:ml-auto">
												£{(item.price * item.quantity).toFixed(2)}
											</div>
										</div>
									);
								})}
							</CardContent>
						</Card>
					</div>

					{/* Order Summary */}
					<div className="lg:sticky lg:top-32">
						<Card>
							<CardHeader className="px-4 sm:px-6">
								<CardTitle className="font-display text-lg sm:text-xl">
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 px-4 sm:px-6">
								<div className="space-y-2">
									{items.map((item) => (
										<div
											className="flex justify-between text-sm"
											key={`${item.id}-${item.color}-${item.size}`}
										>
											<span>
												{item.name} x {item.quantity}
											</span>
											<span>£{(item.price * item.quantity).toFixed(2)}</span>
										</div>
									))}
								</div>
								<Separator />
								<div className="flex justify-between font-semibold text-lg">
									<span>Total</span>
									<span>£{total.toFixed(2)}</span>
								</div>
								<Button
									className="w-full"
									onClick={() => setShowCheckout(true)}
									size="lg"
								>
									Proceed to Checkout
								</Button>
								<Link href="/shop">
									<Button className="w-full" variant="outline">
										Continue Shopping
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</main>
	);
}

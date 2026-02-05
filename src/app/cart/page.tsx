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
		<div className="mx-auto max-w-6xl py-28">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl">Shopping Cart</h1>
				<p className="text-gray-600">
					{items.length === 0
						? "Your cart is empty"
						: `${items.length} item(s) in your cart`}
				</p>
			</div>

			{items.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<h3 className="mb-4 font-semibold text-xl">Your cart is empty</h3>
						<p className="mb-6 text-gray-600">
							Add some beautiful abayas to your cart!
						</p>
						<Link href="/shop">
							<Button>Continue Shopping</Button>
						</Link>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle>Items</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{items.map((item) => {
									return (
										<div
											className="flex items-center space-x-4 rounded-lg border p-4"
											key={`${item.id}-${item.color}-${item.size}`}
										>
											<div className="relative flex size-20 items-center justify-center overflow-hidden rounded-lg bg-gray-200">
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
											<div className="flex-1">
												<h3 className="font-semibold">{item.name}</h3>
												<div className="text-gray-500 text-sm">
													{item.color && <span>{item.color}</span>}
													{item.size && <span>, {item.size}</span>}
												</div>
												<p className="text-gray-600">
													£{item.price.toFixed(2)}
												</p>
											</div>
											<div className="flex items-center space-x-2">
												<Button
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
													<RiSubtractLine />
												</Button>
												<span className="w-8 text-center">{item.quantity}</span>
												<Button
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
													<RiAddLine />
												</Button>
												<Button
													className="text-red-500 hover:text-red-700"
													onClick={() =>
														removeItem(item.id, item.color, item.size)
													}
													size="sm"
													variant="ghost"
												>
													Remove
												</Button>
											</div>
											<div className="font-semibold">
												£{(item.price * item.quantity).toFixed(2)}
											</div>
										</div>
									);
								})}
							</CardContent>
						</Card>
					</div>

					{/* Order Summary */}
					<div>
						<Card>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
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
		</div>
	);
}

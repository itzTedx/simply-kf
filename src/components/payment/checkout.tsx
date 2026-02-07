"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { usePaymentStore } from "@/stores/payment-store";

import StripeElements from "./stripe-elements";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	size?: string;
}

interface CheckoutProps {
	items: CartItem[];
	onPaymentSuccess: () => void;
	onBack: () => void;
}

export default function Checkout({
	items,
	onPaymentSuccess,
	onBack,
}: CheckoutProps) {
	const SHIPPING_FEE = 4.5;
	const FREE_SHIPPING_THRESHOLD = 30;

	const createPaymentIntent = usePaymentStore(
		(state) => state.createPaymentIntent
	);
	const isProcessing = usePaymentStore((state) => state.isProcessing);
	const error = usePaymentStore((state) => state.error);
	const clearError = usePaymentStore((state) => state.clearError);
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [showPaymentForm, setShowPaymentForm] = useState(false);

	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const shipping =
		items.length > 0 && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
	const total = subtotal + shipping;

	useEffect(() => {
		if (error) {
			clearError();
		}
	}, [error, clearError]);

	const handleInitiatePayment = async () => {
		const secret = await createPaymentIntent(total, items);
		if (secret) {
			setClientSecret(secret);
			setShowPaymentForm(true);
		}
	};

	const handlePaymentSuccess = () => {
		onPaymentSuccess();
	};

	const handlePaymentError = (errorMessage: string) => {
		console.error("Payment error:", errorMessage);
		toast.error("Payment failed", {
			description: errorMessage,
		});
	};

	if (showPaymentForm && clientSecret) {
		return (
			<div className="mx-auto max-w-4xl py-28">
				<Card>
					<CardHeader>
						<CardTitle className="font-bold text-2xl">
							Complete Payment
						</CardTitle>
						<div className="font-semibold text-lg">
							Total (incl. shipping): £{total.toFixed(2)}
						</div>
					</CardHeader>
					<CardContent>
						{/* Order Summary (shown during payment as well) */}
						<div className="mb-6 space-y-3 text-sm">
							<div className="flex items-center justify-between">
								<span className="text-gray-600">Subtotal</span>
								<span>£{subtotal.toFixed(2)}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600">Shipping</span>
								<span>
									{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
								</span>
							</div>
							<div className="flex items-center justify-between font-semibold">
								<span>Total</span>
								<span>£{total.toFixed(2)}</span>
							</div>
							<Separator />
						</div>

						<StripeElements
							clientSecret={clientSecret}
							onError={handlePaymentError}
							onSuccess={handlePaymentSuccess}
						/>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl py-28">
			<Card>
				<CardHeader>
					<CardTitle className="font-bold text-2xl">Checkout</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Order Summary */}
					<div className="space-y-4">
						<h3 className="font-semibold text-lg">Order Summary</h3>
						{items.map((item) => (
							<div
								className="flex items-center justify-between"
								key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
							>
								<div>
									<div className="font-medium">{item.name}</div>
									<div className="text-gray-600 text-sm">
										{item.color && <span>{item.color}</span>}
										{item.size && (
											<span>
												{item.color ? ", " : ""}
												{item.size}
											</span>
										)}
										{(item.color || item.size) && " · "}
										Qty: {item.quantity}
									</div>
								</div>
								<div className="font-medium">
									£{(item.price * item.quantity).toFixed(2)}
								</div>
							</div>
						))}
						<Separator />
						<div className="space-y-1 text-sm">
							<div className="flex items-center justify-between">
								<span>Subtotal</span>
								<span>£{subtotal.toFixed(2)}</span>
							</div>
							<div className="flex items-center justify-between text-gray-600">
								<span>Shipping</span>
								<span>
									{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
								</span>
							</div>
							<div className="flex items-center justify-between font-bold text-lg">
								<span>Total</span>
								<span>£{total.toFixed(2)}</span>
							</div>
						</div>
					</div>

					{/* Error Display */}
					{error && (
						<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
							{error}
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex gap-4">
						<Button
							className="flex-1"
							disabled={isProcessing}
							onClick={onBack}
							variant="outline"
						>
							Back to Cart
						</Button>
						<Button
							className="flex-1"
							disabled={isProcessing || items.length === 0}
							onClick={handleInitiatePayment}
						>
							{isProcessing ? "Processing..." : "Proceed to Payment"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

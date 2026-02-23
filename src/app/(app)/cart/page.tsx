"use client";

import { useRouter } from "next/navigation";

import { useQueryState } from "nuqs";

import Checkout from "@/components/payment/checkout";

import { checkoutStepParser } from "@/modules/checkout/checkout-step";
import { CartItem } from "@/modules/checkout/components/cart-item";
import { CartSummary } from "@/modules/checkout/components/cart-summary";
import { EmptyCart } from "@/modules/checkout/components/empty-cart";
import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
	const SHIPPING_FEE = 4.5;
	const FREE_SHIPPING_THRESHOLD = 30;

	const router = useRouter();

	const items = useCartStore((state) => state.items);
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const clearCart = useCartStore((state) => state.clearCart);

	const [step, setStep] = useQueryState("step", checkoutStepParser);

	const showCheckout = step === "checkout" || step === "payment";

	const handlePaymentSuccess = () => {
		clearCart();
		router.push("/payment/success");
	};

	const handleBackToCart = () => {
		setStep("cart");
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
		<main className="container mx-auto max-w-7xl py-20 md:py-28">
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
				<EmptyCart />
			) : (
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<div className="h-fit rounded-lg bg-card lg:col-span-2">
						<h2 className="p-6 font-display font-normal text-foreground">
							Items
						</h2>
						<div className="space-y-6 border-t py-6">
							{items.map((item) => (
								<CartItem
									item={item}
									key={`${item.id}-${item.color}-${item.size}`}
									onQuantityChange={updateQuantity}
									onRemove={removeItem}
								/>
							))}
						</div>
					</div>

					<CartSummary
						items={items}
						onProceedToCheckout={() => setStep("checkout")}
						orderTotal={orderTotal}
						shipping={shipping}
						subtotal={subtotal}
					/>
				</div>
			)}
		</main>
	);
}

import Link from "next/link";

import NumberFlow from "@number-flow/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { CartItem } from "@/stores/cart-store";

interface CartSummaryProps {
	items: CartItem[];
	subtotal: number;
	shipping: number;
	orderTotal: number;
	onProceedToCheckout: () => void;
}

export function CartSummary({
	items,
	subtotal,
	shipping,
	orderTotal,
	onProceedToCheckout,
}: CartSummaryProps) {
	return (
		<div className="lg:sticky lg:top-28">
			<div className="rounded-lg bg-card">
				<h2 className="p-6 font-display font-normal text-foreground text-sm">
					Summary
				</h2>
				<div className="space-y-2 border-t p-6">
					{items.map((item) => (
						<div
							className="flex justify-between font-body text-foreground/80 text-sm"
							key={`${item.id}-${item.color}-${item.size}`}
						>
							<span>
								{item.name} × <NumberFlow value={item.quantity} />
							</span>
							<span>
								<NumberFlow prefix="£" value={item.price * item.quantity} />
							</span>
						</div>
					))}
				</div>
				<Separator />
				<div className="space-y-1 p-6 font-body text-foreground text-sm">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>
							<NumberFlow prefix="£" value={subtotal} />
						</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>
							<NumberFlow prefix="£" value={shipping} />
						</span>
					</div>
				</div>
				<Separator />
				<div className="flex justify-between p-6 font-body text-base text-foreground">
					<span>Total</span>
					<span>
						<NumberFlow prefix="£" value={orderTotal} />
					</span>
				</div>
				<div className="space-y-3 p-6 pt-0">
					<Button
						className="w-full rounded-lg"
						onClick={onProceedToCheckout}
						size="lg"
					>
						Proceed to checkout
					</Button>
					<Link href="/shop">
						<Button className="w-full rounded-lg" variant="outline">
							Continue shopping
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

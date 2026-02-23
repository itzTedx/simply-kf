"use client";

import Image from "next/image";

import NumberFlow from "@number-flow/react";
import { RiDeleteBinLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { ItemDetails } from "@/modules/checkout/components/item-details";
import { QuantitySelector } from "@/modules/checkout/components/quantity-selector";
import type { CartItem as CartItemType } from "@/stores/cart-store";

interface CartItemProps {
	item: CartItemType;
	onRemove: (id: number, color?: string, size?: string) => void;
	onQuantityChange: (
		id: number,
		quantity: number,
		color?: string,
		size?: string
	) => void;
}

export function CartItem({ item, onRemove, onQuantityChange }: CartItemProps) {
	return (
		<div className="flex flex-col gap-4 px-6 sm:flex-row sm:gap-6">
			<div className="flex flex-1 items-center gap-4 sm:gap-6">
				<div className="relative flex size-24 shrink-0 overflow-hidden rounded-sm bg-muted/50 sm:size-32">
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
					<ItemDetails
						color={item.color}
						name={item.name}
						price={item.price}
						size={item.size}
						slug={item.slug}
					/>

					<QuantitySelector
						onChange={(newQuantity) =>
							onQuantityChange(item.id, newQuantity, item.color, item.size)
						}
						quantity={item.quantity}
						stock={item.stock ?? undefined}
					/>
				</div>
			</div>

			<div className="flex flex-col items-end justify-between py-3">
				<p className="font-body font-bold text-foreground sm:ml-auto">
					<NumberFlow prefix="£" value={item.price * item.quantity} />
				</p>
				<Button
					onClick={() => onRemove(item.id, item.color, item.size)}
					size="sm"
					variant="outline"
				>
					<RiDeleteBinLine /> Remove
				</Button>
			</div>
		</div>
	);
}

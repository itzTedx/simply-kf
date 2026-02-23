"use client";

import NumberFlow from "@number-flow/react";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";

type QuantitySelectorProps = {
	quantity: number;
	onChange: (quantity: number) => void;
	stock?: number;
};

export function QuantitySelector({
	quantity,
	onChange,
	stock,
}: QuantitySelectorProps) {
	return (
		<ButtonGroup orientation="horizontal">
			<Button
				aria-label="Decrease quantity"
				disabled={quantity <= 1}
				onClick={() => onChange(quantity - 1)}
				size="icon-sm"
				variant="outline"
			>
				<RiSubtractLine className="size-4" />
			</Button>
			<ButtonGroupText>
				<span className="w-8 text-center font-body text-foreground text-sm">
					<NumberFlow value={quantity} />
					{typeof stock === "number" && (
						<span className="font-body text-foreground/50 text-xs">
							{" "}
							/ {stock}
						</span>
					)}
				</span>
			</ButtonGroupText>
			<Button
				aria-label="Increase quantity"
				disabled={typeof stock === "number" && quantity >= stock}
				onClick={() => onChange(quantity + 1)}
				size="icon-sm"
				variant="outline"
			>
				<RiAddLine className="size-4" />
			</Button>
		</ButtonGroup>
	);
}

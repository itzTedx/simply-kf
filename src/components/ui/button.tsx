"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--radius)] border border-transparent font-body font-medium text-sm outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
				outline:
					"border-border/80 bg-transparent hover:border-foreground/10 hover:bg-accent/30 aria-expanded:bg-accent/40",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent/25 aria-expanded:bg-accent/30",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:ring-destructive/20",
				link: "text-foreground underline-offset-4 hover:underline hover:opacity-80",
			},
			size: {
				default:
					"h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				xs: "h-6 gap-1 rounded-[min(var(--radius-sm),8px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1 px-3 text-[0.8125rem] [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-11 gap-2 px-6 text-[0.9375rem] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
				icon: "size-9",
				"icon-xs":
					"size-6 rounded-[min(var(--radius-sm),8px)] [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			className={cn(buttonVariants({ variant, size, className }))}
			data-slot="button"
			{...props}
		/>
	);
}

export { Button, buttonVariants };

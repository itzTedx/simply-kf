import * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			className={cn(
				"h-9 w-full min-w-0 rounded-(--radius) border border-border/80 bg-transparent px-3 py-2 font-body text-sm outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:border-foreground/20 focus-visible:ring-2 focus-visible:ring-ring/15 disabled:pointer-events-none disabled:opacity-50 md:text-sm",
				className
			)}
			data-slot="input"
			type={type}
			{...props}
		/>
	);
}

export { Input };

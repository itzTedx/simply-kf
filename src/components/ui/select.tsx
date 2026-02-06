"use client";

import * as React from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import {
	RiArrowDownSLine,
	RiArrowUpSLine,
	RiCheckLine,
} from "@remixicon/react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			className={cn("scroll-my-1 p-1", className)}
			data-slot="select-group"
			{...props}
		/>
	);
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			className={cn("flex flex-1 text-left", className)}
			data-slot="select-value"
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: SelectPrimitive.Trigger.Props & {
	size?: "sm" | "default";
}) {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				"flex w-fit select-none items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius)] border border-border/80 bg-transparent px-3 py-2 font-body text-sm outline-none transition-colors duration-200 hover:bg-foreground/5 focus-visible:border-foreground/20 focus-visible:ring-2 focus-visible:ring-ring/15 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 data-placeholder:text-muted-foreground/70 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			data-size={size}
			data-slot="select-trigger"
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				render={
					<RiArrowDownSLine className="pointer-events-none size-4 text-muted-foreground" />
				}
			/>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	side = "bottom",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	alignItemWithTrigger = true,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
	>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				align={align}
				alignItemWithTrigger={alignItemWithTrigger}
				alignOffset={alignOffset}
				className="isolate z-50"
				side={side}
				sideOffset={sideOffset}
			>
				<SelectPrimitive.Popup
					className={cn(
						"data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-98 data-open:zoom-in-98 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-[var(--radius)] border border-border/60 bg-popover text-popover-foreground duration-300 data-closed:animate-out data-open:animate-in",
						className
					)}
					data-align-trigger={alignItemWithTrigger}
					data-slot="select-content"
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List>{children}</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			className={cn("px-1.5 py-1 text-muted-foreground text-xs", className)}
			data-slot="select-label"
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			className={cn(
				"relative flex w-full cursor-default select-none items-center gap-2 rounded-[var(--radius-sm)] py-2 pr-8 pl-3 font-body text-sm outline-hidden transition-colors duration-200 hover:bg-accent/25 focus:bg-accent/30 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0",
				className
			)}
			data-slot="select-item"
			{...props}
		>
			<SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator
				render={
					<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
				}
			>
				<RiCheckLine className="pointer-events-none" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
			data-slot="select-separator"
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
	return (
		<SelectPrimitive.ScrollUpArrow
			className={cn(
				"top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			data-slot="select-scroll-up-button"
			{...props}
		>
			<RiArrowUpSLine />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
	return (
		<SelectPrimitive.ScrollDownArrow
			className={cn(
				"bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			data-slot="select-scroll-down-button"
			{...props}
		>
			<RiArrowDownSLine />
		</SelectPrimitive.ScrollDownArrow>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};

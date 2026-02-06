"use client";

import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { RiCloseLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			className={cn(
				"data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-foreground/8 duration-300 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-[6px]",
				className
			)}
			data-slot="dialog-overlay"
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup
				className={cn(
					"data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-98 data-open:zoom-in-98 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-[var(--radius)] bg-card p-6 text-sm outline-none duration-300 data-closed:animate-out data-open:animate-in sm:max-w-lg",
					className
				)}
				data-slot="dialog-content"
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button
								className="absolute top-2 right-2"
								size="icon-sm"
								variant="ghost"
							/>
						}
					>
						<RiCloseLine />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col gap-2", className)}
			data-slot="dialog-header"
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			className={cn(
				"-mx-6 -mb-6 flex flex-col-reverse gap-3 rounded-b-lg border-border/30 border-t bg-muted/20 p-6 sm:flex-row sm:justify-end",
				className
			)}
			data-slot="dialog-footer"
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant="outline" />}>
					Close
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			className={cn("font-medium text-base leading-none", className)}
			data-slot="dialog-title"
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			className={cn(
				"text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className
			)}
			data-slot="dialog-description"
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};

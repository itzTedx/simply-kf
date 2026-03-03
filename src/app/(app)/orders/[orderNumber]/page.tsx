import Link from "next/link";
import { notFound } from "next/navigation";

import config from "@payload-config";
import {
	RiCheckLine,
	RiMapPinLine,
	RiShoppingBag3Line,
	RiTruckLine,
} from "@remixicon/react";
import { getPayload } from "payload";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import type { Order } from "@/payload-types";

type OrderItemClient = {
	productName: string | null;
	color: string | null;
	size: string | null;
	quantity: number;
	price: number;
};

type OrderClient = {
	orderNumber: string;
	status: string;
	paymentStatus?: string | null;
	total: number;
	createdAt: string;
	trackingNumber?: string | null;
	trackingUrl?: string | null;
	items: OrderItemClient[];
};

function sanitizeOrderForClient(order: Order): OrderClient {
	return {
		orderNumber: order.orderNumber,
		status: order.status,
		paymentStatus: order.paymentStatus ?? null,
		total: order.total,
		createdAt: order.createdAt,
		trackingNumber: order.trackingNumber ?? null,
		trackingUrl: order.trackingUrl ?? null,
		items: order.items.map((item) => ({
			productName: item.productName ?? null,
			color: item.color ?? null,
			size: item.size ?? null,
			quantity: item.quantity,
			price: item.price,
		})),
	};
}

function formatCurrency(value: number | null | undefined): string {
	if (value == null) return "0.00";
	return value.toFixed(2);
}

function formatDate(value: string | null | undefined): string | null {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

function getProgressStep(status: string): number {
	const normalized = status.toLowerCase();
	if (normalized === "pending") return 1;
	if (normalized === "processing") return 2;
	if (normalized === "shipped") return 3;
	if (normalized === "delivered") return 4;
	return 0;
}

function isTerminalCancelled(status: string): boolean {
	const normalized = status.toLowerCase();
	return (
		normalized === "cancelled" ||
		normalized === "refunded" ||
		normalized === "failed"
	);
}

async function getOrder(orderNumber: string): Promise<OrderClient | null> {
	const trimmed = orderNumber.trim();
	if (!trimmed) return null;

	const payload = await getPayload({ config });

	const result = await payload.find({
		collection: "orders",
		where: {
			orderNumber: { equals: trimmed },
		},
		limit: 1,
		overrideAccess: true,
	});

	if (!result.docs.length) {
		return null;
	}

	return sanitizeOrderForClient(result.docs[0] as Order);
}

type OrderPageParams = {
	orderNumber: string;
};

export default async function OrderPage({
	params,
}: {
	params: Promise<OrderPageParams>;
}) {
	const resolvedParams = await params;
	const rawOrderNumber = decodeURIComponent(resolvedParams.orderNumber);
	const order = await getOrder(rawOrderNumber);

	if (!order) {
		notFound();
	}

	const placedOn = formatDate(order.createdAt) ?? order.createdAt;
	const progressStep = getProgressStep(order.status);
	const cancelled = isTerminalCancelled(order.status);

	return (
		<main className="container mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Order tracking
				</h1>
			</div>

			<section aria-label="Order tracking details">
				<Card>
					<CardHeader className="items-start gap-3 sm:flex sm:items-center sm:justify-between">
						<div>
							<CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
								<h2 className="font-semibold text-base sm:text-lg">
									{order.orderNumber}
								</h2>
							</CardTitle>

							<div className="mt-4 grid gap-3 text-foreground/70 text-xs sm:grid-cols-3">
								<div className="rounded-md border border-border/40 bg-background/60 px-3 py-2">
									<p className="font-medium text-foreground/55 uppercase tracking-wide">
										Current status
									</p>
									<p className="mt-0.5 font-body text-foreground text-sm capitalize">
										{order.status}
									</p>
								</div>
								<div className="rounded-md border border-border/40 bg-background/60 px-3 py-2">
									<p className="font-medium text-foreground/55 uppercase tracking-wide">
										Total paid
									</p>
									<p className="mt-0.5 font-body text-foreground text-sm">
										£{formatCurrency(order.total)}
									</p>
								</div>
								<div className="rounded-md border border-border/40 bg-background/60 px-3 py-2">
									<p className="font-medium text-foreground/55 uppercase tracking-wide">
										Placed on
									</p>
									<p className="mt-0.5 font-body text-foreground text-sm">
										{placedOn}
									</p>
								</div>
							</div>
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						{cancelled ? (
							<div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 font-body text-destructive text-sm">
								This order is{" "}
								<span className="font-semibold lowercase">{order.status}</span>.
								If you believe this is a mistake, please contact our support
								team and share your order number.
							</div>
						) : (
							<div className="rounded-lg border border-border/40 bg-muted/40 p-4">
								<div className="mb-3 flex items-center gap-2">
									<RiTruckLine className="size-5 text-primary" />
									<p className="font-body font-medium text-foreground text-sm">
										Delivery progress
									</p>
								</div>
								<ol className="flex items-center justify-between gap-2 text-xs sm:text-sm">
									{[
										{
											id: 1,
											label: "Order placed",
											icon: RiShoppingBag3Line,
										},
										{
											id: 2,
											label: "Processing",
											icon: RiCheckLine,
										},
										{
											id: 3,
											label: "Shipped",
											icon: RiTruckLine,
										},
										{
											id: 4,
											label: "Delivered",
											icon: RiMapPinLine,
										},
									].map((step, index, all) => {
										const isCompleted = progressStep > step.id;
										const isCurrent = progressStep === step.id;
										const Icon = step.icon;

										return (
											<li
												className="flex flex-1 items-center gap-2"
												key={step.id}
											>
												<div className="flex items-center gap-2">
													<div
														className={`flex size-7 items-center justify-center rounded-full border font-medium text-[0.7rem] ${
															isCompleted || isCurrent
																? "border-primary bg-primary text-primary-foreground"
																: "border-border bg-background text-foreground/60"
														}`}
													>
														{isCompleted ? (
															<RiCheckLine className="size-3.5" />
														) : (
															<Icon className="size-3.5" />
														)}
													</div>
													<span
														className={`hidden sm:inline ${
															isCompleted || isCurrent
																? "font-medium text-foreground"
																: "text-foreground/60"
														}`}
													>
														{step.label}
													</span>
												</div>
												{index < all.length - 1 && (
													<div
														className={`h-px flex-1 ${
															progressStep > step.id
																? "bg-primary"
																: "bg-border"
														}`}
													/>
												)}
											</li>
										);
									})}
								</ol>
							</div>
						)}

						<div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)]">
							<div className="space-y-4">
								<h2 className="font-body font-semibold text-foreground text-sm uppercase tracking-wide">
									Order items
								</h2>
								<div className="divide-y divide-border/50 rounded-xl border border-border/40 bg-background/80 shadow-sm">
									{order.items.map((item, index) => {
										const hasVariant = item.color || item.size;
										const variant = [item.color, item.size]
											.filter(Boolean)
											.join(", ");

										return (
											<div
												className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
												key={`${item.productName ?? "item"}-${index}`}
											>
												<div>
													<p className="font-body font-medium text-foreground text-sm">
														{item.productName ?? "Item"}
													</p>
													<p className="font-body text-foreground/60 text-xs">
														{hasVariant ? variant : "Standard option"} • Qty:{" "}
														{item.quantity}
													</p>
												</div>
												<div className="text-right font-body text-foreground text-sm">
													<p className="font-medium">
														£{formatCurrency(item.price * item.quantity)}
													</p>
													<p className="text-foreground/60 text-xs">
														£{formatCurrency(item.price)} each
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							<div className="rounded-xl border border-border/40 bg-background/80 p-4 shadow-sm">
								<h2 className="mb-3 font-body font-semibold text-foreground text-sm uppercase tracking-wide">
									Delivery updates
								</h2>
								{order.trackingNumber || order.trackingUrl ? (
									<div className="space-y-2 font-body text-sm">
										{order.trackingNumber && (
											<p className="text-foreground">
												Tracking number:{" "}
												<span className="font-mono">
													{order.trackingNumber}
												</span>
											</p>
										)}
										{order.trackingUrl && (
											<p>
												<a
													className="text-primary underline underline-offset-4"
													href={order.trackingUrl}
													rel="noreferrer"
													target="_blank"
												>
													View detailed courier tracking
												</a>
											</p>
										)}
									</div>
								) : (
									<p className="font-body text-foreground/60 text-sm">
										Tracking details are not available yet. We&apos;ll email you
										as soon as your order has shipped.
									</p>
								)}
							</div>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<p className="font-body text-foreground/60 text-xs">
							If something doesn&apos;t look right with your order, our UK-based
							support team is here to help.
						</p>
						<div className="flex flex-wrap gap-2">
							<Button
								render={<Link href="/contact" />}
								size="sm"
								variant="outline"
							>
								Contact support
							</Button>
							<Button render={<Link href="/shop" />} size="sm" variant="ghost">
								Continue shopping
							</Button>
						</div>
					</CardFooter>
				</Card>
			</section>
		</main>
	);
}

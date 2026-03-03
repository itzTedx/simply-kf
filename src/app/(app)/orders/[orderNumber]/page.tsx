import Link from "next/link";
import { notFound } from "next/navigation";

import config from "@payload-config";
import { getPayload } from "payload";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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

function getStatusVariant(
	status: string
): "default" | "secondary" | "destructive" {
	const normalized = status.toLowerCase();
	if (
		normalized === "delivered" ||
		normalized === "shipped" ||
		normalized === "processing"
	) {
		return "default";
	}
	if (normalized === "pending") {
		return "secondary";
	}
	if (
		normalized === "cancelled" ||
		normalized === "refunded" ||
		normalized === "failed"
	) {
		return "destructive";
	}
	return "secondary";
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

	return (
		<main className="container mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Order tracking
				</h1>
				<p className="mx-auto max-w-md font-body text-foreground/65 text-sm leading-relaxed">
					You&apos;re viewing live updates for order{" "}
					<span className="font-mono">{order.orderNumber}</span>. This link
					works without logging in, so keep it safe.
				</p>
			</div>

			<section aria-label="Order tracking details">
				<Card>
					<CardHeader className="items-start gap-3 sm:flex sm:items-center sm:justify-between">
						<div>
							<CardTitle>Order {order.orderNumber}</CardTitle>
							<CardDescription>
								Placed on {placedOn}. You&apos;ll see updates here as your order
								moves through our fulfilment and delivery steps.
							</CardDescription>
						</div>
						<div className="flex flex-wrap gap-2">
							<Badge variant={getStatusVariant(order.status)}>
								Status: {order.status}
							</Badge>
							{order.paymentStatus && (
								<Badge variant={getStatusVariant(order.paymentStatus)}>
									Payment: {order.paymentStatus}
								</Badge>
							)}
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						<div>
							<h2 className="mb-3 font-body font-semibold text-foreground text-sm uppercase tracking-wide">
								Items
							</h2>
							<div className="divide-y divide-border/50 rounded-md border border-border/40 bg-background/60">
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
												<p className="font-body text-foreground text-sm">
													{item.productName ?? "Item"}
												</p>
												<p className="font-body text-foreground/60 text-xs">
													{hasVariant ? variant : "Standard option"} • Qty:{" "}
													{item.quantity}
												</p>
											</div>
											<div className="text-right font-body text-foreground text-sm">
												<p>£{formatCurrency(item.price)}</p>
												<p className="text-foreground/60 text-xs">
													Line total: £
													{formatCurrency(item.price * item.quantity)}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<h2 className="mb-3 font-body font-semibold text-foreground text-sm uppercase tracking-wide">
									Order summary
								</h2>
								<dl className="space-y-1 font-body text-sm">
									<div className="mt-2 flex items-center justify-between border-border/40 border-t pt-2">
										<dt className="font-semibold text-foreground">
											Total paid
										</dt>
										<dd className="font-semibold text-foreground">
											£{formatCurrency(order.total)}
										</dd>
									</div>
								</dl>
							</div>

							<div>
								<h2 className="mb-3 font-body font-semibold text-foreground text-sm uppercase tracking-wide">
									Delivery updates
								</h2>
								{order.trackingNumber || order.trackingUrl ? (
									<div className="rounded-md border border-border/40 bg-background/60 p-3 font-body text-sm">
										{order.trackingNumber && (
											<p className="text-foreground">
												Tracking number:{" "}
												<span className="font-mono">
													{order.trackingNumber}
												</span>
											</p>
										)}
										{order.trackingUrl && (
											<p className="mt-2">
												<a
													className="underline underline-offset-4"
													href={order.trackingUrl}
													rel="noreferrer"
													target="_blank"
												>
													View carrier tracking updates
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

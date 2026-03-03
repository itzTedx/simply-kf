"use client";

import { useState } from "react";

import Link from "next/link";

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
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
	type LookupSuccess,
	lookupOrderAction,
} from "@/app/(app)/account/actions";

type LookupResult = LookupSuccess;

type FetchState =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success"; data: LookupResult }
	| { status: "error"; message: string };

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

export function AccountOrders() {
	const [email, setEmail] = useState("");
	const [orderNumber, setOrderNumber] = useState("");
	const [state, setState] = useState<FetchState>({ status: "idle" });

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmedEmail = email.trim();
		const trimmedOrderNumber = orderNumber.trim();

		if (!trimmedEmail || !trimmedOrderNumber) {
			setState({
				status: "error",
				message:
					"Please enter both the email address used at checkout and your order number.",
			});
			return;
		}

		setState({ status: "loading" });

		try {
			const result = await lookupOrderAction({
				email: trimmedEmail,
				orderNumber: trimmedOrderNumber,
			});

			if ("error" in result) {
				setState({
					status: "error",
					message: result.error,
				});
			} else {
				setState({
					status: "success",
					data: result,
				});
			}
		} catch (error) {
			console.error("[AccountOrders] Failed to fetch order", error);
			setState({
				status: "error",
				message:
					"Something went wrong while looking up your order. Please try again or contact support if this keeps happening.",
			});
		}
	}

	const isLoading = state.status === "loading";
	const order = state.status === "success" ? state.data.order : null;

	return (
		<main className="container mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Manage your orders
				</h1>
				<p className="mx-auto max-w-md font-body text-foreground/65 text-sm leading-relaxed">
					View the details and status of your Simply KF orders using the email
					you used at checkout and your order number from the confirmation
					email.
				</p>
			</div>

			<section className="mb-10">
				<Card>
					<CardHeader>
						<CardTitle>Find your order</CardTitle>
						<CardDescription>
							Enter the email address you used at checkout and your order number
							(e.g. SKF-240201-ABCD) to securely view your order.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-5" onSubmit={handleSubmit}>
							<FieldGroup className="space-y-4">
								<Field>
									<FieldLabel htmlFor="account-email">Email address</FieldLabel>
									<FieldContent>
										<Input
											autoComplete="email"
											disabled={isLoading}
											id="account-email"
											onChange={(event) => setEmail(event.target.value)}
											placeholder="you@example.com"
											type="email"
											value={email}
										/>
									</FieldContent>
								</Field>

								<Field>
									<FieldLabel htmlFor="account-order-number">
										Order number
									</FieldLabel>
									<FieldContent>
										<Input
											disabled={isLoading}
											id="account-order-number"
											onChange={(event) => setOrderNumber(event.target.value)}
											placeholder="SKF-240201-ABCD"
											value={orderNumber}
										/>
									</FieldContent>
								</Field>
							</FieldGroup>

							{state.status === "error" && (
								<FieldError>{state.message}</FieldError>
							)}

							<Button
								className="w-full"
								disabled={isLoading}
								size="lg"
								type="submit"
							>
								{isLoading ? "Searching…" : "View order"}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex flex-col items-start gap-2 text-foreground/60 text-xs sm:flex-row sm:items-center sm:justify-between">
						<p>
							For security, we only show orders that match both your email and
							order number.
						</p>
						<Button
							render={<Link href="mailto:support@simplykf.com" />}
							size="sm"
							variant="outline"
						>
							Need help with an order?
						</Button>
					</CardFooter>
				</Card>
			</section>

			{order && (
				<section aria-label="Order details" className="space-y-4">
					<Card>
						<CardHeader className="items-start gap-3 sm:flex sm:items-center sm:justify-between">
							<div>
								<CardTitle>Order {order.orderNumber}</CardTitle>
								<CardDescription>
									Placed on {formatDate(order.createdAt) ?? "an unknown date"}.
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
										<div className="flex items-center justify-between">
											<dt className="text-foreground/70">Subtotal</dt>
											<dd className="text-foreground">
												£{formatCurrency(order.subtotal ?? order.total)}
											</dd>
										</div>
										<div className="flex items-center justify-between">
											<dt className="text-foreground/70">Shipping</dt>
											<dd className="text-foreground">
												£{formatCurrency(order.shipping ?? 0)}
											</dd>
										</div>
										<div className="mt-2 flex items-center justify-between border-border/40 border-t pt-2">
											<dt className="font-semibold text-foreground">
												Total paid
											</dt>
											<dd className="font-semibold text-foreground">
												£{formatCurrency(order.total)}
											</dd>
										</div>
										{order.paidAt && (
											<div className="mt-2 text-foreground/60 text-xs">
												Paid on {formatDate(order.paidAt) ?? order.paidAt}
											</div>
										)}
									</dl>
								</div>

								<div>
									<h2 className="mb-3 font-body font-semibold text-foreground text-sm uppercase tracking-wide">
										Delivery
									</h2>
									{order.shippingAddress ? (
										<div className="rounded-md border border-border/40 bg-background/60 p-3 font-body text-sm">
											<p className="text-foreground">
												{order.shippingAddress.line1}
												{order.shippingAddress.line2 && (
													<>
														<br />
														{order.shippingAddress.line2}
													</>
												)}
												{(order.shippingAddress.city ||
													order.shippingAddress.postalCode) && (
													<>
														<br />
														{[
															order.shippingAddress.city,
															order.shippingAddress.postalCode,
														]
															.filter(Boolean)
															.join(", ")}
													</>
												)}
												{order.shippingAddress.country && (
													<>
														<br />
														{order.shippingAddress.country}
													</>
												)}
											</p>

											{(order.trackingNumber || order.trackingUrl) && (
												<div className="mt-3 space-y-1 text-foreground/70 text-xs">
													{order.trackingNumber && (
														<p>
															Tracking number:{" "}
															<span className="font-mono">
																{order.trackingNumber}
															</span>
														</p>
													)}
													{order.trackingUrl && (
														<p>
															<a
																className="underline underline-offset-4"
																href={order.trackingUrl}
																rel="noreferrer"
																target="_blank"
															>
																View tracking updates
															</a>
														</p>
													)}
												</div>
											)}
										</div>
									) : (
										<p className="font-body text-foreground/60 text-sm">
											Delivery details are not available for this order yet.
										</p>
									)}
								</div>
							</div>
						</CardContent>

						<CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<p className="font-body text-foreground/60 text-xs">
								If you need to change your delivery details or have questions
								about this order, our UK-based support team is here to help.
							</p>
							<div className="flex flex-wrap gap-2">
								<Button
									render={<Link href="/contact" />}
									size="sm"
									variant="outline"
								>
									Contact support
								</Button>
								<Button
									render={<Link href="/shop" />}
									size="sm"
									variant="ghost"
								>
									Continue shopping
								</Button>
							</div>
						</CardFooter>
					</Card>
				</section>
			)}
		</main>
	);
}

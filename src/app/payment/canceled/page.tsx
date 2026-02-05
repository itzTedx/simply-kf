"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCanceled() {
	return (
		<main className="flex min-h-[60vh] items-center justify-center bg-zinc-50/50 px-4 py-16 md:py-24">
			<div className="w-full max-w-md">
				<Card className="border-zinc-200 shadow-lg">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
							<svg
								className="h-8 w-8 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M6 18L18 6M6 6l12 12"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
								/>
							</svg>
						</div>
						<CardTitle className="text-2xl text-red-600">
							Payment Canceled
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-center">
						<p className="text-gray-600">
							Your payment has been canceled. No charges were made to your
							account.
						</p>

						<div className="rounded-lg bg-gray-50 p-4 text-sm">
							<p className="mb-2 font-medium">What happened?</p>
							<p>
								You may have canceled the payment process, or there was an issue
								with the payment method.
							</p>
						</div>

						<div className="space-y-2 pt-4">
							<Link href="/shop">
								<Button className="w-full">Try Again</Button>
							</Link>
							<Link href="/">
								<Button className="w-full" variant="outline">
									Return to Home
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

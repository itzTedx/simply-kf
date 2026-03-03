"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function TrackPage() {
	const router = useRouter();
	const [orderNumber, setOrderNumber] = useState("");
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const trimmed = orderNumber.trim();

		if (!trimmed) {
			setError("Please enter your order number to view tracking details.");
			return;
		}

		router.push(`/orders/${encodeURIComponent(trimmed)}`);
	}

	return (
		<main className="container mx-auto max-w-md px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Track your order
				</h1>
				<p className="mx-auto max-w-md font-body text-foreground/65 text-sm leading-relaxed">
					Enter your Simply KF order number (for example SKF-240201-ABCD) to see
					live tracking updates. No login needed.
				</p>
			</div>

			<section className="mb-10 rounded-lg bg-card p-6">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<FieldGroup className="space-y-4">
						<Field>
							<FieldLabel htmlFor="track-order-number">Order number</FieldLabel>
							<FieldContent>
								<Input
									id="track-order-number"
									onChange={(event) => setOrderNumber(event.target.value)}
									placeholder="SKF-240201-ABCD"
									value={orderNumber}
								/>
							</FieldContent>
						</Field>
					</FieldGroup>

					{error && <FieldError>{error}</FieldError>}

					<Button className="h-11 w-full rounded-lg" size="lg" type="submit">
						Track Order
					</Button>
				</form>
			</section>
		</main>
	);
}

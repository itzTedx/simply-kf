"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { submitContactForm } from "./actions"; // Import the server action

export default function ContactPage() {
	const [isPending, startTransition] = useTransition();
	const [formState, setFormState] = useState<{
		success?: string;
		error?: string;
	} | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		startTransition(async () => {
			const result = await submitContactForm(formData);
			setFormState(result);
			if (result.success) {
				// Optional: Reset form here if needed
				(event.target as HTMLFormElement).reset();
			}
		});
	}

	return (
		<main className="container mx-auto max-w-xl px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-14 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Get in touch
				</h1>
				<p className="mx-auto max-w-md font-body text-foreground/65 text-sm leading-relaxed">
					We’re here to assist with any questions about our collections, sizing,
					or orders.
				</p>
			</div>

			<form className="mb-16 rounded-lg bg-card p-6" onSubmit={handleSubmit}>
				<FieldGroup className="space-y-6">
					<Field>
						<FieldLabel
							className="font-body text-foreground/80 text-sm"
							htmlFor="name"
						>
							Full name
						</FieldLabel>
						<Input
							className="h-11 border-border/70 bg-transparent font-body placeholder:text-foreground/40"
							disabled={isPending}
							id="name"
							name="name"
							placeholder="Enter your full name"
							required
						/>
					</Field>

					<Field>
						<FieldLabel
							className="font-body text-foreground/80 text-sm"
							htmlFor="email"
						>
							Email address
						</FieldLabel>
						<Input
							className="h-11 border-border/70 bg-transparent font-body placeholder:text-foreground/40"
							disabled={isPending}
							id="email"
							name="email"
							placeholder="you@example.com"
							required
							type="email"
						/>
					</Field>

					<Field>
						<div className="flex items-baseline justify-between">
							<FieldLabel
								className="font-body text-foreground/80 text-sm"
								htmlFor="subject"
							>
								Subject
							</FieldLabel>
							<span className="font-body text-foreground/40 text-xs">
								Optional
							</span>
						</div>
						<Input
							className="h-11 border-border/70 bg-transparent font-body placeholder:text-foreground/40"
							disabled={isPending}
							id="subject"
							name="subject"
							placeholder="How can we help?"
						/>
					</Field>

					<Field>
						<FieldLabel
							className="font-body text-foreground/80 text-sm"
							htmlFor="message"
						>
							Message
						</FieldLabel>
						<Textarea
							className="min-h-[140px] resize-none border-border/70 bg-transparent font-body placeholder:text-foreground/40"
							disabled={isPending}
							id="message"
							name="message"
							placeholder="Write your message here..."
							required
						/>
					</Field>

					{formState?.error && (
						<p className="text-center font-body text-destructive text-sm">
							{formState.error}
						</p>
					)}
					{formState?.success && (
						<p className="text-center font-body text-foreground/80 text-sm">
							{formState.success}
						</p>
					)}

					<Button
						className="h-11 w-full rounded-lg"
						disabled={isPending}
						size="lg"
						type="submit"
					>
						{isPending ? "Sending…" : "Send message"}
					</Button>
				</FieldGroup>
			</form>

			<div className="mb-10 space-y-2 text-center">
				<p className="font-body text-foreground text-sm">
					support@simplykf.com
				</p>
				<p className="font-body text-foreground/55 text-sm">@simplykf</p>
			</div>

			<div className="mx-auto mb-8 max-w-sm text-center">
				<p className="font-body text-[0.6875rem] text-foreground/45 uppercase leading-relaxed tracking-widest">
					SIMPLY KF is curated exclusively for customers in the UK. We aim to
					respond within 24–48 hours.
				</p>
			</div>

			<div className="text-center">
				<p className="font-body text-foreground/40 text-sm italic">
					Thank you for reaching out.
				</p>
			</div>
		</main>
	);
}

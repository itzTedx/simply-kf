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
		<main className="fade-in slide-in-from-bottom-4 container mx-auto max-w-xl animate-in px-4 py-16 duration-700 md:py-24">
			{/* page structure 1: Hero / Intro */}
			<div className="mb-12 space-y-4 text-center">
				<h1 className="font-display text-4xl text-neutral-800 md:text-5xl">
					Get in Touch
				</h1>
				<p className="mx-auto max-w-md text-neutral-600 leading-relaxed">
					We’re here to assist with any questions about our collections, sizing,
					or orders.
				</p>
			</div>

			{/* page structure 2: Contact Form */}
			<form className="mb-16" onSubmit={handleSubmit}>
				<FieldGroup className="space-y-6">
					{/* Name */}
					<Field>
						<FieldLabel htmlFor="name">Full Name</FieldLabel>
						<Input
							className="h-11 border-neutral-200 bg-neutral-50/50 transition-all duration-300 focus:border-neutral-400 focus:ring-0"
							disabled={isPending}
							id="name"
							name="name"
							placeholder="Enter your full name"
							required
						/>
					</Field>

					{/* Email */}
					<Field>
						<FieldLabel htmlFor="email">Email Address</FieldLabel>
						<Input
							className="h-11 border-neutral-200 bg-neutral-50/50 transition-all duration-300 focus:border-neutral-400 focus:ring-0"
							disabled={isPending}
							id="email"
							name="email"
							placeholder="you@example.com"
							required
							type="email"
						/>
					</Field>

					{/* Subject */}
					<Field>
						<div className="flex items-baseline justify-between">
							<FieldLabel htmlFor="subject">Subject</FieldLabel>
							<span className="font-light text-neutral-400 text-xs tracking-wide">
								OPTIONAL
							</span>
						</div>
						<Input
							className="h-11 border-neutral-200 bg-neutral-50/50 transition-all duration-300 focus:border-neutral-400 focus:ring-0"
							disabled={isPending}
							id="subject"
							name="subject"
							placeholder="How can we help?"
						/>
					</Field>

					{/* Message */}
					<Field>
						<FieldLabel htmlFor="message">Message</FieldLabel>
						<Textarea
							className="min-h-[150px] resize-none border-neutral-200 bg-neutral-50/50 transition-all duration-300 focus:border-neutral-400 focus:ring-0"
							disabled={isPending}
							id="message"
							name="message"
							placeholder="Write your message here..."
							required
						/>
					</Field>

					{/* Validation Messages */}
					{formState?.error && (
						<p className="fade-in animate-in text-center text-red-500 text-sm">
							{formState.error}
						</p>
					)}
					{formState?.success && (
						<p className="fade-in animate-in text-center text-emerald-700 text-sm">
							{formState.success}
						</p>
					)}

					{/* Submit Button */}
					<Button
						className="h-12 w-full rounded-lg bg-neutral-900 text-base text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:shadow-md"
						disabled={isPending}
						size="lg"
						type="submit"
					>
						{isPending ? "Sending..." : "Send Message"}
					</Button>
				</FieldGroup>
			</form>

			{/* page structure 3: Contact Information */}
			<div className="mb-12 space-y-2 text-center">
				<p className="font-medium text-neutral-900">support@simplykf.com</p>
				<p className="font-medium text-neutral-500 tracking-wide">@simplykf</p>
			</div>

			{/* page structure 4: UK Focus Note */}
			<div className="mx-auto mb-8 max-w-xs text-center">
				<p className="font-light text-neutral-500 text-xs uppercase leading-relaxed tracking-wider">
					SIMPLY KF is curated exclusively for customers in the UK. We aim to
					respond to all enquiries within 24–48 hours.
				</p>
			</div>

			{/* page structure 5: Closing Line */}
			<div className="text-center">
				<p className="font-light text-neutral-400 text-sm italic">
					Thank you for reaching out to SIMPLY KF.
				</p>
			</div>
		</main>
	);
}

"use client";

import { type FormEvent, useTransition } from "react";

import { toast } from "sonner";

import { subscribeToNewsletter } from "@/modules/newsletter/actions";

import {
	InputGroup,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";

export function Newsletter() {
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isPending) return;

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");

		if (typeof email !== "string" || !email.trim()) {
			toast.error("Please enter a valid email address.");
			return;
		}

		startTransition(async () => {
			const result = await subscribeToNewsletter(formData);

			if (result.error) {
				toast.error(result.error);
				return;
			}

			toast.success(
				result.success ?? "You’ve been subscribed to the newsletter."
			);
			e.currentTarget.reset();
		});
	};

	return (
		<section className="border-y bg-ivory py-12 md:py-20">
			<div className="container flex max-w-6xl items-center justify-between">
				<div>
					<p className="font-body text-foreground/50 text-sm uppercase tracking-[0.2em]">
						Newsletter
					</p>

					<h2 className="font-display font-normal text-2xl text-foreground tracking-tight md:text-3xl">
						Join SIMPLY KF
					</h2>
					<p className="font-body text-muted-foreground leading-relaxed">
						Early access to collections and private releases.
					</p>
				</div>

				<form
					className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
					onSubmit={handleSubmit}
				>
					<InputGroup className="h-12 min-h-12">
						<InputGroupInput
							className="font-body text-foreground placeholder:text-foreground/40 sm:max-w-sm"
							name="email"
							placeholder="Email address"
							required
							type="email"
						/>
						<InputGroupButton
							className="h-10 min-h-10 w-full px-4 sm:w-auto"
							disabled={isPending}
							type="submit"
							variant="default"
						>
							{isPending ? "Subscribing..." : "Subscribe"}
						</InputGroupButton>
					</InputGroup>
				</form>
			</div>
		</section>
	);
}

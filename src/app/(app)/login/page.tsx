"use client";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signIn } from "@/lib/auth/client";

export default function LoginPage() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();

		if (!trimmedEmail || !trimmedPassword) {
			setError("Please enter both your email and password.");
			return;
		}

		startTransition(async () => {
			try {
				await signIn.email(
					{
						email: trimmedEmail,
						password: trimmedPassword,
						callbackURL: "/",
					},
					{
						onError: (ctx: { error?: { message?: string } }) => {
							const message =
								ctx.error?.message ||
								"Unable to sign you in. Please check your details and try again.";
							setError(message);
						},
						onSuccess: () => {
							router.push("/" as never);
						},
					}
				);
			} catch (err) {
				console.error("[login] Unexpected error", err);
				setError(
					"Something went wrong while signing you in. Please try again."
				);
			}
		});
	}

	return (
		<main className="container mx-auto max-w-md px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Customer login
				</h1>
				<p className="mx-auto max-w-md font-body text-foreground/65 text-sm leading-relaxed">
					Sign in with your email and password to access your Simply KF
					customer account.
				</p>
			</div>

			<section className="mb-10 rounded-lg bg-card p-6">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<FieldGroup className="space-y-4">
						<Field>
							<FieldLabel htmlFor="login-email">Email address</FieldLabel>
							<FieldContent>
								<Input
									autoComplete="email"
									disabled={isPending}
									id="login-email"
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@example.com"
									type="email"
									value={email}
								/>
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="login-password">Password</FieldLabel>
							<FieldContent>
								<Input
									autoComplete="current-password"
									disabled={isPending}
									id="login-password"
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
									type="password"
									value={password}
								/>
							</FieldContent>
						</Field>
					</FieldGroup>

					{error && (
						<p className="font-body text-destructive text-sm" role="alert">
							{error}
						</p>
					)}

					<Button
						className="h-11 w-full rounded-lg"
						disabled={isPending}
						size="lg"
						type="submit"
					>
						{isPending ? "Signing in…" : "Sign in"}
					</Button>
				</form>
			</section>

			<p className="text-center font-body text-foreground/55 text-xs">
				Don&apos;t have a customer account yet? You can create one during
				checkout.
			</p>
		</main>
	);
}

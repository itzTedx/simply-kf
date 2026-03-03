"use client";

import { useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signUp } from "@/lib/auth/client";

export default function SignupPage() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();
		const trimmedConfirmPassword = confirmPassword.trim();

		if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
			setError("Please fill in all fields to create your account.");
			return;
		}

		if (trimmedPassword.length < 8) {
			setError("Your password must be at least 8 characters long.");
			return;
		}

		if (trimmedPassword !== trimmedConfirmPassword) {
			setError("Your passwords do not match. Please try again.");
			return;
		}

		startTransition(async () => {
			try {
				await signUp.email(
					{
						email: trimmedEmail,
						password: trimmedPassword,
						name: "Admin",
						callbackURL: "/admin",
					},
					{
						onError: (ctx: { error?: { message?: string } }) => {
							const message =
								ctx.error?.message ||
								"Unable to create your account. Please check your details and try again.";
							setError(message);
						},
						onSuccess: () => {
							router.push("/admin" as never);
						},
					}
				);
			} catch (err) {
				console.error("[signup] Unexpected error", err);
				setError(
					"Something went wrong while creating your account. Please try again."
				);
			}
		});
	}

	return (
		<main className="container mx-auto max-w-md px-4 py-20 sm:px-6 md:py-28">
			<div className="mb-10 space-y-4 text-center">
				<h1 className="font-display font-normal text-3xl text-foreground tracking-tight md:text-4xl">
					Create your admin login
				</h1>
				<p className="mx-auto max-w-md font-body text-foreground/65 text-sm leading-relaxed">
					Set up an admin login to securely access the Simply KF Payload admin
					dashboard.
				</p>
			</div>

			<section className="mb-10 rounded-lg bg-card p-6">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<FieldGroup className="space-y-4">
						<Field>
							<FieldLabel htmlFor="signup-email">Email address</FieldLabel>
							<FieldContent>
								<Input
									autoComplete="email"
									disabled={isPending}
									id="signup-email"
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@example.com"
									type="email"
									value={email}
								/>
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="signup-password">Password</FieldLabel>
							<FieldContent>
								<Input
									autoComplete="new-password"
									disabled={isPending}
									id="signup-password"
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Create a password"
									type="password"
									value={password}
								/>
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="signup-confirm-password">
								Confirm password
							</FieldLabel>
							<FieldContent>
								<Input
									autoComplete="new-password"
									disabled={isPending}
									id="signup-confirm-password"
									onChange={(event) => setConfirmPassword(event.target.value)}
									placeholder="Re-enter your password"
									type="password"
									value={confirmPassword}
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
						{isPending ? "Creating account…" : "Create account"}
					</Button>
				</form>
			</section>

			<p className="text-center font-body text-foreground/55 text-xs">
				Already have an admin login?{" "}
				<Link className="underline underline-offset-4" href="/login">
					Sign in instead
				</Link>
				.
			</p>
		</main>
	);
}

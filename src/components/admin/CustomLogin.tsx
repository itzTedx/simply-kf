"use client";

import { useState, useTransition } from "react";

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

import { signIn, signUp } from "@/lib/auth/client";

type Mode = "login" | "signup";

export default function CustomLogin() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [mode, setMode] = useState<Mode>("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const isLogin = mode === "login";

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();
		const trimmedConfirmPassword = confirmPassword.trim();

		if (!trimmedEmail || !trimmedPassword) {
			setError("Please enter both your email and password.");
			return;
		}

		if (!isLogin) {
			if (!trimmedName) {
				setError("Please enter a name for the admin user.");
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
		}

		startTransition(async () => {
			try {
				if (isLogin) {
					await signIn.email(
						{
							email: trimmedEmail,
							password: trimmedPassword,
							callbackURL: "/admin",
						},
						{
							onError: (ctx: { error?: { message?: string } }) => {
								const message =
									ctx.error?.message ||
									"Unable to sign you in. Please check your details and try again.";
								setError(message);
							},
							onSuccess: () => {
								router.push("/admin" as never);
							},
						}
					);
				} else {
					await signUp.email(
						{
							email: trimmedEmail,
							password: trimmedPassword,
							name: trimmedName || "Admin",
							callbackURL: "/admin",
						},
						{
							onError: (ctx: { error?: { message?: string } }) => {
								const message =
									ctx.error?.message ||
									"Unable to create your admin account. Please check your details and try again.";
								setError(message);
							},
							onSuccess: () => {
								router.push("/admin" as never);
							},
						}
					);
				}
			} catch (err) {
				console.error("[CustomLogin] Unexpected error", err);
				setError(
					"Something went wrong. Please try again or contact your site administrator."
				);
			}
		});
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md rounded-lg border p-6 shadow-sm">
				<h1 className="mb-2 text-center font-semibold text-xl">
					Simply KF Admin
				</h1>
				<p className="mb-6 text-center text-sm">
					{isLogin
						? "Sign in with your admin credentials to access the Payload dashboard."
						: "Create a new admin account to access the Payload dashboard."}
				</p>

				<form className="space-y-5" onSubmit={handleSubmit}>
					<FieldGroup className="space-y-4">
						{!isLogin && (
							<Field>
								<FieldLabel htmlFor="admin-name">Name</FieldLabel>
								<FieldContent>
									<Input
										autoComplete="name"
										disabled={isPending}
										id="admin-name"
										onChange={(event) => setName(event.target.value)}
										placeholder="Admin name"
										type="text"
										value={name}
									/>
								</FieldContent>
							</Field>
						)}

						<Field>
							<FieldLabel htmlFor="admin-email">Email address</FieldLabel>
							<FieldContent>
								<Input
									autoComplete="email"
									disabled={isPending}
									id="admin-email"
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@example.com"
									type="email"
									value={email}
								/>
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="admin-password">Password</FieldLabel>
							<FieldContent>
								<Input
									autoComplete={isLogin ? "current-password" : "new-password"}
									disabled={isPending}
									id="admin-password"
									onChange={(event) => setPassword(event.target.value)}
									placeholder={
										isLogin ? "Enter your password" : "Create a password"
									}
									type="password"
									value={password}
								/>
							</FieldContent>
						</Field>

						{!isLogin && (
							<Field>
								<FieldLabel htmlFor="admin-confirm-password">
									Confirm password
								</FieldLabel>
								<FieldContent>
									<Input
										autoComplete="new-password"
										disabled={isPending}
										id="admin-confirm-password"
										onChange={(event) => setConfirmPassword(event.target.value)}
										placeholder="Re-enter your password"
										type="password"
										value={confirmPassword}
									/>
								</FieldContent>
							</Field>
						)}
					</FieldGroup>

					{error && <FieldError>{error}</FieldError>}

					<Button
						className="h-11 w-full rounded-lg"
						disabled={isPending}
						size="lg"
						type="submit"
					>
						{isPending
							? isLogin
								? "Signing in…"
								: "Creating account…"
							: isLogin
								? "Sign in"
								: "Create admin account"}
					</Button>
				</form>

				<p className="mt-4 text-center text-gray-500 text-xs">
					{isLogin ? (
						<>
							Need to create an admin account?{" "}
							<button
								className="font-medium text-gray-700 underline"
								onClick={() => {
									setMode("signup");
									setError(null);
								}}
								type="button"
							>
								Create admin account
							</button>
							.
						</>
					) : (
						<>
							Already have an admin account?{" "}
							<button
								className="font-medium text-gray-700 underline"
								onClick={() => {
									setMode("login");
									setError(null);
								}}
								type="button"
							>
								Sign in
							</button>
							.
						</>
					)}
				</p>
			</div>
		</div>
	);
}

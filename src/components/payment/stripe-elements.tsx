"use client";

import { useEffect, useState } from "react";

import {
	AddressElement,
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Controller, useForm } from "react-hook-form";

import {
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
	CheckoutEmailFormValues,
	checkoutEmailSchema,
} from "@/modules/checkout/schema";

import { Button } from "../ui/button";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
	onSuccess: () => void;
	onError: (error: string) => void;
}

function CheckoutForm({ onSuccess, onError }: CheckoutFormProps) {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	const [message, setMessage] = useState<string>("");

	const form = useForm<CheckoutEmailFormValues>({
		defaultValues: { email: "" },
	});

	useEffect(() => {
		if (!stripe) return;

		const urlParams = new URLSearchParams(window.location.search);
		const clientSecretParam = urlParams.get("payment_intent_client_secret");

		if (clientSecretParam) {
			stripe
				.retrievePaymentIntent(clientSecretParam)
				.then(({ paymentIntent }) => {
					switch (paymentIntent?.status) {
						case "succeeded":
							setMessage("Payment succeeded!");
							onSuccess();
							break;
						case "processing":
							setMessage("Your payment is processing.");
							break;
						case "requires_payment_method":
							setMessage("Your payment was not successful, please try again.");
							break;
						default:
							setMessage("Something went wrong.");
							break;
					}
				});
		}
	}, [stripe, onSuccess]);

	const onSubmit = form.handleSubmit(async (values) => {
		if (!stripe || !elements) return;

		const parsed = checkoutEmailSchema.safeParse(values);
		if (!parsed.success) {
			const first = parsed.error.issues[0];
			const message =
				first && typeof first.message === "string"
					? first.message
					: "Please enter a valid email address.";
			form.setError("email", { message });
			return;
		}

		setIsProcessing(true);
		// Email is used for Stripe receipt and for order confirmation notification
		// (webhook reads charge.billing_details.email and sends the confirmation email).
		const email = parsed.data.email.trim();

		// Collect shipping address from the AddressElement so it shows
		// on the PaymentIntent / Charge in the Stripe dashboard.
		const addressElement = elements.getElement(AddressElement);

		type ShippingForConfirm = {
			name: string;
			phone?: string;
			address: {
				line1: string;
				line2?: string;
				city?: string;
				state?: string;
				postal_code?: string;
				country?: string;
			};
		} | null;

		let shipping: ShippingForConfirm = null;

		if (addressElement) {
			const { value } = await addressElement.getValue();

			shipping = {
				name: value.name ?? "",
				phone: value.phone ?? undefined,
				address: {
					line1: value.address.line1 ?? "",
					line2: value.address.line2 ?? undefined,
					city: value.address.city ?? undefined,
					state: value.address.state ?? undefined,
					postal_code: value.address.postal_code ?? undefined,
					country: value.address.country ?? undefined,
				},
			};
		}

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/payment/success`,
				receipt_email: email,
				payment_method_data: {
					billing_details: {
						email, // Required for order confirmation email (webhook uses this)
					},
				},
				...(shipping ? { shipping } : {}),
			},
		});

		if (error) {
			if (error.type === "card_error" || error.type === "validation_error") {
				setMessage(error.message || "An error occurred");
				onError(error.message || "An error occurred");
			} else {
				setMessage("An unexpected error occurred.");
				onError("An unexpected error occurred.");
			}
		} else {
			setMessage("Payment succeeded!");
			onSuccess();
		}

		setIsProcessing(false);
	});

	return (
		<form
			className="space-y-6"
			id="payment-form"
			noValidate
			onSubmit={onSubmit}
		>
			<Field data-invalid={!!form.formState.errors.email}>
				<Controller
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<>
							<FieldLabel htmlFor="checkout-email">Email address</FieldLabel>
							<FieldContent>
								<Input
									{...field}
									aria-invalid={!!fieldState.error}
									autoComplete="email"
									disabled={isProcessing}
									id="checkout-email"
									placeholder="you@example.com"
									type="email"
								/>
								<FieldError
									errors={fieldState.error ? [fieldState.error] : undefined}
								/>
							</FieldContent>
						</>
					)}
				/>
			</Field>

			<AddressElement
				options={{
					mode: "shipping",
					allowedCountries: ["GB"],
				}}
			/>

			<PaymentElement
				options={{
					layout: "tabs",
					fields: {
						billingDetails: "auto",
					},
				}}
			/>

			<Button
				className="w-full"
				disabled={isProcessing || !stripe || !elements}
				type="submit"
			>
				{isProcessing ? "Processing..." : "Pay now"}
			</Button>

			{message && (
				<div
					className={`text-sm ${message.includes("succeeded") ? "text-green-600" : "text-red-600"}`}
				>
					{message}
				</div>
			)}
		</form>
	);
}

interface StripeElementsProps {
	clientSecret: string;
	onSuccess: () => void;
	onError: (error: string) => void;
}

export default function StripeElements({
	clientSecret,
	onSuccess,
	onError,
}: StripeElementsProps) {
	const options = {
		clientSecret,
		appearance: {
			theme: "stripe" as const,
			variables: {
				colorPrimary: "#000000",
				colorBackground: "#ffffff",
				colorText: "#000000",
				colorDanger: "#ef4444",
				fontFamily: "system-ui, sans-serif",
				spacingUnit: "4px",
				borderRadius: "8px",
			},
		},
	};

	return (
		<Elements key={clientSecret} options={options} stripe={stripePromise}>
			<CheckoutForm onError={onError} onSuccess={onSuccess} />
		</Elements>
	);
}

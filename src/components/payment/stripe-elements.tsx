"use client";

import React, { useEffect, useState } from "react";

import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessing(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/payment/success`,
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
			// Payment completed without redirect (e.g. card without 3DS)
			setMessage("Payment succeeded!");
			onSuccess();
		}

		setIsProcessing(false);
	};

	return (
		<form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement
				options={{
					layout: "tabs",
				}}
			/>

			<button
				className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isProcessing || !stripe || !elements}
				type="submit"
			>
				{isProcessing ? "Processing..." : "Pay now"}
			</button>

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

"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

import { createPaymentIntent as createPaymentIntentAction } from "@/app/actions/stripe";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentContextType {
	isProcessing: boolean;
	error: string | null;
	createPaymentIntent: (amount: number) => Promise<string | null>;
	clearError: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createPaymentIntent = async (
		amount: number
	): Promise<string | null> => {
		setIsProcessing(true);
		setError(null);

		try {
			const { clientSecret, error: backendError } =
				await createPaymentIntentAction(amount);

			if (backendError) {
				throw new Error(backendError);
			}

			return clientSecret;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return null;
		} finally {
			setIsProcessing(false);
		}
	};

	const clearError = () => setError(null);

	return (
		<PaymentContext.Provider
			value={{
				isProcessing,
				error,
				createPaymentIntent,
				clearError,
			}}
		>
			{children}
		</PaymentContext.Provider>
	);
}

export function usePayment() {
	const context = useContext(PaymentContext);
	if (context === undefined) {
		throw new Error("usePayment must be used within a PaymentProvider");
	}
	return context;
}

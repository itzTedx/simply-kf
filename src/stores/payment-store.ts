import { create } from "zustand";

import { createPaymentIntent as createPaymentIntentAction } from "@/modules/checkout/actions";

interface CheckoutItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	size?: string;
}

interface PaymentStore {
	isProcessing: boolean;
	error: string | null;
	createPaymentIntent: (
		amount: number,
		items: CheckoutItem[]
	) => Promise<string | null>;
	clearError: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
	isProcessing: false,
	error: null,

	createPaymentIntent: async (
		amount: number,
		items: CheckoutItem[]
	): Promise<string | null> => {
		set({ isProcessing: true, error: null });

		try {
			const { clientSecret, error: backendError } =
				await createPaymentIntentAction(amount, items);

			if (backendError) {
				throw new Error(backendError);
			}

			return clientSecret;
		} catch (err) {
			set({ error: err instanceof Error ? err.message : "An error occurred" });
			return null;
		} finally {
			set({ isProcessing: false });
		}
	},

	clearError: () => set({ error: null }),
}));

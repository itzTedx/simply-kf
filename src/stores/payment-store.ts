import { create } from "zustand";

import { createPaymentIntent as createPaymentIntentAction } from "@/app/actions/stripe";

interface PaymentStore {
	isProcessing: boolean;
	error: string | null;
	createPaymentIntent: (amount: number) => Promise<string | null>;
	clearError: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
	isProcessing: false,
	error: null,

	createPaymentIntent: async (amount: number): Promise<string | null> => {
		set({ isProcessing: true, error: null });

		try {
			const { clientSecret, error: backendError } =
				await createPaymentIntentAction(amount);

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

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Payment Canceled",
	description: "Your payment was canceled. No charges were made. Return to shop to try again.",
	robots: { index: false, follow: false },
};

export default function PaymentCanceledLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}

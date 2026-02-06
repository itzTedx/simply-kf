import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Payment Successful",
	description:
		"Thank you for your purchase. Your order has been processed successfully.",
	robots: { index: false, follow: false },
};

export default function PaymentSuccessLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}

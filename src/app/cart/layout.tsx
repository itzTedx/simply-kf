import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Shopping Cart",
	description: "Review your SIMPLY KF cart and proceed to secure checkout.",
	robots: { index: false, follow: true },
};

export default function CartLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}

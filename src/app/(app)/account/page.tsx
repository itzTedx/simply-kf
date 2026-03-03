import type { Metadata } from "next";

import { AccountOrders } from "@/components/account/account-orders";

export const metadata: Metadata = {
	title: "Account – Manage Your Orders",
	description:
		"View your Simply KF order details, status, and delivery information using your order number and email.",
};

export default function AccountPage() {
	return <AccountOrders />;
}

"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { signOut } from "@/lib/auth/client";

export default function CustomLogout() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function handleLogout() {
		startTransition(async () => {
			try {
				await signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push("/admin/");
						},
					},
				});
			} catch (error) {
				console.error("[CustomLogout] Failed to sign out", error);
			}
		});
	}

	return (
		<button
			className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
			disabled={isPending}
			onClick={handleLogout}
			type="button"
		>
			{isPending ? "Signing out…" : "Sign out"}
		</button>
	);
}

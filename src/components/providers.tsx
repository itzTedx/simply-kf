"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import OpenPanelProvider from "@/lib/openpanel";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<OpenPanelProvider>
			<NuqsAdapter>{children}</NuqsAdapter>
		</OpenPanelProvider>
	);
};

export default Providers;

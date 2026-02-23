"use client";

import { useRowLabel } from "@payloadcms/ui";

export const SizeRowLabel = () => {
	const { data, rowNumber } = useRowLabel<{
		size?: string;
		stock?: number;
	}>();
	const label = data?.size || `Size ${rowNumber}`;
	const stockInfo =
		data?.stock !== undefined ? ` (${data.stock} in stock)` : "";
	return (
		<span>
			{label}
			{stockInfo}
		</span>
	);
};

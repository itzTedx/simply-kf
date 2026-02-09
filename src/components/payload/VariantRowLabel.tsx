"use client";

import { useRowLabel } from "@payloadcms/ui";

export const VariantRowLabel = () => {
	const { data, rowNumber } = useRowLabel<{
		color?: string;
		size?: string;
	}>();
	const parts = [data?.color, data?.size].filter(Boolean);
	const label = parts.length > 0 ? parts.join(" · ") : `Variant ${rowNumber}`;
	return <span>{label}</span>;
};

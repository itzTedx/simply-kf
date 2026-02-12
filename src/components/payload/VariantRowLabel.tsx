"use client";

import { useRowLabel } from "@payloadcms/ui";

export const VariantRowLabel = () => {
	const { data, rowNumber } = useRowLabel<{
		color?: string;
	}>();
	const label = data?.color || `Color ${rowNumber}`;
	return <span>{label}</span>;
};

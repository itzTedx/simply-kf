export const SHIPPING_FEE_GBP =
	Number(process.env.NEXT_PUBLIC_SHIPPING_FEE_GBP) || 4.5;

export const FREE_SHIPPING_THRESHOLD_GBP =
	Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_GBP) || 30;

export const FREE_SHIPPING_ENABLED =
	(process.env.NEXT_PUBLIC_ENABLE_FREE_SHIPPING ?? "true")
		.toLowerCase()
		.trim() !== "false";

export interface ShippingGlobalConfig {
	baseFee: number;
	freeShippingThreshold: number;
	enableFreeShipping: boolean;
}

export const DEFAULT_SHIPPING_CONFIG: ShippingGlobalConfig = {
	baseFee: SHIPPING_FEE_GBP,
	freeShippingThreshold: FREE_SHIPPING_THRESHOLD_GBP,
	enableFreeShipping: FREE_SHIPPING_ENABLED,
};

export interface ShippingOverrideFields {
	shippingFeeOverride?: number | null;
}

export interface ShippingLineInput extends ShippingOverrideFields {
	price: number;
	quantity: number;
}

function resolveEffectiveConfig(
	items: ShippingOverrideFields[],
	globalConfig: ShippingGlobalConfig
): ShippingGlobalConfig {
	let effectiveFee = globalConfig.baseFee;

	for (const item of items) {
		if (
			item.shippingFeeOverride != null &&
			!Number.isNaN(item.shippingFeeOverride)
		) {
			effectiveFee = item.shippingFeeOverride;
		}
	}

	return {
		baseFee: effectiveFee,
		freeShippingThreshold: globalConfig.freeShippingThreshold,
		enableFreeShipping: globalConfig.enableFreeShipping,
	};
}

/**
 * Calculate shipping fee based on cart items and a global configuration.
 * - Defaults to a flat fee with free shipping above a threshold.
 * - Any product with override fields can adjust the fee/threshold for the whole order.
 */
export function calculateOrderTotalsForItems(
	items: ShippingLineInput[],
	globalConfig: ShippingGlobalConfig = DEFAULT_SHIPPING_CONFIG
): { subtotal: number; shipping: number; total: number } {
	const hasItems = items.length > 0;

	if (!hasItems) {
		return { subtotal: 0, shipping: 0, total: 0 };
	}

	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const effectiveConfig = resolveEffectiveConfig(items, globalConfig);

	const shipping =
		effectiveConfig.enableFreeShipping &&
		subtotal >= effectiveConfig.freeShippingThreshold
			? 0
			: effectiveConfig.baseFee;

	const total = subtotal + shipping;

	return { subtotal, shipping, total };
}

// Backwards-compatible helpers used in some parts of the app.
export function calculateShipping(subtotal: number, hasItems: boolean): number {
	if (!hasItems) return 0;

	if (
		DEFAULT_SHIPPING_CONFIG.enableFreeShipping &&
		subtotal >= DEFAULT_SHIPPING_CONFIG.freeShippingThreshold
	) {
		return 0;
	}

	return DEFAULT_SHIPPING_CONFIG.baseFee;
}

export function calculateOrderTotal(
	subtotal: number,
	hasItems: boolean
): { shipping: number; total: number } {
	const shipping = calculateShipping(subtotal, hasItems);
	const total = hasItems ? subtotal + shipping : 0;

	return { shipping, total };
}

import type { GlobalConfig } from "payload";

export const ShippingSettings: GlobalConfig = {
	slug: "shipping-settings",
	label: "Shipping Settings",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "defaultShippingFee",
			label: "Default shipping fee (£)",
			type: "number",
			required: true,
			min: 0,
			defaultValue: 4.5,
			admin: {
				description:
					"Base shipping fee applied to orders (can be overridden per product).",
				width: "50%",
			},
		},
		{
			name: "enableFreeShipping",
			label: "Enable free shipping threshold",
			type: "checkbox",
			defaultValue: true,
			admin: {
				description:
					"When enabled, orders above the threshold below will have free shipping.",
				width: "50%",
			},
		},
		{
			name: "freeShippingThreshold",
			label: "Free shipping threshold (£)",
			type: "number",
			required: true,
			min: 0,
			defaultValue: 30,
			admin: {
				description:
					"Order subtotal required for free shipping when enabled (in £).",
				width: "50%",
				condition: (data) => Boolean(data?.enableFreeShipping),
			},
		},
	],
};

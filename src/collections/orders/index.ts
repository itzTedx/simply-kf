import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
	slug: "orders",
	admin: {
		useAsTitle: "orderNumber",
		defaultColumns: [
			"orderNumber",
			"status",
			"customer",
			"total",
			"createdAt",
		],
		group: "Shop",
		description: "Customer orders from the shop",
	},
	access: {
		// Only admins can read/manage orders
		read: ({ req }) => {
			if (req.user) return true;
			return false;
		},
		create: () => true, // Allow webhook to create orders
		update: ({ req }) => {
			if (req.user) return true;
			return false;
		},
		delete: ({ req }) => {
			if (req.user) return true;
			return false;
		},
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "orderNumber",
					type: "text",
					required: true,
					unique: true,
					admin: {
						readOnly: true,
						width: "50%",
					},
				},
				{
					name: "status",
					type: "select",
					required: true,
					defaultValue: "pending",
					options: [
						{ label: "Pending", value: "pending" },
						{ label: "Processing", value: "processing" },
						{ label: "Shipped", value: "shipped" },
						{ label: "Delivered", value: "delivered" },
						{ label: "Cancelled", value: "cancelled" },
						{ label: "Refunded", value: "refunded" },
					],
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Customer Info",
					fields: [
						{
							name: "customer",
							type: "group",
							admin: {
								readOnly: true,
							},
							fields: [
								{
									type: "row",
									fields: [
										{
											name: "name",
											type: "text",
											admin: {
												width: "50%",
												readOnly: true,
											},
										},
										{
											name: "email",
											type: "email",
											admin: {
												width: "50%",
												readOnly: true,
											},
										},
									],
								},
								{
									type: "row",
									fields: [
										{
											name: "phone",
											type: "text",
											admin: {
												width: "50%",
												readOnly: true,
											},
										},
									],
								},
							],
						},
						{
							name: "shippingAddress",
							type: "group",
							label: "Shipping Address",
							admin: {
								readOnly: true,
							},
							fields: [
								{
									name: "line1",
									type: "text",
									label: "Address Line 1",
									admin: {
										readOnly: true,
									},
								},
								{
									name: "line2",
									type: "text",
									label: "Address Line 2",
									admin: {
										readOnly: true,
									},
								},
								{
									type: "row",
									fields: [
										{
											name: "city",
											type: "text",
											admin: {
												width: "33%",
												readOnly: true,
											},
										},
										{
											name: "state",
											type: "text",
											label: "State / County",
											admin: {
												width: "33%",
												readOnly: true,
											},
										},
										{
											name: "postalCode",
											type: "text",
											label: "Postal Code",
											admin: {
												width: "33%",
												readOnly: true,
											},
										},
									],
								},
								{
									name: "country",
									type: "text",
									defaultValue: "United Kingdom",
									admin: {
										readOnly: true,
									},
								},
							],
						},
					],
				},
				{
					label: "Order Items",
					fields: [
						{
							name: "items",
							type: "array",
							required: true,
							admin: {
								initCollapsed: false,
								readOnly: true,
							},
							fields: [
								{
									type: "row",
									fields: [
										{
											name: "product",
											type: "relationship",
											relationTo: "products",
											admin: {
												width: "40%",
												readOnly: true,
											},
										},
										{
											name: "productName",
											type: "text",
											label: "Product Name",
											admin: {
												width: "60%",
												readOnly: true,
												description:
													"Stored separately in case product is deleted",
											},
										},
									],
								},
								{
									type: "row",
									fields: [
										{
											name: "color",
											type: "text",
											admin: {
												width: "25%",
												readOnly: true,
											},
										},
										{
											name: "size",
											type: "text",
											admin: {
												width: "25%",
												readOnly: true,
											},
										},
										{
											name: "quantity",
											type: "number",
											required: true,
											min: 1,
											admin: {
												width: "25%",
												readOnly: true,
											},
										},
										{
											name: "price",
											type: "number",
											required: true,
											min: 0,
											admin: {
												width: "25%",
												readOnly: true,
												description: "Price per item in £",
											},
										},
									],
								},
							],
						},
					],
				},
				{
					label: "Payment",
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "subtotal",
									type: "number",
									min: 0,
									admin: {
										width: "33%",
										readOnly: true,
										description: "Subtotal in £",
									},
								},
								{
									name: "shipping",
									type: "number",
									min: 0,
									defaultValue: 0,
									admin: {
										width: "33%",
										readOnly: true,
										description: "Shipping cost in £",
									},
								},
								{
									name: "total",
									type: "number",
									required: true,
									min: 0,
									admin: {
										width: "33%",
										readOnly: true,
										description: "Total in £",
									},
								},
							],
						},
						{
							name: "stripePaymentIntentId",
							type: "text",
							label: "Stripe Payment Intent ID",
							admin: {
								readOnly: true,
								description: "Reference to Stripe payment",
							},
						},
						{
							name: "paymentStatus",
							type: "select",
							defaultValue: "paid",
							options: [
								{ label: "Paid", value: "paid" },
								{ label: "Pending", value: "pending" },
								{ label: "Failed", value: "failed" },
								{ label: "Refunded", value: "refunded" },
							],
							admin: {
								readOnly: true,
							},
						},
						{
							name: "paidAt",
							type: "date",
							admin: {
								readOnly: true,
								date: {
									pickerAppearance: "dayAndTime",
								},
							},
						},
					],
				},
				{
					label: "Notes",
					fields: [
						{
							name: "notes",
							type: "textarea",
							admin: {
								description:
									"Internal notes about this order (not visible to customer)",
							},
						},
						{
							name: "trackingNumber",
							type: "text",
							label: "Tracking Number",
							admin: {
								description: "Shipping tracking number",
							},
						},
						{
							name: "trackingUrl",
							type: "text",
							label: "Tracking URL",
							admin: {
								description: "Link to track the shipment",
							},
						},
					],
				},
			],
		},
	],
	// No hooks needed - all order data is set by webhook and read-only
	timestamps: true,
};

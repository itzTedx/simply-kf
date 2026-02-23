import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

export interface OrderConfirmationEmailProps {
	customerFirstName: string;
	orderNumber: string;
	orderDate: string;
	paymentMethod: string;
	orderItems: {
		name: string;
		variant: string;
		quantity: string;
		price: string;
		lineTotal: string;
	}[];
	orderSubtotal: string;
	orderShipping: string;
	orderDiscount: string;
	orderTotal: string;
	shippingName: string;
	shippingAddressLine1: string;
	shippingAddressLine2: string;
	shippingCity: string;
	shippingPostcode: string;
	shippingCountry: string;
	shippingMethod: string;
	estimatedDeliveryDate: string;
	orderUrl: string;

	supportEmail: string;
	instagramUrl: string;
	currentYear: string;
}

const OrderConfirmationEmail = (props: OrderConfirmationEmailProps) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Preview>
					Thank you for your order {props.orderNumber} - Simply KF
				</Preview>
				<Body className="bg-[#f6f5f3] py-[40px] font-sans">
					<Container className="mx-auto max-w-[600px] bg-white">
						{/* Header */}
						<Section className="bg-[#f5f2ed] px-[32px] py-[24px]">
							<Img
								alt="Simply KF"
								className="h-auto w-[60px]"
								src="https://di867tnz6fwga.cloudfront.net/brand-kits/453a191a-fef2-4ba6-88fe-b9e7a16650cd/primary/bf36a120-916a-4bc5-ad67-543b2b9f4bd2.png"
							/>
							<Text className="m-0 mt-[8px] text-[#201f1d] text-[14px] leading-[20px]">
								Elevated modest wear designed in Dubai. Exclusively for the UK.
							</Text>
						</Section>

						<Hr className="my-0 border-[#f5f2ed] border-solid" />

						{/* Thank You Message */}
						<Section className="px-[32px] py-[32px] text-center">
							<Heading className="m-0 mb-[16px] font-bold text-[#201f1d] text-[28px] leading-[36px]">
								Thank you, {props.customerFirstName}!
							</Heading>
							<Text className="m-0 mb-[16px] text-[#201f1d] text-[18px] leading-[26px]">
								Your order has been confirmed and we're preparing it with care.
							</Text>
							<Text className="m-0 text-[#201f1d] text-[16px] leading-[24px]">
								Each piece is thoughtfully crafted in Dubai, designed to be
								worn, lived in, and loved for years to come.
							</Text>
						</Section>

						<Hr className="my-0 border-[#f5f2ed] border-solid" />

						{/* Order Details */}
						<Section className="px-[32px] py-[32px]">
							<Heading className="m-0 mb-[24px] font-bold text-[#201f1d] text-[20px] leading-[28px]">
								Order Confirmation
							</Heading>

							<Row className="mb-[24px]">
								<Column>
									<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
										<strong>Order Number:</strong> {props.orderNumber}
									</Text>
									<Text className="m-0 mt-[8px] text-[#201f1d] text-[14px] leading-[20px]">
										<strong>Order Date:</strong> {props.orderDate}
									</Text>
									<Text className="m-0 mt-[8px] text-[#201f1d] text-[14px] leading-[20px]">
										<strong>Payment Method:</strong> {props.paymentMethod}
									</Text>
								</Column>
							</Row>

							{/* Order Items */}
							<div className="mb-[24px] rounded-[8px] border border-[#f5f2ed] border-solid p-[16px]">
								{props.orderItems?.map((item, index) => (
									<div
										className={
											index > 0
												? "mt-[16px] border-[#f5f2ed] border-t border-solid pt-[16px]"
												: ""
										}
										key={item.name}
									>
										<Row>
											<Column className="w-[70%]">
												<Text className="m-0 font-semibold text-[#201f1d] text-[14px] leading-[20px]">
													{item.name}
												</Text>
												<Text className="m-0 mt-[4px] text-[#201f1d] text-[12px] leading-[16px]">
													{item.variant} • Qty: {item.quantity}
												</Text>
											</Column>
											<Column className="w-[30%] text-right">
												<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
													£{item.price}
												</Text>
												<Text className="m-0 mt-[4px] font-semibold text-[#201f1d] text-[14px] leading-[20px]">
													£{item.lineTotal}
												</Text>
											</Column>
										</Row>
									</div>
								))}
							</div>

							{/* Order Totals */}
							<div className="border-[#f5f2ed] border-t border-solid pt-[16px]">
								<Row className="mb-[8px]">
									<Column className="w-[70%]">
										<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
											Subtotal
										</Text>
									</Column>
									<Column className="w-[30%] text-right">
										<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
											£{props.orderSubtotal}
										</Text>
									</Column>
								</Row>
								<Row className="mb-[8px]">
									<Column className="w-[70%]">
										<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
											Shipping
										</Text>
									</Column>
									<Column className="w-[30%] text-right">
										<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
											£{props.orderShipping}
										</Text>
									</Column>
								</Row>
								{props.orderDiscount && (
									<Row className="mb-[8px]">
										<Column className="w-[70%]">
											<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
												Discount
											</Text>
										</Column>
										<Column className="w-[30%] text-right">
											<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
												-£{props.orderDiscount}
											</Text>
										</Column>
									</Row>
								)}
								<Hr className="my-[12px] border-[#f5f2ed] border-solid" />
								<Row>
									<Column className="w-[70%]">
										<Text className="m-0 font-bold text-[#201f1d] text-[16px] leading-[24px]">
											Total Paid
										</Text>
									</Column>
									<Column className="w-[30%] text-right">
										<Text className="m-0 font-bold text-[#201f1d] text-[16px] leading-[24px]">
											£{props.orderTotal}
										</Text>
									</Column>
								</Row>
							</div>
						</Section>

						<Hr className="my-0 border-[#f5f2ed] border-solid" />

						{/* Shipping Information */}
						<Section className="px-[32px] py-[32px]">
							<Heading className="m-0 mb-[24px] font-bold text-[#201f1d] text-[20px] leading-[28px]">
								Delivery Information
							</Heading>

							<div className="mb-[16px] rounded-[8px] bg-[#f5f2ed] p-[16px]">
								<Text className="m-0 mb-[8px] font-semibold text-[#201f1d] text-[14px] leading-[20px]">
									Shipping Address
								</Text>
								<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
									{props.shippingName}
									<br />
									{props.shippingAddressLine1}
									<br />
									{props.shippingAddressLine2 && (
										<>
											{props.shippingAddressLine2}
											<br />
										</>
									)}
									{props.shippingCity}, {props.shippingPostcode}
									<br />
									{props.shippingCountry}
								</Text>
							</div>

							<Text className="m-0 mb-[8px] text-[#201f1d] text-[14px] leading-[20px]">
								<strong>Delivery Method:</strong> {props.shippingMethod}
							</Text>
							<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
								<strong>Estimated Delivery:</strong>{" "}
								{props.estimatedDeliveryDate}
							</Text>
						</Section>

						<Hr className="my-0 border-[#f5f2ed] border-solid" />

						{/* What Happens Next */}
						<Section className="px-[32px] py-[32px]">
							<Heading className="m-0 mb-[24px] font-bold text-[#201f1d] text-[20px] leading-[28px]">
								What Happens Next
							</Heading>

							<Text className="m-0 mb-[16px] text-[#201f1d] text-[16px] leading-[24px]">
								Your abayas are now being prepared by our skilled team in Dubai.
								We take pride in our quality craftsmanship and precise
								tailoring, ensuring each piece meets our standards of enduring
								design.
							</Text>

							<Text className="m-0 mb-[24px] text-[#201f1d] text-[16px] leading-[24px]">
								You'll receive a shipping confirmation email with tracking
								details once your order is dispatched. We're committed to
								delivering pieces that will become cherished parts of your
								modest wardrobe.
							</Text>

							<div className="rounded-[8px] bg-[#f5f2ed] p-[20px] text-center">
								<Button
									className="box-border rounded-[6px] bg-[#F9AE48] px-[24px] py-[12px] font-semibold text-[14px] text-white no-underline"
									href={props.orderUrl}
								>
									View Your Order
								</Button>
								<Text className="m-0 mt-[12px] text-[#201f1d] text-[14px] leading-[20px]">
									<Link
										className="text-[#F9AE48] no-underline"
										href="https://simplykf.com/account"
									>
										Manage Your Account
									</Link>
								</Text>
							</div>
						</Section>

						<Hr className="my-0 border-[#f5f2ed] border-solid" />

						{/* Care Instructions */}
						<Section className="px-[32px] py-[32px]">
							<Heading className="m-0 mb-[16px] font-bold text-[#201f1d] text-[18px] leading-[24px]">
								Caring for Your Abayas
							</Heading>
							<Text className="m-0 mb-[12px] text-[#201f1d] text-[16px] leading-[24px]">
								To ensure your Simply KF pieces maintain their quality and
								elegance:
							</Text>
							<Text className="m-0 mb-[8px] text-[#201f1d] text-[14px] leading-[20px]">
								• Follow the care label instructions for each garment
							</Text>
							<Text className="m-0 mb-[8px] text-[#201f1d] text-[14px] leading-[20px]">
								• Store on hangers to maintain the silhouette
							</Text>
							<Text className="m-0 mb-[8px] text-[#201f1d] text-[14px] leading-[20px]">
								• Steam gently to remove wrinkles when needed
							</Text>
							<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
								• Professional dry cleaning recommended for occasion pieces
							</Text>
						</Section>

						<Hr className="my-0 border-[#f5f2ed] border-solid" />

						{/* Support */}
						<Section className="px-[32px] py-[32px]">
							<Heading className="m-0 mb-[16px] font-bold text-[#201f1d] text-[18px] leading-[24px]">
								We're Here to Help
							</Heading>
							<Text className="m-0 mb-[16px] text-[#201f1d] text-[16px] leading-[24px]">
								If you have any questions about your order or need assistance,
								our UK-focused customer support team is ready to help you.
							</Text>
							<Text className="m-0 mb-[8px] text-[#201f1d] text-[14px] leading-[20px]">
								<strong>Email:</strong>{" "}
								<Link
									className="text-[#F9AE48] no-underline"
									href={`mailto:${props.supportEmail}`}
								>
									{props.supportEmail}
								</Link>
							</Text>
							<Text className="m-0 mb-[16px] text-[#201f1d] text-[14px] leading-[20px]">
								<strong>Instagram:</strong>{" "}
								<Link
									className="text-[#F9AE48] no-underline"
									href={props.instagramUrl}
								>
									@simplykfabayas
								</Link>
							</Text>

							<Text className="m-0 text-[#201f1d] text-[16px] leading-[24px]">
								Thank you for choosing Simply KF. We're honored to be part of
								your modest fashion journey.
							</Text>
						</Section>

						{/* Footer */}
						<Section className="bg-[#f5f2ed] px-[32px] py-[24px]">
							<Text className="m-0 mb-[16px] text-center text-[#201f1d] text-[12px] leading-[16px]">
								© {props.currentYear} SIMPLY KF. All rights reserved.
							</Text>

							<div className="mb-[16px] text-center">
								<Link
									className="mx-[8px] text-[#F9AE48] text-[12px] no-underline"
									href="https://simplykf.com"
								>
									Shop
								</Link>
								<Link
									className="mx-[8px] text-[#F9AE48] text-[12px] no-underline"
									href="https://simplykf.com/about"
								>
									About
								</Link>
								<Link
									className="mx-[8px] text-[#F9AE48] text-[12px] no-underline"
									href="https://simplykf.com/contact"
								>
									Contact
								</Link>
								<Link
									className="mx-[8px] text-[#F9AE48] text-[12px] no-underline"
									href="https://simplykf.com/returns"
								>
									Returns
								</Link>
							</div>

							<Text className="m-0 text-center text-[#201f1d] text-[10px] leading-[14px]">
								You're receiving this email because you placed an order at
								Simply KF.
							</Text>

							<Text className="m-0 mt-[8px] text-center text-[#201f1d] text-[10px] leading-[14px]">
								This email may contain confidential or promotional content for
								the intended recipient. Product info may change without notice.
								By reading, you agree to Simply KF's Terms and Policies. If
								received in error, please delete and inform us.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

OrderConfirmationEmail.PreviewProps = {
	customerFirstName: "Amira",
	orderNumber: "SK-2024-001234",
	orderDate: "23rd February 2024",
	paymentMethod: "Visa ending in 4242",
	orderItems: [
		{
			name: "Classic Everyday Abaya",
			variant: "Black, Size M",
			quantity: "1",
			price: "89.00",
			lineTotal: "89.00",
		},
		{
			name: "Occasion Kaftan",
			variant: "Navy, Size L",
			quantity: "1",
			price: "125.00",
			lineTotal: "125.00",
		},
	],
	orderSubtotal: "214.00",
	orderShipping: "4.99",
	orderDiscount: "10.00",
	orderTotal: "208.99",
	shippingName: "Amira Hassan",
	shippingAddressLine1: "45 Queensway Gardens",
	shippingAddressLine2: "Apartment 3B",
	shippingCity: "London",
	shippingPostcode: "W2 4QH",
	shippingCountry: "United Kingdom",
	shippingMethod: "Standard UK Delivery",
	estimatedDeliveryDate: "28th February 2024",
	orderUrl: "https://simplykf.com/orders/SK-2024-001234",
	supportEmail: "hello@simplykf.com",
	instagramUrl: "https://instagram.com/simplykfabayas",
	currentYear: "2024",
};

export default OrderConfirmationEmail;

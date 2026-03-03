import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

type OrderStatus = "shipped" | "delivered" | "cancelled" | "refunded" | string;

interface OrderStatusEmailProps {
	customerName?: string;
	orderNumber: string;
	status: OrderStatus;
	trackingNumber?: string;
	trackingUrl?: string;
}

const statusHeadlineMap: Record<OrderStatus, string> = {
	shipped: "Your order is on its way",
	delivered: "Your order has been delivered",
	cancelled: "Your order has been cancelled",
	refunded: "Your order has been refunded",
};

const statusBodyMap: Record<OrderStatus, string> = {
	shipped:
		"We're happy to let you know that your order has been shipped and is on its way to you.",
	delivered:
		"Our records show that your order has been delivered. We hope you love your purchase.",
	cancelled:
		"Your order has been cancelled. If this was unexpected, please contact us as soon as possible.",
	refunded:
		"Your order has been refunded. Depending on your bank, it may take a few business days for the funds to appear in your account.",
};

const getStatusHeadline = (status: OrderStatus) => {
	return statusHeadlineMap[status] ?? "Your order status has been updated";
};

const getStatusBody = (status: OrderStatus) => {
	return (
		statusBodyMap[status] ??
		"Your order status has recently been updated. You can find the latest details below."
	);
};

const OrderStatusEmail = ({
	customerName,
	orderNumber,
	status,
	trackingNumber,
	trackingUrl,
}: OrderStatusEmailProps) => {
	const headline = getStatusHeadline(status);
	const body = getStatusBody(status);

	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Preview>{headline}</Preview>
				<Body
					className="py-[40px] font-sans"
					style={{ backgroundColor: "#FAF9F6" }}
				>
					<Container className="mx-auto max-w-[600px] px-[20px]">
						{/* Main Content */}
						<Section
							className="rounded-[12px] px-[32px] py-[32px] shadow-sm"
							style={{ backgroundColor: "#FFF" }}
						>
							<Heading
								className="mb-[16px] text-center font-bold text-[24px]"
								style={{ color: "#18131F" }}
							>
								{headline}
							</Heading>

							<Text
								className="mb-[16px] text-[14px]"
								style={{ color: "#18131F" }}
							>
								Hi {customerName || "there"},
							</Text>

							<Text
								className="mb-[16px] text-[14px] leading-relaxed"
								style={{ color: "#18131F" }}
							>
								{body}
							</Text>

							<Section className="my-[24px] rounded-[8px] border border-gray-200 p-[16px]">
								<Text
									className="mb-[8px] font-semibold text-[12px] uppercase tracking-wide"
									style={{ color: "#7A33D6" }}
								>
									Order details
								</Text>
								<Text className="m-0 text-[14px]" style={{ color: "#18131F" }}>
									Order number: <strong>{orderNumber}</strong>
								</Text>
								<Text className="m-0 text-[14px]" style={{ color: "#18131F" }}>
									Current status:{" "}
									<strong>
										{status[0]?.toUpperCase()}
										{status.slice(1)}
									</strong>
								</Text>

								{(trackingNumber || trackingUrl) && (
									<>
										<Hr className="my-[12px] border-gray-200" />
										{trackingNumber && (
											<Text
												className="m-0 text-[14px]"
												style={{ color: "#18131F" }}
											>
												Tracking number: <strong>{trackingNumber}</strong>
											</Text>
										)}
										{trackingUrl && (
											<Text
												className="m-0 text-[14px]"
												style={{ color: "#18131F" }}
											>
												Track your order:{" "}
												<Link
													className="text-[14px]"
													href={trackingUrl}
													style={{ color: "#7A33D6" }}
												>
													View tracking
												</Link>
											</Text>
										)}
									</>
								)}
							</Section>

							<Text
								className="mt-[8px] text-[13px]"
								style={{ color: "#736D7B" }}
							>
								Thank you for shopping with us.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

OrderStatusEmail.PreviewProps = {
	customerName: "Sarah",
	orderNumber: "KF-12345",
	status: "shipped",
	trackingNumber: "TRACK123456789",
	trackingUrl: "https://example.com/track/123456789",
};

export default OrderStatusEmail;

export const OrderStatusPlainText = ({
	customerName,
	orderNumber,
	status,
	trackingNumber,
	trackingUrl,
}: OrderStatusEmailProps) => {
	const headline = getStatusHeadline(status);
	const body = getStatusBody(status);

	const lines = [
		headline,
		"",
		`Hi ${customerName || "there"},`,
		"",
		body,
		"",
		`Order number: ${orderNumber}`,
		`Current status: ${status}`,
	];

	if (trackingNumber) {
		lines.push(`Tracking number: ${trackingNumber}`);
	}

	if (trackingUrl) {
		lines.push(`Track your order: ${trackingUrl}`);
	}

	lines.push("", "Thank you for shopping with us.");

	return lines.join("\n");
};

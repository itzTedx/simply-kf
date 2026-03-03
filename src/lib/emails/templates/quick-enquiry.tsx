import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface InquiryProps {
	name: string;
	email?: string;
	phone?: string;
	message?: string;
}

const InquiryReact = ({ name, email, phone, message }: InquiryProps) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Preview>New inquiry received from {name}</Preview>
				<Body
					className="py-[40px] font-sans"
					style={{ backgroundColor: "#FAF9F6" }}
				>
					<Container className="mx-auto max-w-[600px] px-[20px]">
						{/* Header Section with Logo */}
						<Section
							className="mb-0 rounded-t-[12px] px-[40px] py-[32px] shadow-sm"
							style={{ backgroundColor: "#FFF" }}
						>
							<div className="text-center">
								<Link href="https://sphereitglobal.com/">
									<Img
										alt="Sphere IT Global Logo"
										className="mx-auto h-auto w-full max-w-[240px] object-cover"
										src="https://di867tnz6fwga.cloudfront.net/brand-kits/2ea57ae3-5226-427a-a27c-8c853b986006/primary/c86ddbe9-878a-45ca-bb88-c0f4f08d3b43.png"
									/>
								</Link>
							</div>
						</Section>

						{/* Main Content */}
						<Section
							className="px-[40px] pb-[32px] shadow-sm"
							style={{ backgroundColor: "#FFF" }}
						>
							<Heading
								className="text-center font-bold text-[28px]"
								style={{ color: "#341C52" }}
							>
								New Inquiry Received
							</Heading>

							<Text
								className="mb-[32px] text-center text-[12px]"
								style={{ color: "#736D7B" }}
							>
								You've received a new message through your website contact form.
								A potential client is interested in your enterprise IT solutions
								and digital transformation services.
							</Text>

							{/* Inquiry Details Card */}
							<Section
								className="rounded-[8px] border border-gray-200 p-[24px] shadow-sm"
								style={{ backgroundColor: "#FAF9F6" }}
							>
								{/* Name Field */}
								<div className="mb-[20px]">
									<Text
										className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
										style={{ color: "#7A33D6" }}
									>
										Client Name
									</Text>
									<Text
										className="m-0 font-medium text-[16px]"
										style={{ color: "#18131F" }}
									>
										{name}
									</Text>
								</div>

								<Hr className="my-[16px] border-gray-300" />

								{/* Email Field */}
								<div className="mb-[20px]">
									<Text
										className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
										style={{ color: "#7A33D6" }}
									>
										Email Address
									</Text>
									<Text
										className="m-0 font-medium text-[16px]"
										style={{ color: "#7A33D6" }}
									>
										{email}
									</Text>
								</div>

								<Hr className="my-[16px] border-gray-300" />

								{/* Phone Field */}
								<div className="mb-[20px]">
									<Text
										className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
										style={{ color: "#7A33D6" }}
									>
										Phone Number
									</Text>
									<Text
										className="m-0 font-medium text-[16px]"
										style={{ color: "#18131F" }}
									>
										{phone}
									</Text>
								</div>

								<Hr className="my-[16px] border-gray-300" />

								{/* Message Field */}
								<div>
									<Text
										className="mb-[8px] font-semibold text-[14px] uppercase tracking-wide"
										style={{ color: "#7A33D6" }}
									>
										Inquiry Details
									</Text>
									<Text
										className="m-0 whitespace-pre-wrap text-[16px] leading-relaxed"
										style={{ color: "#18131F" }}
									>
										{message}
									</Text>
								</div>
							</Section>

							<Text
								className="mt-[24px] mb-[8px] text-center text-[14px]"
								style={{ color: "#18131F" }}
							>
								This inquiry represents a potential opportunity for your
								enterprise IT services. Please respond promptly to maintain
								Sphere IT Global's reputation for excellence and reliability.
							</Text>
						</Section>

						{/* Footer */}
						<Section
							className="rounded-b-[12px] px-[40px] py-[24px] shadow-sm"
							style={{ backgroundColor: "#7A33D6" }}
						>
							<Text className="m-0 mb-[12px] text-center font-semibold text-[16px] text-white">
								Sphere IT Global — Innovating the Digital Core
							</Text>
							<Text className="m-0 mb-[8px] text-center text-[12px] text-white opacity-90">
								502, Al Nasr Plaza Offices Oud Metha, Dubai, PO Box 111574
							</Text>
							<Text className="m-0 mb-[16px] text-center text-[12px] text-white opacity-90">
								<Link
									className="text-white underline"
									href="https://sphereitglobal.com/"
								>
									sphereitglobal.com
								</Link>
							</Text>

							{/* Disclaimer */}
							<Hr className="my-[16px] border-[#A67BED]" />
							<Text className="m-0 mb-[8px] text-center text-[10px] text-white leading-relaxed opacity-75">
								This message and any attachments are confidential and intended
								only for the recipient. If you received it in error, please
								delete it and notify the sender. Any unauthorized use or
								disclosure is prohibited.
							</Text>
							<Text className="m-0 text-center text-[12px] text-white opacity-90">
								© 2025 Sphere IT Global. All rights reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

InquiryReact.PreviewProps = {
	name: "Ahmed Al-Rashid",
	email: "ahmed.rashid@example.com",
	phone: "+971 50 123 4567",
	message:
		"Hello, I'm interested in your enterprise IT services and digital transformation solutions for our growing e-commerce business. We currently have about 50 employees and are looking to modernize our infrastructure with AI-driven innovation and scalable cloud solutions. Could you please provide more information about your packages and pricing? We'd also like to schedule a consultation to discuss our specific requirements for automation and software development.",
};

export default InquiryReact;

export const InquiryPlainText = ({
	name,
	email,
	phone,
	message,
}: InquiryProps) => {
	return `New inquiry received from ${name}

    NEW INQUIRY RECEIVED

    You've received a new message through your website contact form. A potential
    client is interested in your enterprise IT solutions and digital transformation
    services.

    Client Name:
    ${name}

    --------------------------------------------------------------------------------

    Email Address:
    ${email}

    --------------------------------------------------------------------------------

    Phone Number:
    ${phone}

    --------------------------------------------------------------------------------

    Inquiry Details:

    ${message}

    --------------------------------------------------------------------------------

    Sphere IT Global — Innovating the Digital Core

    502, Al Nasr Plaza Offices Oud Metha, Dubai, PO Box 111574

    https://sphereitglobal.com/

    --------------------------------------------------------------------------------

    This message and any attachments are confidential and intended only for the
    recipient. If you received it in error, please delete it and notify the sender.
    Any unauthorized use or disclosure is prohibited.

    © 2025 Sphere IT Global. All rights reserved.`;
};

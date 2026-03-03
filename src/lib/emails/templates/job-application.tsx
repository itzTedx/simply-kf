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

interface JobApplicationProps {
	name: string;
	email: string;
	phone?: string;
	location?: string;
	department?: string;
	preferredWorkMode?: string;
	message?: string;
}

const JobApplicationEmail = ({
	name,
	email,
	phone,
	location,
	department,
	preferredWorkMode,
	message,
}: JobApplicationProps) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Preview>New Job Application: {name}</Preview>
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
								New Job Application
							</Heading>

							<Text
								className="mb-[32px] text-center text-[12px]"
								style={{ color: "#736D7B" }}
							>
								A new candidate has submitted a job application through the
								Sphere IT Global careers portal.
							</Text>

							{/* Application Details Card */}
							<Section
								className="rounded-[8px] border border-gray-200 p-[24px] shadow-sm"
								style={{ backgroundColor: "#FAF9F6" }}
							>
								{/* Name & Email Field */}
								<div className="mb-[20px]">
									<Text
										className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
										style={{ color: "#7A33D6" }}
									>
										Candidate
									</Text>
									<Text
										className="m-0 font-medium text-[16px]"
										style={{ color: "#18131F" }}
									>
										{name} ({email})
									</Text>
								</div>

								<Hr className="my-[16px] border-gray-300" />

								{/* Contact Information */}
								<div className="mb-[20px] flex">
									<div className="w-1/2">
										<Text
											className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
											style={{ color: "#7A33D6" }}
										>
											Phone
										</Text>
										<Text
											className="m-0 font-medium text-[16px]"
											style={{ color: "#18131F" }}
										>
											{phone || "N/A"}
										</Text>
									</div>
									<div className="w-1/2">
										<Text
											className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
											style={{ color: "#7A33D6" }}
										>
											Location
										</Text>
										<Text
											className="m-0 font-medium text-[16px]"
											style={{ color: "#18131F" }}
										>
											{location || "N/A"}
										</Text>
									</div>
								</div>

								<Hr className="my-[16px] border-gray-300" />

								{/* Application Specifics */}
								<div className="mb-[20px] flex">
									<div className="w-1/2">
										<Text
											className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
											style={{ color: "#7A33D6" }}
										>
											Department
										</Text>
										<Text
											className="m-0 font-medium text-[16px]"
											style={{ color: "#18131F" }}
										>
											{department || "N/A"}
										</Text>
									</div>
									<div className="w-1/2">
										<Text
											className="mb-[4px] font-semibold text-[14px] uppercase tracking-wide"
											style={{ color: "#7A33D6" }}
										>
											Work Mode
										</Text>
										<Text
											className="m-0 font-medium text-[16px]"
											style={{ color: "#18131F" }}
										>
											{preferredWorkMode || "N/A"}
										</Text>
									</div>
								</div>

								<Hr className="my-[16px] border-gray-300" />

								{/* Message Field */}
								<div>
									<Text
										className="mb-[8px] font-semibold text-[14px] uppercase tracking-wide"
										style={{ color: "#7A33D6" }}
									>
										Candidate Message
									</Text>
									<Text
										className="m-0 whitespace-pre-wrap text-[16px] leading-relaxed"
										style={{ color: "#18131F" }}
									>
										{message || "No message provided."}
									</Text>
								</div>
							</Section>

							<Text
								className="mt-[24px] mb-[8px] text-center text-[14px]"
								style={{ color: "#18131F" }}
							>
								The resume is attached to this email. Please review the
								candidate's profile and follow up accordingly.
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
								only for the recruitment team. If you received it in error,
								please delete it immediately.
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

JobApplicationEmail.PreviewProps = {
	name: "Arjun Sharma",
	email: "arjun.sharma@example.com",
	phone: "+971 50 987 6543",
	location: "Dubai, UAE",
	department: "Engineering",
	preferredWorkMode: "Hybrid",
	message:
		"I am a Senior Software Engineer with 8 years of experience in full-stack development. I am passionate about building scalable cloud-native applications and leading engineering teams. I have been following Sphere IT's growth and would love to contribute to your digital transformation projects.",
};

export default JobApplicationEmail;

export const JobApplicationPlainText = ({
	name,
	email,
	phone,
	location,
	department,
	preferredWorkMode,
	message,
}: JobApplicationProps) => {
	return `New Job Application Received: ${name}

    NEW JOB APPLICATION RECEIVED

    A new candidate has submitted a job application through the Sphere IT Global careers portal.

    Candidate Name: ${name}
    Email Address: ${email}
    Phone Number: ${phone || "N/A"}
    Location: ${location || "N/A"}
    Department: ${department || "N/A"}
    Work Mode: ${preferredWorkMode || "N/A"}

    --------------------------------------------------------------------------------

    Candidate Message:
    ${message || "No message provided."}

    --------------------------------------------------------------------------------

    The resume is attached to this email.

    Sphere IT Global — Innovating the Digital Core
    502, Al Nasr Plaza Offices Oud Metha, Dubai, PO Box 111574
    https://sphereitglobal.com/

    © 2025 Sphere IT Global. All rights reserved.`;
};

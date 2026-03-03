import {
	Body,
	Column,
	Head,
	Html,
	Img,
	Link,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface Props {
	name: string;
	designation: string;
	email: string;
	phone: string;
}

const EmailSignature = (props: Props) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Body className="m-0 bg-[#FAF9F6] p-0 font-sans">
					{/* Top Border */}
					<Section className="h-[5px] w-full bg-[#4B2681]" />

					<Section className="w-full bg-[#FFF] p-[32px]">
						{/* Main Content Row */}
						<Row>
							{/* Left Column - Contact Info */}
							<Column className="w-[60%] pr-[32px]">
								{/* Name and Title */}
								<Text className="m-0 mb-[6px] font-bold text-[#4B2681] text-[26px] leading-[30px]">
									{props.name}
								</Text>
								<Text className="m-0 mb-[4px] font-semibold text-[#44403C] text-[16px]">
									{props.designation}
								</Text>

								{/* Contact Information with Flat Icons */}
								<Row className="mb-[16px]">
									<Column className="w-[28px]">
										<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#4B2681]">
											<Text className="m-0 font-bold text-[12px] text-white">
												@
											</Text>
										</div>
									</Column>
									<Column className="pl-[12px] align-middle">
										<Link
											className="text-[#18131F] text-[14px] no-underline hover:text-[#4B2681]"
											href={`mailto:${props.email}`}
										>
											{props.email}
										</Link>
									</Column>
								</Row>

								<Row className="mb-[24px]">
									<Column className="w-[28px]">
										<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#4B2681]">
											<Text className="m-0 font-bold text-[12px] text-white">
												📞
											</Text>
										</div>
									</Column>
									<Column className="pl-[12px] align-middle">
										<Link
											className="text-[#18131F] text-[14px] no-underline hover:text-[#4B2681]"
											href={`tel:${props.phone}`}
										>
											{props.phone}
										</Link>
									</Column>
								</Row>
								<Row>
									<Column className="w-[40%]">
										<Link href="https://sphereitglobal.com/">
											<Img
												alt="Sphere IT Global"
												className="mb-[16px] h-auto w-[120px]"
												src="https://di867tnz6fwga.cloudfront.net/brand-kits/2ea57ae3-5226-427a-a27c-8c853b986006/primary/c86ddbe9-878a-45ca-bb88-c0f4f08d3b43.png"
											/>
										</Link>
									</Column>
								</Row>
							</Column>

							{/* Right Column - Logo and Branding */}
							{/* <Column className="w-[40%] text-right">
                <Link href="https://sphereitglobal.com/">
                  <Img
                    alt="Sphere IT Global"
                    className="mb-[16px] ml-auto h-auto w-[180px]"
                    src="https://di867tnz6fwga.cloudfront.net/brand-kits/2ea57ae3-5226-427a-a27c-8c853b986006/primary/c86ddbe9-878a-45ca-bb88-c0f4f08d3b43.png"
                  />
                </Link>
                <Text className="m-0 mb-[20px] font-medium text-[#4B2681] text-[14px] italic">
                  Innovating the Digital Core
                </Text>
                <Text className="m-0 mb-[8px] text-[#18131F] text-[12px] leading-[16px] opacity-70">
                  502, Al Nasr Plaza Offices Oud Metha
                  <br />
                  Dubai, PO Box 111574
                </Text>
              </Column> */}
						</Row>
					</Section>

					{/* Bottom Section - Website and Socials in Flexbox Style with Primary Color Background */}
					<Section className="w-full bg-[#4B2681] p-[24px]">
						<Row>
							{/* Left Side - Website */}
							<Column className="w-[40%] align-middle">
								<Link
									className="font-medium text-[13px] text-white no-underline"
									href="https://sphereitglobal.com/"
								>
									sphereitglobal.com
								</Link>
							</Column>

							{/* Right Side - Social Icons with White Background and Red Icons */}
							<Column className="w-[50%] text-right">
								<Row>
									<Column className="text-right">
										<Link
											className="mr-[8px] inline-block"
											href={"https://linkedin.com/company/sphereitglobal"}
										>
											<div className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-white">
												<Text className="m-0 font-bold text-[12px] text-red-600">
													in
												</Text>
											</div>
										</Link>
										<Link
											className="mr-[8px] inline-block"
											href={"https://twitter.com/sphereitglobal"}
										>
											<div className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-white">
												<Text className="m-0 font-bold text-[11px] text-red-600">
													𝕏
												</Text>
											</div>
										</Link>
										<Link
											className="mr-[8px] inline-block"
											href={"https://facebook.com/sphereitglobal"}
										>
											<div className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-white">
												<Text className="m-0 font-bold text-[12px] text-red-600">
													f
												</Text>
											</div>
										</Link>
										<Link
											className="mr-[8px] inline-block"
											href={"https://instagram.com/sphereitglobal"}
										>
											<div className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-white">
												<Text className="m-0 font-bold text-[11px] text-red-600">
													📷
												</Text>
											</div>
										</Link>
										<Link
											className="inline-block"
											href={"https://github.com/sphereitglobal"}
										>
											<div className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-white">
												<Text className="m-0 font-bold text-[11px] text-red-600">
													⚡
												</Text>
											</div>
										</Link>
									</Column>
								</Row>
							</Column>
						</Row>
					</Section>

					{/* Footer Section */}
					<Section className="w-full p-[20px]">
						<Row>
							<Column>
								<Text className="m-0 mb-[8px] text-[#18131F] text-[10px]">
									© 2025 Sphere IT Global. All rights reserved.
								</Text>
								<Text className="m-0 text-[#666666] text-[9px] leading-[12px]">
									This message and any attachments are confidential and intended
									only for the recipient. If you received it in error, please
									delete it and notify the sender. Any unauthorized use or
									disclosure is prohibited.
								</Text>
							</Column>
						</Row>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	);
};

EmailSignature.PreviewProps = {
	name: "Sarah Mitchell",
	designation: "Enterprise Solutions Director",
	email: "sarah.mitchell@sphereitglobal.com",
	phone: "+971 4 567 8901",
};

export default EmailSignature;

import type { ReactElement } from "react";

import { render } from "@react-email/components";
import nodemailer from "nodemailer";

const transporterAuth =
	process.env.SMTP_USER && process.env.SMTP_PASS
		? {
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			}
		: undefined;

export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: process.env.SMTP_PORT === "465",
	...(transporterAuth ?? {}),
	// debug: process.env.NODE_ENV === "development",
	// logger: process.env.NODE_ENV === "development",
});

type SendEmailOptions = (
	| {
			email?: string;
			subject: string;
			react: ReactElement;
			text?: string;
	  }
	| {
			email?: string;
			subject: string;
			text: string;
	  }
) & {
	attachments?: Array<{
		filename: string;
		content: Buffer | string;
		contentType?: string;
	}>;
};

export const sendEmail = async (options: SendEmailOptions) => {
	const { email, subject, text, attachments } = options;
	const react = "react" in options ? options.react : undefined;

	try {
		const result = await transporter.sendMail({
			from: `${email} <${process.env.SMTP_FROM}>`,
			to: process.env.RECEIVER_EMAIL,
			replyTo: email,
			subject,
			text,
			html: react ? await render(react) : undefined,
			attachments,
		});

		return result;
	} catch (error) {
		console.error("[DEBUG] Email send failed:", error);
		throw error;
	}
};

"use server";

export async function submitContactForm(formData: FormData) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");

	if (!name || !email || !message) {
		return { error: "Please fill in all required fields." };
	}

	// Here you would typically send an email or save to DB
	console.log("Form submitted:", {
		name,
		email,
		subject: formData.get("subject"),
		message,
	});

	return { success: "Thank you for getting in touch! We'll respond shortly." };
}

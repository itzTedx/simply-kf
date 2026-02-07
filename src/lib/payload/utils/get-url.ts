export const getServerSideURL = () => {
	if (process.env.NODE_ENV === "development") {
		return "http://localhost:3000";
	}

	if (!process.env.NEXT_PUBLIC_SITE_URL) {
		throw new Error("NEXT_PUBLIC_SITE_URL is not set");
	}
	return process.env.NEXT_PUBLIC_SITE_URL;
};

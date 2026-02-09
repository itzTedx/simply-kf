import canUseDOM from "./canUseDOM";

export const getServerSideURL = () => {
	const url = process.env.NEXT_PUBLIC_BASE_URL;

	if (!url)
		return process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://sphereitglobal.com";

	if (url.startsWith("http://") || url.startsWith("https://")) {
		return url;
	}

	return url.includes("localhost") ? `http://${url}` : `https://${url}`;
};

export const getClientSideURL = () => {
	if (canUseDOM) {
		const protocol = window.location.protocol;
		const domain = window.location.hostname;
		const port = window.location.port;

		return `${protocol}//${domain}${port ? `:${port}` : ""}`;
	}

	const url = process.env.NEXT_PUBLIC_BASE_URL;

	if (!url) return "";

	if (url.startsWith("http://") || url.startsWith("https://")) {
		return url;
	}

	return url.includes("localhost") ? `http://${url}` : `https://${url}`;
};

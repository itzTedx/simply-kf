import localFont from "next/font/local";

export const inter = localFont({
	variable: "--font-sans",
	display: "swap",
	preload: true,
	src: [
		{
			weight: "100",
			path: "./inter-display/InterDisplay-Thin.woff2",
		},
		{
			weight: "200",
			path: "./inter-display/InterDisplay-ExtraLight.woff2",
		},
		{
			weight: "300",
			path: "./inter-display/InterDisplay-Light.woff2",
		},
		{
			weight: "400",
			path: "./inter-display/InterDisplay-Regular.woff2",
		},
		{
			weight: "500",
			path: "./inter-display/InterDisplay-Medium.woff2",
		},
		{
			weight: "600",
			path: "./inter-display/InterDisplay-SemiBold.woff2",
		},
		{
			weight: "700",
			path: "./inter-display/InterDisplay-Bold.woff2",
		},
		{
			weight: "800",
			path: "./inter-display/InterDisplay-ExtraBold.woff2",
		},
		{
			weight: "900",
			path: "./inter-display/InterDisplay-Black.woff2",
		},
	],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});

export const amandine = localFont({
	variable: "--font-display",
	display: "swap",
	preload: true,
	src: [
		{
			weight: "300",
			path: "./amandine/amandine_light.otf",
		},
		{
			weight: "400",
			path: "./amandine/amandine_regular.otf",
		},
		{
			weight: "500",
			path: "./amandine/amandine_medium.otf",
		},
		{
			weight: "700",
			path: "./amandine/amandine_bold.otf",
		},
	],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});

export const malibu = localFont({
	variable: "--font-display",
	display: "swap",
	preload: true,
	src: "./malibu/malibu-regular.otf",
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});

export const helvena = localFont({
	variable: "--font-sans",
	display: "swap",
	preload: true,
	src: [
		{
			weight: "200",
			path: "./helvena/Helvena-Extralight.woff2",
		},
		{
			weight: "300",
			path: "./helvena/Helvena-Light.woff2",
		},
		{
			weight: "400",
			path: "./helvena/Helvena-Regular.woff2",
		},
		{
			weight: "500",
			path: "./helvena/Helvena-Medium.woff2",
		},
		{
			weight: "600",
			path: "./helvena/Helvena-SemiBold.woff2",
		},
		{
			weight: "700",
			path: "./helvena/Helvena-Bold.woff2",
		},
		{
			weight: "800",
			path: "./helvena/Helvena-Extrabold.woff2",
		},
		{
			weight: "900",
			path: "./helvena/Helvena-Black.woff2",
		},
	],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});

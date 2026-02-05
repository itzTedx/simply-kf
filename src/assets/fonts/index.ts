import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter_Tight({
	variable: "--font-body",
	display: "swap",
});

export const malibu = localFont({
	variable: "--font-sans",
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

export const blinka = localFont({
	variable: "--font-display",
	display: "swap",
	preload: true,
	src: "./blinka/blinka-serif.otf",
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

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Options for the slugify function
 */
interface SlugifyOptions {
	/** Character to use as separator (default: '-') */
	separator?: string;
	/** Maximum length of the slug (default: undefined - no limit) */
	maxLength?: number;
}

/**
 * Creates a URL-friendly slug from a string
 */
export function slugify(str: string, options: SlugifyOptions = {}): string {
	const { separator = "-", maxLength } = options;

	if (!str) return "";

	let result = str;

	// Convert to lowercase
	result = result.toLowerCase();

	// Convert '&' to 'and'
	result = result.replace(/&/g, "and");

	// Replace spaces, underscores, and special characters with separator
	result = result.replace(/[^\w\s-]/g, "");
	result = result.replace(/[\s_]+/g, separator);

	// Remove leading/trailing separators
	result = result.replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

	// Replace multiple consecutive separators with a single one
	result = result.replace(new RegExp(`${separator}+`, "g"), separator);

	// Apply max length if specified
	if (maxLength && result.length > maxLength) {
		result = result.substring(0, maxLength);
		// Remove trailing separator if it exists after truncation
		result = result.replace(new RegExp(`${separator}+$`, "g"), "");
	}

	return result;
}

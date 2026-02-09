"use client";

import React from "react";

import type { StaticImageData } from "next/image";
import NextImage from "next/image";

import { getMediaUrl } from "@/lib/payload/utils/getMediaUrl";
import { cn } from "@/lib/utils";

import { cssVariables } from "./css-variables";
import type { Props as MediaProps } from "./types";

const { breakpoints } = cssVariables;

export const Image: React.FC<MediaProps> = (props) => {
	const {
		alt: altFromProps,
		fill,
		height: heightFromProps,
		imgClassName,
		onClick,
		onLoad: onLoadFromProps,
		priority,
		quality,
		resource,
		size: sizeFromProps,
		src: srcFromProps,
		width: widthFromProps,
	} = props;

	const [, setIsLoading] = React.useState(true);

	let width: number | undefined | null;
	let height: number | undefined | null;
	let alt = altFromProps;
	let src: StaticImageData | string = srcFromProps || "";

	if (!src && resource) {
		// Payload media object
		if (typeof resource === "object") {
			const {
				alt: altFromResource,
				height: fullHeight,
				url,
				width: fullWidth,
			} = resource;

			width = widthFromProps ?? fullWidth;
			height = heightFromProps ?? fullHeight;
			alt = altFromResource ?? alt;

			src = getMediaUrl(url);
		}

		// Direct URL or path string
		if (typeof resource === "string") {
			src = getMediaUrl(resource);
		}
	}

	// NOTE: this is used by the browser to determine which image to download at different screen sizes
	const sizes = sizeFromProps
		? sizeFromProps
		: Object.entries(breakpoints)
				.map(([, value]) => `(max-width: ${value}px) ${value}px`)
				.join(", ");

	return (
		<NextImage
			alt={alt || ""}
			className={cn(imgClassName)}
			fill={fill}
			height={!fill ? height || heightFromProps : undefined}
			onClick={onClick}
			onLoad={() => {
				setIsLoading(false);
				if (typeof onLoadFromProps === "function") {
					onLoadFromProps();
				}
			}}
			priority={priority}
			quality={quality}
			sizes={sizes}
			src={src}
			width={!fill ? width || widthFromProps : undefined}
		/>
	);
};

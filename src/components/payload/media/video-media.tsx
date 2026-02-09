"use client";

import React, { useEffect, useRef } from "react";

import { getMediaUrl } from "@/lib/payload/utils/getMediaUrl";
import { cn } from "@/lib/utils";

import type { Props as MediaProps } from "./types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
	const { onClick, resource, videoClassName } = props;

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const { current: video } = videoRef;
		if (video) {
			video.addEventListener("suspend", () => {
				console.warn("Video was suspended, rendering fallback image.");
			});
		}
	}, []);

	if (resource && typeof resource === "object") {
		const { filename } = resource;

		return (
			<video
				autoPlay
				className={cn(videoClassName)}
				controls={false}
				loop
				muted
				onClick={onClick}
				playsInline
				ref={videoRef}
			>
				<source src={getMediaUrl(`/uploads/videos/${filename}`)} />
			</video>
		);
	}

	return null;
};

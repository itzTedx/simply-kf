import Image from "next/image";

import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
	return (
		<Image
			alt="Simply KF Logo"
			className={cn("", className)}
			height={60}
			src="/logo.svg"
			width={30}
		/>
	);
};

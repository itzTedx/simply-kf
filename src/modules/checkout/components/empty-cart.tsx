import Link from "next/link";

import { RiShoppingBag2Line, RiShoppingBagLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export const EmptyCart = () => {
	return (
		<Empty className="h-full bg-card py-12">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<RiShoppingBag2Line />
				</EmptyMedia>
				<EmptyTitle>Your bag is empty</EmptyTitle>
				<EmptyDescription className="max-w-xs text-pretty">
					Add pieces you love from the <Link href="/shop">shop</Link>.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button render={<Link href="/shop" />}>
					<RiShoppingBagLine className="mr-2" />
					Explore shop
				</Button>
			</EmptyContent>
		</Empty>
	);
};

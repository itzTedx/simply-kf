import Link from "next/link";

interface ItemDetailsProps {
	name: string;
	color?: string;
	size?: string;
	price: number;
	slug?: string;
}

export const ItemDetails = ({
	name,
	color,
	size,
	price,
	slug,
}: ItemDetailsProps) => {
	return (
		<>
			<Link href={`/shop/${slug}`}>
				<h3 className="truncate font-display font-medium text-foreground">
					{name}
				</h3>
			</Link>
			<div className="font-body text-muted-foreground text-sm">
				{color && <span>{color}</span>}
				{size && <span>, {size}</span>}
			</div>
			<p className="mb-4 font-body font-medium text-foreground text-sm">
				£{price.toFixed(2)}
			</p>
		</>
	);
};

import { Route } from "next";
import Link from "next/link";

import {
	DefaultNodeTypes,
	type DefaultTypedEditorState,
	SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import {
	RichText as ConvertRichText,
	JSXConvertersFunction,
	LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";

import { cn, slugify } from "@/lib/utils";

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value } = linkNode.fields.doc!;
	if (typeof value !== "object") {
		throw new Error("Expected value to be an object");
	}
	const slug = value.slug;
	return `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	link: ({ node, nodesToJSX }) => {
		const children = nodesToJSX({
			nodes: node.children,
		});

		let href = node.fields.url ?? "";
		let newTab = node.fields.newTab;

		// Auto-detect external HTTP/HTTPS links and open in new tab
		if (node.fields.linkType !== "internal" && !newTab) {
			newTab = href.startsWith("http://") || href.startsWith("https://");
		}

		if (node.fields.linkType === "internal") {
			href = internalDocToHref({
				linkNode: node as SerializedLinkNode,
			});
		}

		const rel = newTab ? "noopener noreferrer" : undefined;
		const target = newTab ? "_blank" : undefined;

		return (
			<Link href={href as Route} rel={rel} target={target}>
				{children}
			</Link>
		);
	},
	heading: ({ node, nodesToJSX }) => {
		// Extract plain text from node children for ID generation
		const extractText = (nodes: DefaultNodeTypes[]): string => {
			return nodes
				.map((child) => {
					if (child.type === "text") {
						return child.text || "";
					}
					if ("children" in child && child.children) {
						return extractText(child.children as DefaultNodeTypes[]);
					}
					return "";
				})
				.join("");
		};

		const text = extractText(node.children as DefaultNodeTypes[]);
		const id = slugify(text);

		const Tag = node.tag;
		return <Tag id={id}>{nodesToJSX({ nodes: node.children })}</Tag>;
	},
});

type Props = {
	data: DefaultTypedEditorState;
	enableGutter?: boolean;
	enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
	const { className, enableProse = true, enableGutter = true, ...rest } = props;
	return (
		<ConvertRichText
			className={cn(
				"payload-richtext",
				{
					container: enableGutter,
					"max-w-none": !enableGutter,
					"prose md:prose-md dark:prose-invert mx-auto": enableProse,
				},
				className
			)}
			converters={jsxConverters}
			{...rest}
		/>
	);
}

import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
	// 🎯 Custom Image
	img: (props) => (
		<Image
			{...props}
			alt={props.alt || ""}
			width={1200}
			height={600}
			className="rounded-xl object-cover w-full h-48 sm:h-60 md:h-75 my-5"
		/>
	),

	// 🎯 Custom Link
	a: (props) => {
		const isInternal = props.href?.startsWith("/");

		if (isInternal) {
			return (
				<Link
					href={props.href!}
					className="text-primary underline underline-offset-4 hover:opacity-70 transition">
					{props.children}
				</Link>
			);
		}

		return (
			<a
				{...props}
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary underline underline-offset-4 hover:opacity-70 transition"
			/>
		);
	},

	// 🎯 Custom Headings
	h2: (props) => (
		<h2 className="text-2xl sm:text-3xl font-semibold mt-8 md:mt-16 mb-4 md:mb-6" {...props} />
	),

	h3: (props) => (
		<h3 className="text-xl sm:text-2xl font-semibold mt-6 md:mt-10 mb-4" {...props} />
	),

	// 🎯 Code block wrapper (ha design control kell)
	pre: (props) => (
		<pre
			className="rounded-xl p-6 my-8 overflow-x-auto min-w-full "
			{...props}
		/>
	),
};

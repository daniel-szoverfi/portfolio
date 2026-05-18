import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import SplitText from "@/components/gasp/split-text";
import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import AnimatedContent from "@/components/gasp/animated-content";

export function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	console.log(slug);
	const post = getPostBySlug(slug);

	if (!post) return notFound();

	return (
		<div className="flex min-h-screen flex-col items-center justify-start bg-background px-4 sm:px-8 lg:px-20 pt-20 sm:pt-24 lg:pt-30 w-full">
			<div className="flex flex-col items-start justify-start gap-4 w-full max-w-2xl">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 w-full">
					<SplitText
						text={post.title}
						className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed"
						tag="h1"
						textAlign="left"
						duration={1.5}
						threshold={0.1}
					/>
					<AnimatedContent duration={1.5} distance={10} threshold={0.1}>
						<span className="text-sm text-muted-foreground">{post.date}</span>
					</AnimatedContent>
				</div>
				<div className="text-sm text-muted-foreground mt-2">
					{post.description}
				</div>
				{post.tags && (
					<div className="flex gap-2">
						{post.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				)}
				<MDXRemote
					source={post.content}
					components={mdxComponents}
					options={{
						mdxOptions: {
							remarkPlugins: [remarkGfm],
							rehypePlugins: [rehypePrettyCode],
						},
					}}
				/>
			</div>
		</div>
	);
}

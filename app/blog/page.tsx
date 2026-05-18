import SplitText from "@/components/gasp/split-text";
import FadeContent from "@/components/gasp/fade-content";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContent from "@/components/gasp/animated-content";

export default function Home() {
	const posts = getAllPosts();
	return (
		<div className="flex min-h-screen flex-col items-center justify-start bg-background px-4 sm:px-8 lg:px-20 pt-20 sm:pt-24 lg:pt-30 w-full">
			<div className="flex flex-col items-start justify-start gap-4 w-full max-w-2xl">
				<SplitText
					text="Blogok"
					className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed"
					textAlign="left"
					duration={1.5}
					threshold={0.1}
					tag="h1"
				/>
				<FadeContent
					className="text-lg text-muted-foreground gap-4"
					duration={1.5}
					delay={0.5}
					threshold={0.1}>
					<p className="text-sm text-muted-foreground">
						Néha nem fér el minden gondolat a fejemben. Azt mondják ami neked
						szemét az lehet másnak kincs. De persze az sem célom, hogy szemetet
						posztoljak. Ezen az oldalon a mélyebb gondolataimat vagy az
						informatív tartalmaimat próbálom megosztani
					</p>
				</FadeContent>
				<div className="flex flex-col gap-4 w-full">
					{posts.map((post, index) => (
						<AnimatedContent
							key={post.slug}
							className="w-full"
							duration={2}
							distance={10}
							delay={1}
							threshold={0.1 + index * 0.1}>
							<Link
								href={`/blog/${post.slug}`}
								className="text-sm flex items-center gap-2">
								<ArrowUpRight className="w-5 h-5" />
								{post.title}
								{" - "}
								<span className="text-xs text-muted-foreground">
									{post.date}
								</span>
							</Link>
						</AnimatedContent>
					))}
				</div>
			</div>
		</div>
	);
}

import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getPublicImageUrl } from "@/utils/supabase/storage";
import Image from "next/image";

interface Post {
	id: number;
	title: string;
	image_path: string;
}

interface PostWithImageUrl extends Post {
	imageUrl: string;
}

const Testing = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("Post").select("*");

	if (error) {
		console.error("Error fetching posts:", error);
		return <div>Error fetching posts</div>;
	}

	// Resolve all image URLs server-side before rendering
	const posts: PostWithImageUrl[] = (data as Post[]).map((post) => ({
		...post,
		imageUrl: getPublicImageUrl(supabase, post.image_path),
	}));

	return (
		<main className="p-8">
			<h1 className="text-2xl font-bold mb-6">Latest Posts</h1>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<div key={post.id} className="border rounded-lg p-4 shadow-sm">
						<h2 className="text-xl font-semibold mb-3">{post.title}</h2>

						<div className="relative w-full h-48">
							<Image
								src={post.imageUrl}
								alt={`Image for ${post.title}`}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover rounded-md"
								priority={false}
							/>
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default Testing;

import fs from "fs";
import path from "path";
import matter from "gray-matter";
const postsDirectory = path.join(process.cwd(), "content/blog");

interface Post {
	slug: string;
	title: string;
	content: string;
	description?: string;
	date: string;
	tags?: string[];
}

export function getAllPosts(): Post[] {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		const slug = fileName.replace(/\.mdx?$/, "");
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		return {
			slug,
			title: data.title || slug,
			content,
			date: data.date || "",
			tags: data.tags || [],
			description: data.description || "",
			...data,
		};
	});
}

export function getPostBySlug(slug: string): Post | null {
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		slug,
		title: data.title || slug,
		description: data.description || "",
		content,
		date: data.date || "",
		tags: data.tags || [],
		...data,
	};
}

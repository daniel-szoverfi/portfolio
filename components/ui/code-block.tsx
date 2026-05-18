"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	code: string;
	className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className={cn("relative group/code", className)}>
			<Button
				variant="ghost"
				size="icon"
				onClick={handleCopy}
				className="absolute top-3 right-3 h-7 w-7 opacity-0 group-hover/code:opacity-100 transition-opacity bg-background/80 hover:bg-background border border-border/50"
				aria-label="Copy code">
				{copied ? (
					<Check className="w-3.5 h-3.5 text-green-500" />
				) : (
					<Copy className="w-3.5 h-3.5" />
				)}
			</Button>
			<pre className="overflow-x-auto px-4 sm:px-5 py-4 text-xs leading-relaxed bg-muted/40 font-mono pr-12">
				<code>{code}</code>
			</pre>
		</div>
	);
}

import fs from "fs";
import path from "path";
import SplitText from "@/components/gasp/split-text";
import FadeContent from "@/components/gasp/fade-content";
import AnimatedContent from "@/components/gasp/animated-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ChevronRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

const feladatok = [
	{
		id: 1,
		title: "Feladat 1 – Sor törlés",
		description:
			"Adott egy 5×5-ös mátrix. Kérd be a törlendő sor indexét, majd töröld ki azt a sort a mátrixból!",
		file: "feladat1_sablon.cpp",
		badge: "Mátrix",
	},
	{
		id: 2,
		title: "Feladat 2 – Oszlop beszúrás",
		description:
			"Adott egy 5×5-ös mátrix. Kérd be a pozíciót, majd szúrj be egy új oszlopot a szomszédos két oszlop összegeivel!",
		file: "feladat2_sablon.cpp",
		badge: "Mátrix",
	},
];

export default function FeladatokPage() {
	const feladatokWithCode = feladatok.map((f) => ({
		...f,
		code: fs.readFileSync(
			path.join(process.cwd(), "public", "documents", f.file),
			"utf-8",
		),
	}));

	return (
		<div className="flex min-h-screen flex-col items-center justify-start bg-background px-4 sm:px-8 lg:px-20 pt-20 sm:pt-24 lg:pt-30 w-full">
			<div className="flex flex-col items-start justify-start gap-8 sm:gap-10 w-full max-w-2xl">
				{/* Page header */}
				<div className="flex flex-col gap-2">
					<SplitText
						text="Feladatok"
						className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed"
						textAlign="left"
						duration={1.5}
						threshold={0.1}
						tag="h1"
					/>
					<FadeContent duration={1.5} delay={0.5} threshold={0.1}>
						<p className="text-sm text-muted-foreground max-w-prose">
							Programozási feladatok sablonjai. Töltsd le a sablont, írd meg a
							megoldást, és ellenőrizd a példafutással.
						</p>
					</FadeContent>
				</div>

				{/* Feladat cards */}
				<div className="flex flex-col gap-4 w-full pb-10">
					{feladatokWithCode.map((feladat, index) => (
						<AnimatedContent
							key={feladat.id}
							className="w-full"
							duration={1.5}
							distance={15}
							delay={0.8}
							threshold={0.05 + index * 0.1}>
							<div className="rounded-xl border bg-card overflow-hidden">
								{/* Card header row */}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5">
									<div className="flex flex-col gap-1 min-w-0">
										<div className="flex items-center gap-2 flex-wrap">
											<h2 className="text-base sm:text-lg font-semibold">
												{feladat.title}
											</h2>
											<Badge variant="secondary" className="shrink-0">
												{feladat.badge}
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground leading-relaxed">
											{feladat.description}
										</p>
									</div>
									<a
										href={`/documents/${feladat.file}`}
										download
										className="shrink-0">
										<Button
											variant="outline"
											size="sm"
											className="w-full sm:w-auto gap-2">
											<Download className="w-4 h-4" />
											Letöltés
										</Button>
									</a>
								</div>

								{/* Collapsible code viewer */}
								<details className="group border-t">
									<summary className="flex items-center gap-2 px-4 sm:px-5 py-3 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors list-none select-none">
										<ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-open:rotate-90" />
										Sablon kód megtekintése
									</summary>
									<div className="border-t">
										<CodeBlock code={feladat.code} />
									</div>
								</details>
							</div>
						</AnimatedContent>
					))}
				</div>
			</div>
		</div>
	);
}

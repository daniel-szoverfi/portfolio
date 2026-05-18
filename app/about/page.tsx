import SplitText from "@/components/gasp/split-text";
import FadeContent from "@/components/gasp/fade-content";

export default function About() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-start bg-background px-20 pt-30 w-full">
			<div className="flex flex-col items-start justify-start gap-4 w-2xl">
				<SplitText
					text="Rólam"
					className="text-5xl font-bold leading-relaxed"
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
						A nevem Szövérfi Dániel, szoftverfejlesztés mesteri hallgató vagyok
						a Sapientia EMTE egyetemen. E mellett webfejlesztőként dolgozom a
						Prisma Solutions cégnél. Szenvedélyem a technológia és a kreatív
						problémamegoldás, amit a munkámban is kamatoztatok. Célom, hogy
						innovatív és hatékony megoldásokat hozzak létre, amelyek értéket
						teremtenek a felhasználók számára.
					</p>
				</FadeContent>
				<div className="flex flex-col gap-4 w-full"></div>
			</div>
		</div>
	);
}

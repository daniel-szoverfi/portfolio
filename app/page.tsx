import { Button } from "@/components/ui/button";
import SplitText from "@/components/gasp/split-text";
import FadeContent from "@/components/gasp/fade-content";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-20 w-full">
			<div className="flex flex-col items-start justify-center gap-4 max-w-3xl">
				<SplitText
					text="Üdvözöllek a főoldalon!"
					className="text-8xl font-bold"
					textAlign="left"
					duration={1.5}
					threshold={0.1}
				/>
				<FadeContent
					className="text-lg text-muted-foreground gap-4 flex flex-col"
					duration={1.5}
					delay={0.5}
					threshold={0.1}>
					<p className="text-sm w-150 text-muted-foreground">
						Ennak a weboldalnak a célja, hogy bemutathassam rajta a munkáimat,
						posztoljam a blogjaimat és kicsit visszatérjek a social media
						oldalak centralizált világából abba a világba, ahol a személyes
						adatokat és az életvitelt is saját magam irányítom.
					</p>
					<div className="flex gap-4">
						<Link href="/blog">
							<Button variant="default">Blog</Button>
						</Link>
						<Link href="/about">
							<Button variant="outline">Rólam</Button>
						</Link>
					</div>
				</FadeContent>
			</div>
		</div>
	);
}

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";

const page_links = [
	{
		name: "Főoldal",
		href: "/",
	},
	{
		name: "Rólam",
		href: "/about",
	},
	{
		name: "Blog",
		href: "/blog",
	},
	{
		name: "Testing",
		links: [
			{
				name: "Testing",
				href: "/testing",
			},
		],
	},
];

export default function Header() {
	return (
		<div className="flex h-15 fixed z-40 w-full items-center justify-center border-b bg-background px-4">
			<NavigationMenu>
				<NavigationMenuList>
					{page_links.map((link) => {
						if (link.links) {
							return (
								<NavigationMenuItem key={link.name}>
									<NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
									<NavigationMenuContent className="w-60">
										{link.links.map((sublink) => (
											<NavigationMenuLink
												key={sublink.name}
												asChild
												className="w-52">
												<Link href={sublink.href}>{sublink.name}</Link>
											</NavigationMenuLink>
										))}
									</NavigationMenuContent>
								</NavigationMenuItem>
							);
						} else {
							return (
								<NavigationMenuItem key={link.name}>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}>
										<Link href={link.href}>{link.name}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							);
						}
					})}
				</NavigationMenuList>
			</NavigationMenu>
			<div className="ml-auto">
				<ModeToggle />
			</div>
		</div>
	);
}

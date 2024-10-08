"use client"

import * as React from "react"
import Link from "next/link"

import {cn} from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/nextjs";

const featuresComponents: { title: string, href: string, description: string }[] = [
	{
		title: "Home",
		href: "/",
		description:
			"Learn about Memoria, the revolutionary way to manage Alzheimer's.",
	},
	{
		title: "Games",
		href: "/app/memory",
		description: "Games Memoria offers to help patients."
	},
	{
		title: "Journal",
		href: "/app/journal",
		description: "Journal to keep in the brain fit."
	},
	{
		title: "AI Assistant",
		href: "/app/assistant",
		description: "Chat with a custom AI assistant, trained with your background, for any type of assistance."
	},
	{
		title: "Secret Drawer",
		href: "/app/secrets/new",
		description: "Store essential information for reinforcement to combat forgetfulness."
	},
]
const aboutComponents: { title: string; href: string; description: string }[] = [
	{
		title: "Motivation",
		href: "/app/motivation",
		description:
			"Why we created Memoria.",
	},
	{
		title: "Meet the Team",
		href: "/app/teampage",
		description: "Meet the team behind Memoria."
	},
]

export default function Navbar() {
	return (
		<NavigationMenu className={'w-screen flex flex-row'}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Memoria</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{featuresComponents.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>About Us</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{aboutComponents.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<SignedOut>
					<NavigationMenuItem>
						<SignInButton>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Sign In
							</NavigationMenuLink>
						</SignInButton>
					</NavigationMenuItem>
				</SignedOut>
				<SignedIn>
					<NavigationMenuItem>
						<Link href={'/app'}>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								App
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<SignOutButton>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Sign Out
							</NavigationMenuLink>
						</SignOutButton>
					</NavigationMenuItem>
				</SignedIn>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"

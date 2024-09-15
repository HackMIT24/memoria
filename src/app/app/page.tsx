'use client'

import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {UserIdentity} from "convex/server";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";

class Activity {
	title: string;
	url: string;
	description: string;

	constructor(title: string, url: string, description: string) {
		this.title = title;
		this.url = url;
		this.description = description;
	}
}

const activities: Activity[] = [
	new Activity(
		"Journal",
		"/app/journal",
		"Keep a log of what happened today, record your thoughts, or browse your past thoughts. "
	),
	new Activity(
		"AI Assistant",
		"/app/assistant",
		"Chat with an AI Assistant to receive insights, hold a conversation, and more."
	),
	new Activity(
		"Secret Drawer",
		"/app/secrets",
		"Review and relive the most important information and moments saved about you. "
	)
]

const games: Activity[] = [
	new Activity(
		"Memory",
		"/app/memory",
		"Test your abilities in this fun emoji-matching game."
	)
]

function ActivityCard({game}: { game: Activity }) {
	return (
		<Link href={game.url}>
			<Card className={'w-56 mr-3'}>
				<CardHeader>
					<CardTitle>{game.title}</CardTitle>
				</CardHeader>
				<CardContent>
					{game.description}
				</CardContent>
				<CardFooter>
					<Button className={'bg-blue-500'}> Launch</Button>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default function AppPage() {

	const user: UserIdentity | null | undefined = useQuery(api.user.getCurrentUser);

	return (
		<div className={'p-3 m-3'}>
			{ /* TODO: implement a feature where if the user has not gone through orientation, which we can store as a instance field for each user,
			then they must go through orientation. To enforce this, all activites will be hidden unless orientation has been completed. */}
			<h1 className={"text-5xl"}>Welcome, {user?.name?.split(' ')[0]}!</h1>
			<div className={'my-3 py-3 w-full h-full flex flex-col'}>
				<section className={'my-3'}>
					<h2 className={'text-xl'}>Activites</h2>
					<div className="flex flex-row">
						{activities.map(game => <ActivityCard key={game.title} game={game}/>)}
					</div>
				</section>
				<section className={'my-3'}>
					<h2 className={'text-xl'}>Games</h2>
					<div className="flex flex-row">
						{games.map(game => <ActivityCard key={game.title} game={game}/>)}
					</div>
				</section>
			</div>
		</div>
	)
}
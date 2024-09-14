'use client'

import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {UserIdentity} from "convex/server";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import MemoryGame from "@/components/memorygame";
import Link from "next/link";

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
		"/journal",
		"Keep a log of what happened today. "
	)
]

const games: Activity[] = [
	new Activity(
		"Word Search",
		"/wordsearch",
		"Find the given words amidst a sea of letters."
	),
	new Activity(
		"Memory",
		"/memory",
		"Test your "
	)
]

function ActivityCard({ game }: { game: Activity }) {
	return (
		<Link href={game.url}>
			<Card className={'w-56 mr-3'}>
				<CardHeader>
					<CardTitle>{ game.title }</CardTitle>
				</CardHeader>
				<CardContent>
					{ game.description }
				</CardContent>
				<CardFooter>
					meow
				</CardFooter>
			</Card>
		</Link>
	)
}

export default function AppPage() {

	const user: UserIdentity | null | undefined = useQuery(api.user.default)

	return (
		<div className={'p-3 m-3'}>
			{ /* TODO: implement a feature where if the user has not gone through orientation, which we can store as a instance field for each user,
			then they must go through orientation. To enforce this, all activites will be hidden unless orientation has been completed. */}
			<h1 className={"text-5xl"}>Welcome, {user?.name?.split(' ')[0] }!</h1>
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
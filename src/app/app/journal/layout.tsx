'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {JournalEntry} from "@/data/JournalEntry";

function JournalSidebarEntry({journalEntry}: { journalEntry: JournalEntry }) {
	return (
		<Link href={`/app/journal/${journalEntry.id}`}>
			<Card className={'w-52 mb-3'}>
				<CardHeader>
					<CardTitle>{journalEntry.title} </CardTitle>
				</CardHeader>
				<CardContent>
					<p>{journalEntry.date.toLocaleDateString()} - {journalEntry.content.substring(-30)}</p>
				</CardContent>
			</Card>
		</Link>
	)
}


export default function JournalLayout({children}: { children: React.ReactNode }) {
	const journalPages = useQuery(api.journal.getAll);

	return (
		<div>
			<h1 className={'text-xl'}>Journal</h1>
			<div className="flex flex-row">
				<div className="flex flex-col m-3 pr-3">
					<div className="flex flex-row my-3">
						<h3 className='text-lg mx-3 px-3'>Entries</h3>
						<Link href={'/app/journal/create'}>
							<Button className={'text-xs bg-blue-500'}>Create</Button>
						</Link>
					</div>
					{journalPages?.map(rawJournalEntry => (
						<JournalSidebarEntry key={rawJournalEntry._id} journalEntry={new JournalEntry(
							rawJournalEntry._id,
							rawJournalEntry.user,
							rawJournalEntry.title,
							new Date(rawJournalEntry.date),
							rawJournalEntry.content
						)}/>
					))}
				</div>
				<div className="flex m-3">
					{children}
				</div>
			</div>
		</div>
	)
}
'use client'

import {api} from "../../../../../convex/_generated/api";
import {useQuery} from "convex/react";

export default function JournalIDPage({params}: { params: { id: string } }) {
	const journalEntry = useQuery(api.journal.getSingle, {input: {id: params.id}});

	console.log(params.id);

	return (
		<div>
			<h1 className={'text-xl'}>{journalEntry?.title}</h1>
			<h3 className={'text-green-500'}>{new Date(journalEntry?.date as string).toLocaleDateString()}</h3>
			<p>{journalEntry?.content}</p>
		</div>
	)
}
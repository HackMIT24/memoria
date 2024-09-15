'use client'

import MemoryGame, {CardItem} from "@/components/memorygame";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";

export default function MemoryPage() {
	const memories = useQuery(api.memories.getAll);

	const memoryCards: CardItem[] | undefined = memories?.map(memory => {
		return {url: memory.url, label: memory.label}
	});

	return (
		<div>
			{memoryCards && <MemoryGame cardItems={memoryCards}/>}
		</div>
	)
}
'use client'

import CardInputForm from "@/components/carditemform";
import {api} from "../../../../../convex/_generated/api";
import {useMutation} from "convex/react";

export default function MemoryPage() {
	const addMemory = useMutation(api.memories.addMemory);

	const onAddCard = ({url, label}: { url: string, label: string }) => {
		addMemory({url, label}).then(r => r);
	}

	return (
		<div>
			<CardInputForm onAddCard={onAddCard} onFinish={() => ""}/>
		</div>
	)
}
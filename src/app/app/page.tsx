'use client'

import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";

export default function AppPage() {

	const tasks = useQuery(api.user.default)

	return (
		<>
			<h1 className={"text-2xl"}>Welcome to Memoria!</h1>
			{/* Infodumping right now to test some hooks */}
			{ tasks?.toString() }
		</>
	)
}
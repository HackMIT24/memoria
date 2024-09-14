'use client'

import {api} from "../../../convex/_generated/api";
import {useQuery} from "convex/react";

export default function AppLayout({ children }: { children: React.ReactNode}) {

	const user = useQuery(api.user.default);

	return (
		<div>
			{ children }
		</div>
	)
}
'use client'

import {useMutation, useQuery} from "convex/react";
import React from "react";
import {api} from "../../../convex/_generated/api";

export default function AppLayout({children}: { children: React.ReactNode }) {

	const user = useQuery(api.user.getCurrentUser);
	const createUserIfNotExists = useMutation(api.user.createUserIfNotExists);

	React.useEffect(() => {
		if (user) {
			createUserIfNotExists();
		}
	}, [user, createUserIfNotExists]);

	return (
		<div>
			{children}
		</div>
	)
}
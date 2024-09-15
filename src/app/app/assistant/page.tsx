'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export default function AssistantPage() {
	const conversations = useQuery(api.ai.getConversations);
	const createConversation = useMutation(api.ai.createConversation);
	const [loading, setLoading] = useState(false);

	const handleNewConversation = async () => {
		setLoading(true);
		const newConversation = await createConversation();
		setLoading(false);
		// Redirect to the new conversation page
		window.location.href = `/app/assistant/${newConversation}`;
	};

	return (
		<div>
			<h1>AI Chatbot</h1>
			<button onClick={handleNewConversation} disabled={loading}>
				{loading ? 'Creating...' : 'New Conversation'}
			</button>
			<ul>
				{conversations?.map(conversation => (
					<li key={conversation._id}>
						<Link href={`/app/assistant/${conversation._id}`}>
							{conversation._id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
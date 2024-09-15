'use client';

import React, {useState} from "react";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import {useMutation} from "convex/react";
import {api} from "../../../../../convex/_generated/api";

export default function AssistantPage({ params }: { params: { id: string } }) {
		const [messages, setMessages] = useState<{ text: string; isUser?: boolean }[]>([]);
		const cont = useMutation(api.ai.continueConversation);
		const handleSendMessage = async (userMessage: string) => {
			const newMessages = [...messages, { text: userMessage, isUser: true }];
			setMessages(newMessages);

			const response = cont({ conversationId: params.id, nextMessage: userMessage });
			setMessages([...newMessages, { text: response.reply }]);
		};

		return (
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
				<div className="chat-window bg-white p-4 border rounded-md shadow-lg space-y-4">
					<MessageList messages={messages} />
					<MessageInput onSend={handleSendMessage} />
				</div>
			</div>
		);
	};
}
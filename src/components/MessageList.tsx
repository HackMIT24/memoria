import React from "react";
import ChatBubble from "./ChatBubble";

type Message = {
	text: string;
	isUser?: boolean;
};

type MessageListProps = {
	messages: Message[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
	return (
		<div className="flex flex-col space-y-2">
			{messages.map((msg, idx) => (
				<ChatBubble key={idx} message={msg.text} isUser={msg.isUser} />
			))}
		</div>
	);
};

export default MessageList;

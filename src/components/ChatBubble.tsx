import React from "react";

type ChatBubbleProps = {
	message: string;
	isUser?: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`p-3 max-w-xs rounded-lg ${
					isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
				}`}
			>
				{message}
			</div>
		</div>
	);
};

export default ChatBubble;

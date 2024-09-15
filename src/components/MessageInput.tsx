import React, { useState } from "react";

type MessageInputProps = {
	onSend: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
	const [input, setInput] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim() !== "") {
			onSend(input);
			setInput("");  // Clear input field
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex space-x-2">
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Type a message..."
				className="w-full p-2 border rounded-md focus:outline-none"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white p-2 rounded-lg"
			>
				Send
			</button>
		</form>
	);
};

export default MessageInput;

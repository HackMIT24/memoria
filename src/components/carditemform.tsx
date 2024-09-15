import React, {useState} from 'react';

const CardInputForm: React.FC<{
	onAddCard: ({url, label}: { url: string, label: string }) => void,
	onFinish: () => void
}> = ({onAddCard, onFinish}) => {
	const [url, setUrl] = useState<string>('');
	const [label, setLabel] = useState<string>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (url && label) {
			onAddCard({url, label});
			setUrl('');
			setLabel('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter image URL"
				required
			/>
			<input
				type="text"
				value={label}
				onChange={(e) => setLabel(e.target.value)}
				placeholder="Enter name"
				required
			/>
			<button type="submit">Add Card</button>
			<button type="button" onClick={onFinish}>Finish</button>
		</form>
	);
};

export default CardInputForm;
import React, {useState} from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from 'next/link';

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
			<Input
				type="text"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter image URL"
				required
                className="m-3"
			/>
			<Input
				type="text"
				value={label}
				onChange={(e) => setLabel(e.target.value)}
				placeholder="Enter name"
				required
                className="m-3"
			/>
			<Button type="submit" className="m-3">Add Card</Button>
			<Link href="/app/memory"><Button type="button" onClick={onFinish} className="m-3">Finish</Button> </Link>
        
		</form>
	);
};

export default CardInputForm;
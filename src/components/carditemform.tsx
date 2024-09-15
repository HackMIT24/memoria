import React, { useState } from 'react';

interface CardItem {
  image: string;
  name: string;
}

const CardInputForm: React.FC<{ onAddCard: (card: CardItem) => void, onFinish: () => void }> = ({ onAddCard, onFinish }) => {
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image && name) {
      onAddCard({ image, name });
      setImage('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Enter image URL"
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <button type="submit">Add Card</button>
      <button type="button" onClick={onFinish}>Finish</button>
    </form>
  );
};

export default CardInputForm;
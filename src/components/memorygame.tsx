import { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  name: string;
  isFlipped: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Editable array of image and name pairs
  const cardPairs = [
    { image: '🐶', name: 'Dog' },
    { image: '🐱', name: 'Cat' },
    { image: '🐭', name: 'Mouse' },
    { image: '🐹', name: 'Hamster' },
    { image: '🐰', name: 'Rabbit' },
    { image: '🦊', name: 'Fox' },
    { image: '🐻', name: 'Bear' },
    { image: '🐼', name: 'Panda' },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...cardPairs, ...cardPairs]
      .sort(() => Math.random() - 0.5)
      .map((pair, index) => ({ 
        id: index, 
        image: pair.image, 
        name: pair.name, 
        isFlipped: false 
      }));
    setCards(shuffledCards);
  };

  const handleCardClick = (clickedCard: Card) => {
    if (flippedCards.length === 2 || matchedCards.includes(clickedCard.id)) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].name === newFlippedCards[1].name) {
        setMatchedCards([...matchedCards, newFlippedCards[0].id, newFlippedCards[1].id]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`w-24 h-24 flex flex-col items-center justify-center text-sm cursor-pointer ${
            flippedCards.includes(card) || matchedCards.includes(card.id) ? 'bg-blue-200' : 'bg-gray-200'
          }`}
          onClick={() => handleCardClick(card)}
        >
          {flippedCards.includes(card) || matchedCards.includes(card.id) ? (
            <> 
              <div className="text-4xl mb-1">{card.image}</div>
              <div className="text-xs">{card.name}</div>
            </>
          ) : (
            '?'
          )}
        </div>
      ))}
      <div className="col-span-4 mt-4">Moves: {moves}</div>
    </div>
  );
};

export default MemoryGame;
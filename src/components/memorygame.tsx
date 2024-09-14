import { useState, useEffect } from 'react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const shuffledCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, isFlipped: false }));
    setCards(shuffledCards);
  };

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2 || matchedCards.includes(clickedCard.id)) return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].symbol === newFlippedCards[1].symbol) {
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
          className={`w-24 h-24 flex items-center justify-center text-4xl cursor-pointer ${
            flippedCards.includes(card) || matchedCards.includes(card.id) ? 'bg-blue-200' : 'bg-gray-200'
          }`}
          onClick={() => handleCardClick(card)}
        >
          {flippedCards.includes(card) || matchedCards.includes(card.id) ? card.symbol : '?'}
        </div>
      ))}
      <div className="col-span-4 mt-4">Moves: {moves}</div>
    </div>
  );
};

export default MemoryGame;
import { useState, useEffect } from 'react';

interface CardItem {
  image: string;
  name: string;
}

interface Card {
  id: number;
  image: string;
  name: string;
  isFlipped: boolean;
}

interface MemoryGameProps {
  cardItems: CardItem[];
}

const MemoryGame: React.FC<MemoryGameProps> = ({ cardItems }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [cardItems]);

  const initializeGame = () => {
    const shuffledCards = [...cardItems, ...cardItems]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ 
        id: index, 
        image: item.image, 
        name: item.name, 
        isFlipped: false 
      }));
    setCards(shuffledCards);
  };

  const handleCardClick = (clickedCard: Card) => {
    if (gameEnded || flippedCards.length === 2 || matchedCards.includes(clickedCard.id)) return;
  
    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);
  
    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].name === newFlippedCards[1].name) {
        const newMatchedCards = [...matchedCards, newFlippedCards[0].id, newFlippedCards[1].id];
        setMatchedCards(newMatchedCards);
        if (newMatchedCards.length === cards.length) {
          setGameEnded(true);
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const resetGame = () => {
    initializeGame();
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameEnded(false);
  };
  
  return (
    <div className="flex flex-col items-center">
      {!gameEnded ? (
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
                  <img src={card.image} alt={card.name} className="w-16 h-16 object-cover mb-1" />
                  <div className="text-xs">{card.name}</div>
                </>
              ) : (
                '?'
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <p className="mb-4">You've completed the game in {moves} moves!</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
      <div className="mt-4">Moves: {moves}</div>
    </div>
  );
};

export default MemoryGame;
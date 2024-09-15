'use client'

import CardInputForm from "@/components/carditemform";

export default function MemoryPage() {
  const handleAddCard = (card: any) => {
    // Implement the logic for adding a card
    console.log('Card added:', card);
  };

  const handleFinish = () => {
    // Implement the logic for finishing
    console.log('Finished');
  };

  return (
    <div>
      <CardInputForm onAddCard={handleAddCard} onFinish={handleFinish} />
    </div>
  );
}
import { useEffect, useState } from "react";
import { cards } from "../data/cards";
import Card from "./Card";
import { shuffleCards } from "../utils/cards";
import Results from "./Results";

const Board = () => {
  const [showCards, setShowCards] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [nbOfMoves, setNbOfMoves] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    setShuffledCards(shuffleCards(cards));
  }, []);
  
  useEffect(() => {
    if (cardOne?.src == cardTwo?.src) {
      setShuffledCards(
        shuffledCards.map((card) =>
          card.src == cardOne?.src ? { ...card, matched: true } : card
        )
      );
      setCardOne(null);
      setCardTwo(null);
    } else {
      setDisabled(true);
      setTimeout(() => {
        setShuffledCards(
          shuffledCards.map((card) =>
            card.src == cardOne?.src || card.src == cardTwo?.src
              ? { ...card, clicked: false }
              : card
          )
        );
        setCardOne(null);
        setCardTwo(null);
        setDisabled(false);
      }, 1000);
    }
  }, [cardTwo]);

  const handleStart = () => {
    setShowCards(true);
    setNbOfMoves(0);
  };

  return (
    <div className="w-6/12 m-auto flex flex-col gap-8 justify-center items-center">
      {!showCards && (
        <button
          onClick={handleStart}
          className="bg-blue-500 hover:bg-blue-700 mt-9 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
      )}

      {showCards && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-2">
          {shuffledCards.map((card, index) => (
            <Card
              setNbOfMoves={setNbOfMoves}
              card={card}
              setCardOne={setCardOne}
              setCardTwo={setCardTwo}
              cardOne={cardOne}
              key={index}
              shuffledCards={shuffledCards}
              setShuffledCards={setShuffledCards}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {showCards && <Results nbOfMoves={nbOfMoves}/>}
    </div>
  );
};

export default Board;

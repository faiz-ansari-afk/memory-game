
/* eslint-disable */
import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

const cardImages = [
  { "src": "/image/helmet.png", "matched": false },
  { "src": "/image/potion.png", "matched": false },
  { "src": "/image/ring.png", "matched": false },
  { "src": "/image/scroll.png", "matched": false },
  { "src": "/image/shield.png", "matched": false },
  { "src": "/image/sword.png", "matched": false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  }
  // handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, "matched": true }
            }
            else return card;
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }


  }, [choiceOne, choiceTwo])
  // reset choices and increases turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  useEffect(() => {
    shuffleCards
  })

  return (
    <div className='container'>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className='card-grid'>
          {cards.map((card) => (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

const flashcardWords = [
  'Book', 'Pen', 'Pencil', 'Car', 'Cup', 'Hat', 'Apple', 'Owl', 'Coffee',
  'Table', 'Chair', 'Lamp', 'Phone', 'Clock', 'Bottle', 'Bag', 'Mouse', 'Plant'
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffledCards = [...flashcardWords]
      .sort(() => Math.random() - 0.5)
      .map((word, index) => ({ id: index, word }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-mode');
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].word === cards[second].word) {
        setMatchedCards((prev) => [...prev, cards[first].word]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const isCardFlipped = (index) =>
    flippedCards.includes(index) || matchedCards.includes(cards[index].word);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Flashcard Game</h1>
      <div className="controls">
        <button onClick={restartGame}>Restart Game</button>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Bright Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${isCardFlipped(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={darkMode ? 'wow.jpg' : './closed.jpg'}
                  alt="cat icon"
                />
              </div>
              <div className={`card-back ${darkMode ? 'dark-text' : 'bright-text'}`}>
                {card.word}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


import React from 'react';
import './Flashcard.css';

function Flashcard({ card, onFlip }) {
  return (
    <div className="flashcard" onClick={onFlip}>
      {card.flipped ? (
        <div className="flashcard-content">
          <p>{card.word}</p>
        </div>
      ) : (
        <img src={card.image} alt={card.word} />
      )}
    </div>
  );
}

export default Flashcard

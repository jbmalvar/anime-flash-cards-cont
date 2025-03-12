import './Card.css';
import { useState } from 'react';

const Card = ({character, difficulty, flipped, onFlip}) => {
  return (
    <div className={`FlashCard ${flipped ? 'flipped' : ''} ${difficulty}`} onClick={onFlip}>
      <div className="FlashCardInner">
        <div className="FlashCardFront">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="FlashCardBack">
          <h2>{character.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
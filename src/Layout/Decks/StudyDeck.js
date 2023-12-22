import React from "react";
import { useState} from 'react';
import { useHistory } from 'react-router-dom';
import NavBreadCrumb from '../NavBreadCrumb';

const StudyDeck = ({ deck }) => {
  const history = useHistory();
  const [showBack, setShowBack] = useState(false);
  const [index, setIndex] = useState(0);

  const handleFlip = () => {
    setShowBack(!showBack);
    if(index+1 === deck.cards.length) {
      window.confirm(
        'Would you like to restart study session?\n' +
        'If not, click Cancel to return to the home screen.'
      ) ? handleReset() : history.push('/');
    }
  }

  const handleNext = () => {
    handleFlip();
    setIndex(index + 1);
  }

  const handleReset = () => {
    setShowBack(false);
    setIndex(0);
  }

  const handleAddClick = () => {
    history.push(`/decks/${deck.id}/cards/new`);
  }

  return <section name='study'>
    <NavBreadCrumb deck={deck} page='Study' />
    <h2>Study: {deck.name}</h2>
    { deck.cards.length < 3 ?
      <div name='cardWarning'>
        <h3>Not Enough Cards</h3>
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
        <button type='button' onClick={handleAddClick}>Add Cards</button>
      </div> :
      <div name='cardDisplay'>
        <h3>Card { index + 1 } of { deck.cards.length }</h3>
        <p>{ showBack ? deck.cards[index].back : deck.cards[index].front }</p>
        <button type='button' onClick={handleFlip}>Flip</button>
        { showBack && (index + 1) !== deck.cards.length ?
          <button type='button' onClick={handleNext}>
            Next
          </button> :
          null
        }
      </div>
    }
  </section>
}

export default StudyDeck;

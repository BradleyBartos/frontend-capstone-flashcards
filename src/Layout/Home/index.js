import React from 'react';
import { useHistory } from "react-router-dom";
import DeckSummary from './DeckSummary.js';

const Home = ({ decks = [], deleteDeck }) => {
  const history = useHistory();

  const createLink = () => history.push(`/decks/new`);

  return (
    <section name='home'>
      <button type='button' onClick={createLink}>
        Create Deck
      </button>
      {decks.map(deck => 
        <div key={deck.id}>
          <DeckSummary deck={deck} deleteDeck={deleteDeck} />
        </div>
      )}
    </section>
  )
}

export default Home;

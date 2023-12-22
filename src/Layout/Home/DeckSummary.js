import React from 'react';
import { useHistory } from "react-router-dom";

const DeckSummary = ({ deck, deleteDeck }) => {
  let history = useHistory();

  const redirectView = () => history.push(`/decks/${deck.id}`);
  const redirectStudy = () => history.push(`/decks/${deck.id}/study`);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the ${deck.name} deck and all associated cards?`
    );
    if(confirmed) {
      deleteDeck(deck.id);
    }
  }

  return <>
    <h2>{deck.name}</h2>
    <p>{deck.cards.length} cards</p>
    <p>{deck.description}</p>
    <button type='button' onClick={redirectView}>View</button>
    <button type='button' onClick={redirectStudy}>Study</button>
    <button type='button' onClick={handleDelete} alt='Delete'>Delete</button>
  </>
}

export default DeckSummary;

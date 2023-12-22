import React from "react";
import { useHistory } from 'react-router-dom';
import NavBreadCrumb from '../NavBreadCrumb';
import NotFound from '../NotFound';
import { deleteCard } from '../../utils/api';

const ViewDeck = ({ deck, deleteDeck, updateDeck }) => {
  const history = useHistory();

  const redirectEditDeck = () => history.push(`/decks/${deck.id}/edit`);
  const redirectStudyDeck = () => history.push(`/decks/${deck.id}/study`);
  const redirectAddDeck = () => history.push(`/decks/${deck.id}/cards/new`);
  const redirectEditCard = cardId => history.push(`/decks/${deck.id}/cards/${cardId}/edit`);

  const handleDeleteDeck = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the ${deck.name} deck and all associated cards?`
    );
    if(confirmed) {
      deleteDeck(deck.id);
      history.push('/');
    }
  }

  const handleDeleteCard = async (cardId) => {
    const abortControl = new AbortController();

    const confirmed = window.confirm(
      `Are you sure you want to delete the card?`
    );
    if(confirmed) {
      await deleteCard(cardId, abortControl.signal);
      updateDeck({...deck, cards: deck.cards.filter(card => 
        card.id !== cardId
      )});
    }

    return () => abortControl.abort();
  }

  return !deck ? <NotFound /> : 
    <section name='viewDeck'>
      <NavBreadCrumb deck={deck} />
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <button type='button' onClick={redirectEditDeck}>Edit</button>
      <button type='button' onClick={redirectStudyDeck}>Study</button>
      <button type='button' onClick={redirectAddDeck}>Add Cards</button>
      <button type='button' onClick={handleDeleteDeck} alt='Delete'>Delete</button>
      <h2>Cards</h2>
      <table>
        <tbody>
          {deck.cards.map(card => {
            return <tr key={card.id}>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td><button type='button' onClick={() => redirectEditCard(card.id)}>Edit</button></td>
              <td><button type='button' onClick={() => handleDeleteCard(card.id)}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </section>
}

export default ViewDeck;

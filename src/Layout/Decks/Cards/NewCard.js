import React, { useState } from 'react';
import NavBreadCrumb from '../../NavBreadCrumb';
import CardForm from './CardForm';
import { useHistory } from 'react-router-dom';
import { createCard } from '../../../utils/api';

const NewCard = ({ deck, updateDeckCards }) => {
  const history = useHistory();
  const initValue = { id: '', deckId: deck.id, front: '', back: '' }
  const [formData, setFormData] = useState(initValue);

  const setFront = ({ target }) => setFormData({...formData, front: target.value});
  const setBack = ({ target }) => setFormData({...formData, back: target.value});

  const handleUpdate = formData => {
    const abortControl = new AbortController();

    const saveCard = async (cardData) => {
      await createCard(deck.id, cardData, abortControl.signal);
    }
    const cardData = {
      ...formData,
      deckId: deck.id.toString(),
      id: (Math.random()*Date.now()).toFixed().toString()
    };
    saveCard(cardData);
    updateDeckCards(cardData);
    setFormData(initValue);

    return () => abortControl.abort();
  }
  const secondary = { label: 'Done', handle: () => history.push(`/decks/${deck.id}`)}

  return <section name='newCard'>
    <NavBreadCrumb deck={deck} page='Add Card' />
    <h2>{deck.name}: Add Card</h2>
    <CardForm 
      formData={formData}
      setFront={setFront}
      setBack={setBack}
      handleUpdate={handleUpdate}
      secondary={secondary} 
    />
  </section>
}

export default NewCard;

import React, { useEffect, useState } from 'react';
import NavBreadCrumb from '../../NavBreadCrumb';
import { useHistory, useParams } from 'react-router-dom';
import { readCard, updateCard } from '../../../utils/api';
import CardForm from './CardForm';

const EditCard = ({ deck, updateDeckCards }) => {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({ id: '', deckId: deck.id, front: '', back: '' });

  const setFront = ({ target }) => setFormData({...formData, front: target.value});
  const setBack = ({ target }) => setFormData({...formData, back: target.value});

  useEffect(() => {
    const readAPICard = async () => {
      const cardData = await readCard(cardId);
      setFormData(cardData);
    }
    readAPICard();
  }, [cardId])

  const handleUpdate = formData => {
    const abortControl = new AbortController();

    const saveCard = async (cardData) => {
      await updateCard(cardData, abortControl.signal);
    };
    const cardData = {
      ...formData,
      deckId: deckId.toString(),
      id: cardId.toString(),
    };
    saveCard(cardData);
    updateDeckCards(cardData);
    history.push(`/decks/${deck.id}`);

    return () => abortControl.abort();
  }
  const secondary = { label: 'Cancel', handle: () => history.push(`/decks/${deck.id}`) };

  return <section name='editCard'>
    <NavBreadCrumb deck={deck} page={'Edit Card'} />
    <h2>{deck.name}: Edit Card</h2>
    <CardForm
      formData={formData}
      setFront={setFront}
      setBack={setBack}
      handleUpdate={handleUpdate}
      secondary={secondary}
    />
  </section>
}

export default EditCard;

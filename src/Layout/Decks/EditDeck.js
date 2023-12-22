import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBreadCrumb from '../NavBreadCrumb';
import DeckForm from './DeckForm';

const EditDeck = ({ deck, updateDeck }) => {
  const [ formData, setFormData ] = useState({ name: '', description: '' });
  const history = useHistory();

  useEffect(() => {
    setFormData({ ...deck });
  }, [deck])

  const setName = ({ target }) => setFormData({...formData, name: target.value});
  const setDescription = ({ target }) => setFormData({...formData, description: target.value});

  const submitChange = (event) => {
    event.preventDefault();
    updateDeck(formData);
    history.push(`/decks/${deck.id}`);
  }

  return <section name='editDeck'>
    <NavBreadCrumb deck={deck} page='Edit Deck'/>
    <h2>Edit Deck</h2>
    <DeckForm 
      formData={formData}
      setName={setName}
      setDescription={setDescription}
      submitChange={submitChange}
    />
  </section>
}

export default EditDeck;

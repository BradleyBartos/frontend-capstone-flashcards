import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBreadCrumb from '../NavBreadCrumb';
import DeckForm from './DeckForm';

const NewDeck = ({ addDeck }) => {
  const init = {name: '', description: ''};
  const [ formData, setFormData ] = useState(init);
  const history = useHistory();

  const setName = ({ target }) => setFormData({...formData, name: target.value});
  const setDescription = ({ target }) => setFormData({...formData, description: target.value});

  const submitChange = (event) => {
    event.preventDefault();

    const deckData = {...formData, id: (Math.random()*Date.now()).toFixed(), cards: []}
    addDeck(deckData);

    history.push('/');
  }

  return <section name='new'>
    <NavBreadCrumb page='Create Deck' />
    <h2>Create Deck</h2>
    <DeckForm
      formData={formData}
      submitChange={submitChange}
      setName={setName}
      setDescription={setDescription}
    />
  </section>
}

export default NewDeck;

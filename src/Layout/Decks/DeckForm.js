import React from "react";
import { useHistory } from 'react-router-dom';

const DeckForm = ({
  formData,
  setName,
  setDescription,
  submitChange,
}) => {
  const history = useHistory();

  return <form id='deckForm' onSubmit={submitChange}>
    <label htmlFor='name'>Name</label>
    <input id='name' onChange={setName} value={formData.name} required={true} autoFocus/>
    <label htmlFor='description'>Description</label>
    <textarea id='description' onChange={setDescription} value={formData.description} required={true}/>
    <button type='button' onClick={history.goBack}>Cancel</button>
    <button type='submit'>Submit</button>
  </form>
}

export default DeckForm;

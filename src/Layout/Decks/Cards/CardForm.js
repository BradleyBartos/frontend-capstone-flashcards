import React from "react";

const CardForm = ({ 
  formData,
  setFront,
  setBack,
  handleUpdate,
  secondary = {label: '', handle: () => {}},
}) => {
  const handleSubmit = event => {
    event.preventDefault();

    handleUpdate(formData);
  };

  return <form id='cardForm'>
    <label htmlFor='front'>Front</label>
    <textarea
      id='front'
      placeholder='Front side of card'
      onChange={setFront}
      value={formData.front}
      required={true}
    />
    <label htmlFor='back'>Back</label>
    <textarea
      id='back'
      placeholder='Back side of card'
      onChange={setBack}
      value={formData.back}
      required={true}
    />
    <button type='button' onClick={secondary.handle}>{secondary.label}</button>
    <button type='submit' onClick={handleSubmit}>Save</button>
  </form>
}

export default CardForm;

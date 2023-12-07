import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function DeleteCardPopup({ isOpen, onClose, onLoading, card, onCardDelete, onClickOverlay }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  };
  
  return(
    <PopupWithForm
      name="delete" 
      title="Вы уверены?" 
      button={onLoading ? `Удаление...` : `Да`} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      onClickOverlay={onClickOverlay} 
    />
  );
};

export default DeleteCardPopup;
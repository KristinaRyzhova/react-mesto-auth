import React from 'react';

function PopupWithForm({ name, isOpen, onClose, title, onSubmit, children, button, onClickOverlay }) {
  return (
    <div 
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`} 
      onClick={onClickOverlay}
    >
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"  onClick={onClose} />              
        <h2 className="popup__title">{title}</h2>
        <form 
          className="popup__form" 
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button" type="submit">{button}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
import React from 'react';
import successReg from '../images/sucsess.svg';
import unsuccessReg from '../images/unsucsess.svg';

function InfoTooltip({ isOpen, onClose, onClickOverlay, isSuccess }) {
  return (
    <div 
      className={`popup popup_overley ${isOpen ? "popup_opened" : ''}`} 
      id="popup-infoToolTip" 
      onClick={onClickOverlay}
    >
      <div className="popup__reg-container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"  onClick={onClose} />
        <img
          className='popup__auth-image'
          alt='Уведомление о статусе регистрации'
          src={`${isSuccess ? successReg : unsuccessReg}`}
        />
        <h2 className='popup__notification'>{`${isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip
import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import * as auth from '../utils/auth.js'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [infoToolTip, setInfoToolTip] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    handleTokenCheck(jwt);
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    auth.checkToken(jwt).then((res) => {
      if (res.data) {
        setLoggedIn(true);
        navigate('/');
        setUserEmail(res.data.email);
      } else {
        setLoggedIn(false);
        navigate('/sign-in');
      }
    });
  };

  const handleRegister = (email, password) => {
    return auth.register(email, password)
      .then((res) => {
        if (res) {
          navigate('/sign-in');
          setRegSuccess(true);
          setInfoToolTip(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setRegSuccess(false);
        setInfoToolTip(true);
      })
  };

  const handleLogin = (email, password) => {
    return auth.login(email, password)
      .then((data) => {
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/');
        localStorage.setItem('jwt', data.token);
      })
      .catch(err => {
        console.log(err);
        setRegSuccess(false);
        setInfoToolTip(true);
      })
  };

  const handleExit = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  useEffect(() => {
    api.getAllInfo()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setInfoToolTip(false)
  };

  const isOpenPopup =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard ||
    infoToolTip;

  const closePopupByEscape = useCallback(function (evt) {
    if (evt.key === "Escape") {
      console.log("Escape");
      closeAllPopups();
    }
  }, []);

  useEffect(() => {
    if (isOpenPopup) {
      document.addEventListener('keydown', closePopupByEscape);
    } else {
      document.removeEventListener('keydown', closePopupByEscape)
    }
  }, [isOpenPopup]);

  function closePopupByOverley(evt) {
    if (evt.target === evt.currentTarget) {
      console.log("mouse");
      closeAllPopups();
    };
  };
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleCardDelete(card) {
    setIsLoading(true);
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.editUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCardPlace(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onClick={handleExit} />
        <Routes>
          <Route path='/' element={<ProtectedRoute
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeletePopup={handleDeleteCardClick}
            onDeletedCard={setDeletedCard}
            cards={cards}
            loggedIn={loggedIn} />}
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
          onClickOverlay={closePopupByOverley}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
          onClickOverlay={closePopupByOverley}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
          onClickOverlay={closePopupByOverley}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onLoading={isLoading}
          card={deletedCard}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          onClickOverlay={closePopupByOverley}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onClickOverlay={closePopupByOverley}
        />
        <InfoTooltip
          regSuccess={regSuccess}
          isOpen={infoToolTip}
          onClose={closeAllPopups}
          onClickOverlay={closePopupByOverley}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
import { useState, useEffect } from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Api from "../Utils/Api"
import { optionsApi } from "../Utils/optionsApi"
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';


const api = new Api(optionsApi)

function App() {

  // Состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isComfirmDeletePopupOpen, setIsComfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ isOpen: false })

  // Состояние загрузчиков
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  // Данные пользовотеля и карточек
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  // ID Карточки
  const [cardId, setCardId] = useState('')

  // Запрос данных пользователя и карточек с сервера
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(res => {
        setCurrentUser(res[0])
        console.log(setCurrentUser)
        setCards(res[1])
      })
      .catch(err => console.log("Не удалось загрузить страницу:", err))
  }, [])

  // Управление состоянием попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleComfirmDeleteClick(card) {
    setIsComfirmDeletePopupOpen(true)
    setCardId(card._id)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsComfirmDeletePopupOpen(false)
    setSelectedCard({ isOpen: false })
  }

  // Большая картинка
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      ...card
    })
  }

  // Данные пользователя
  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось изменить данные профиля:", err))
  }

  // Аватар пользователя
  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось сменить аватар:", err))
  }

  // Лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log("Не удалось изменить лайк:", err))
  }

  // Удаление карточки
  function handleCardDelete() {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardId))
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось удалить карточку:", err))
  }

  // Добавление карточки
  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось добавить карточку:", err))
  }
  
  return (
    <div className="page">
      <div className="container">
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleComfirmDeleteClick}          
        />
        <Footer/>
      </div> 
       {/* Редактировать профиль */}
      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          loader={isLoadingButton}
        />

        {/* Изменить аватар */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          loader={isLoadingButton}
        />

        {/* Добавить новое место */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          loader={isLoadingButton}
        />

        {/* Подтверждение удаления */}
        <ConfirmDeletePopup 
          isOpen={isComfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          loader={isLoadingButton}
        />

        {/* Превью большой картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        
    </div>
    
  );
  
}

export default App;
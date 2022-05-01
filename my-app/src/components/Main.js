import React, { useEffect } from "react"
import { optionsApi } from "../components/Utils/optionsApi"
import Api from "../components/Utils/Api"
import Card from "./Card"

const api = new Api(optionsApi)

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards } = props
    const [ userName, setUserName ] = React.useState()
    const [ userDescription, setUserDescription ] = React.useState()
    const [ userAvatar, setUserAvatar ] = React.useState()

useEffect(() => {
  api.getUserInfo()
    .then(res => {
          setUserName(res.name)
          setUserDescription(res.about)
          setUserAvatar(res.avatar)
        })
        .catch(err => console.log("Не нашел данные пользователя", err))
    })
  
    return (
        <main className="main">
          <section className="profile">
            <button className="profile__avatar-box" onClick={onEditAvatar}>
              <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
            </button>
                <div className="profile__info">
                   <div className="profile__name-container">
                     <h1 className="profile__name">{userName}</h1>
                     <button className="profile__edit-button link" type="button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
                   </div>
                   <p className="profile__job">{userDescription}</p>
                </div>
              <button className="profile__add-button link" type="button" onClick={onAddPlace} aria-label="Добавить"></button>
          </section>

          <section className="elements">
                {
                    cards.map(card => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        />
                    ))
                }
            </section>

        </main>
    )

}

export default Main
import { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"
import Popup from "./Popup"

function AddPlacePopup({ isOpen, onClose }) {
//    const { isOpen, onClose } = props

    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    return (
        <Popup
            onClose={onClose}
            isOpen={isOpen}
        >
            <PopupWithForm
                name="add"
                title="Новое место"
                buttonText={"Создать"}
                onClose={onClose}
            >
                <label className="popup__form-label">
                    <input className="popup__input popup__input_value_name" id="title-input" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" autoComplete="off" value={name} onChange={e => setName(e.target.value)}/>
                    <span className="popup__input-error title-input-error"></span>
                </label>
                <label className="popup__form-label">
                    <input className="popup__input popup__input_value_link" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" required value={link} onChange={e => setLink(e.target.value)}/>
                    <span className="popup__input-error link-input-error"></span>
                </label>
            </PopupWithForm>
        </Popup>
    )
}

export default AddPlacePopup
function PopupWithForm(props) {
    const { name, onClose, title, children, buttonText } = props

    return (
           <div className="popup__container">
              <button type="button" className="popup__close-button link" aria-label="Закрыть" onClick={onClose}></button>
              <form className="popup__form-container" name={name} noValidate>
                  <fieldset className="popup__form-fieldset">
                       <h3 className="popup__title">{title}</h3>
                       
                       {children}
                       
                       <button type="submit" className="popup__submit-button popup__submit-button_edit-form">{buttonText}</button>
                    </fieldset>
             </form>
           </div>       
    )
}

export default PopupWithForm
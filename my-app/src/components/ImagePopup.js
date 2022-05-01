import Popup from "./Popup"

function ImagePopup(props) {
    const { card, onClose } = props

    return (
        <Popup onClose={onClose} isOpen={card.isOpen}>
            <div className="popup__container">
              <button type="button" className="popup__close-button link" aria-label="Закрыть" onClick={onClose}></button>
              <figure className="popup__content-container">
                <img className="popup__image-big" src={card && card.link} alt={card && card.name}/>
                <figcaption className="popup__image-caption">{card.name}</figcaption>
              </figure>
            </div>          
        </Popup>
    )
}

export default ImagePopup



//<div className="popup_image-form">
//<button className="popup__close-button link" type="button" aria-label="Закрыть" onClick={onClose}></button>
//<img className="popup__image-big" src={card && card.link} alt={card && card.name}/>
//<p className="popup__image-caption">{card && card.name}</p>
//</div>
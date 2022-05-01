function Card(props) {
    const { card, onCardClick} = props

    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className="element">
            <div className="element__image-container">
                <button className="element__trash" type="button" aria-label="Удалить"></button>
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
            </div>
            <div className="element__info-container">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                   <button className="element__like" type="button" aria-label="нравится"></button>
                   <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card


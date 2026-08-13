import './ItemModal.css'

function ItemModal({ isOpen, onClose, selectedCard }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`modal item-modal ${isOpen ? 'modal_is-opened' : ''}`}
      onMouseDown={handleOverlayClick}
      aria-hidden={!isOpen}
      role="presentation"
    >
      {selectedCard && (
        <div className="item-modal__content" role="dialog" aria-modal="true">
          <button
            className="modal__close"
            type="button"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
          <img
            className="item-modal__image"
            src={selectedCard.link}
            alt={selectedCard.name}
          />
          <div className="item-modal__details">
            <h2 className="item-modal__title">{selectedCard.name}</h2>
            <p className="item-modal__weather">
              Weather: {selectedCard.weather.toLowerCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemModal

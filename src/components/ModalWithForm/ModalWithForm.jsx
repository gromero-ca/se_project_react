import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, title, name, buttonText, children }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
      aria-hidden={!isOpen}
      role="presentation"
    >
      <div className="modal__content" role="dialog" aria-modal="true">
        <button
          className="modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form
          className="modal__form"
          name={name}
          onSubmit={(event) => event.preventDefault()}
        >
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

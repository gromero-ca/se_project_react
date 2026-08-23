import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`delete-confirmation ${
        isOpen ? "delete-confirmation_is-opened" : ""
      }`}
      onMouseDown={handleOverlayClick}
      aria-hidden={!isOpen}
      role="presentation"
    >
      <div
        className="delete-confirmation__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirmation-title"
      >
        <button
          className="delete-confirmation__close"
          type="button"
          aria-label="Close confirmation"
          onClick={onClose}
        >
          ×
        </button>
        <h2
          className="delete-confirmation__title"
          id="delete-confirmation-title"
        >
          Delete this garment?
        </h2>
        <div className="delete-confirmation__actions">
          <button
            className="delete-confirmation__confirm"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="delete-confirmation__cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;

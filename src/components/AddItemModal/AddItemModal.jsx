import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = {
  name: "",
  imageUrl: "",
  weather: "warm",
};

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange, resetForm } = useForm(initialValues);

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(values)
      .then(resetForm)
      .catch(() => {});
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="New garment"
      name="new-garment"
      buttonText="Add garment"
    >
      <label className="modal-form__label" htmlFor="garment-name">
        Name
        <input
          id="garment-name"
          className="modal-form__input"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal-form__label" htmlFor="garment-image">
        Image URL
        <input
          id="garment-image"
          className="modal-form__input"
          name="imageUrl"
          type="url"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal-form__fieldset">
        <legend className="modal-form__legend">Select the weather type:</legend>
        <label className="modal-form__radio-label" htmlFor="weather-hot">
          <input
            id="weather-hot"
            name="weather"
            type="radio"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label className="modal-form__radio-label" htmlFor="weather-warm">
          <input
            id="weather-warm"
            name="weather"
            type="radio"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal-form__radio-label" htmlFor="weather-cold">
          <input
            id="weather-cold"
            name="weather"
            type="radio"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;

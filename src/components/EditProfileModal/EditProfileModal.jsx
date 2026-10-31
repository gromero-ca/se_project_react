import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = { name: "", avatar: "" };
function EditProfileModal({ isOpen, onClose, onUpdate, currentUser }) {
  const { values, handleChange, setValues } = useForm(initialValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
      setError("");
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    onUpdate(values).catch(() =>
      setError("Unable to update your profile. Please try again."),
    );
  }
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
    >
      <label className="modal-form__label" htmlFor="profile-name">
        Name
        <input
          className="modal-form__input"
          id="profile-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal-form__label" htmlFor="profile-avatar">
        Avatar URL
        <input
          className="modal-form__input"
          id="profile-avatar"
          name="avatar"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {error && (
        <p className="modal-form__error" role="alert">
          {error}
        </p>
      )}
    </ModalWithForm>
  );
}
export default EditProfileModal;

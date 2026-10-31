import { useState } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = { name: "", avatar: "", email: "", password: "" };

function RegisterModal({ isOpen, onClose, onRegister, onLogin }) {
  const { values, handleChange, resetForm } = useForm(initialValues);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    onRegister(values)
      .then(resetForm)
      .catch(() =>
        setError(
          "Unable to register or sign in. Please check your details and try again.",
        ),
      );
  }

  function handleClose() {
    resetForm();
    setError("");
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Sign up"
      name="register"
      buttonText="Sign up"
    >
      <label className="modal-form__label" htmlFor="register-email">
        Email
        <input
          className="modal-form__input"
          id="register-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal-form__label" htmlFor="register-password">
        Password
        <input
          className="modal-form__input"
          id="register-password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal-form__label" htmlFor="register-name">
        Name
        <input
          className="modal-form__input"
          id="register-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal-form__label" htmlFor="register-avatar">
        Avatar URL
        <input
          className="modal-form__input"
          id="register-avatar"
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
      <button className="modal-form__switch" type="button" onClick={onLogin}>
        or Log in
      </button>
    </ModalWithForm>
  );
}
export default RegisterModal;

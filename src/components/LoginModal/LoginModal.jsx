import { useState } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = { email: "", password: "" };

function LoginModal({ isOpen, onClose, onLogin, onRegister }) {
  const { values, handleChange, resetForm } = useForm(initialValues);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    onLogin(values)
      .then(resetForm)
      .catch(() =>
        setError("Unable to sign in. Please check your email and password."),
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
      title="Log in"
      name="login"
      buttonText="Log in"
    >
      <label className="modal-form__label" htmlFor="login-email">
        Email
        <input
          className="modal-form__input"
          id="login-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal-form__label" htmlFor="login-password">
        Password
        <input
          className="modal-form__input"
          id="login-password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      {error && (
        <p className="modal-form__error" role="alert">
          {error}
        </p>
      )}
      <button className="modal-form__switch" type="button" onClick={onRegister}>
        or Sign up
      </button>
    </ModalWithForm>
  );
}
export default LoginModal;

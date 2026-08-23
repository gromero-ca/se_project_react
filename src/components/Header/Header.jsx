import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/generic-avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData, onAddClothes }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  function toggleMobileMenu() {
    setIsMobileMenuOpened((isOpened) => !isOpened);
  }

  function handleAddClothes() {
    setIsMobileMenuOpened(false);
    onAddClothes();
  }

  return (
    <header className="header">
      <div className="header__content">
        <Link className="header__logo" to="/" aria-label="WTWR home">
          wtwr°
        </Link>
        <p className="header__date header__date_desktop">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__actions">
          <button
            className="header__add-clothes"
            type="button"
            onClick={onAddClothes}
          >
            + Add clothes
          </button>
          <ToggleSwitch />
          <Link className="header__profile-link" to="/profile">
            <span className="header__user-name">Gabriel Romero</span>
            <img className="header__avatar" src={avatar} alt="Gabriel Romero" />
          </Link>
        </div>
        <button
          className={`header__menu-button ${
            isMobileMenuOpened ? "header__menu-button_opened" : ""
          }`}
          type="button"
          aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpened}
          onClick={toggleMobileMenu}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          className={`header__mobile-menu ${
            isMobileMenuOpened ? "header__mobile-menu_opened" : ""
          }`}
        >
          <Link
            className="header__mobile-user"
            to="/profile"
            onClick={() => setIsMobileMenuOpened(false)}
          >
            <span className="header__mobile-user-name">Gabriel Romero</span>
            <img
              className="header__mobile-avatar"
              src={avatar}
              alt="Gabriel Romero photo avatar"
            />
          </Link>
          <button
            className="header__mobile-add-clothes"
            type="button"
            onClick={handleAddClothes}
          >
            + Add clothes
          </button>
          <ToggleSwitch />
        </div>
      </div>
      <p className="header__date header__date_mobile">
        {currentDate}, {weatherData.city}
      </p>
    </header>
  );
}

export default Header;

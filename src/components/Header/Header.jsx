import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({
  weatherData,
  onAddClothes,
  isLoggedIn,
  onLogin,
  onRegister,
}) {
  const currentUser = useContext(CurrentUserContext);
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
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <button
                className="header__add-clothes"
                type="button"
                onClick={onAddClothes}
              >
                + Add clothes
              </button>
              <Link className="header__profile-link" to="/profile">
                <span className="header__user-name">{currentUser?.name}</span>
                <Avatar className="header__avatar" user={currentUser} />
              </Link>
            </>
          ) : (
            <>
              <button
                className="header__add-clothes"
                type="button"
                onClick={onRegister}
              >
                Sign up
              </button>
              <button
                className="header__add-clothes"
                type="button"
                onClick={onLogin}
              >
                Log in
              </button>
            </>
          )}
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
          {isLoggedIn ? (
            <>
              <Link
                className="header__mobile-user"
                to="/profile"
                onClick={() => setIsMobileMenuOpened(false)}
              >
                <span className="header__mobile-user-name">
                  {currentUser?.name}
                </span>
                <Avatar className="header__mobile-avatar" user={currentUser} />
              </Link>
              <ToggleSwitch />
              <button
                className="header__mobile-add-clothes"
                type="button"
                onClick={handleAddClothes}
              >
                + Add clothes
              </button>
            </>
          ) : (
            <>
              <ToggleSwitch />
              <button
                className="header__mobile-add-clothes"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpened(false);
                  onRegister();
                }}
              >
                Sign up
              </button>
              <button
                className="header__mobile-add-clothes"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpened(false);
                  onLogin();
                }}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
      <p className="header__date header__date_mobile">
        {currentDate}, {weatherData.city}
      </p>
    </header>
  );
}

export default Header;

import { useState } from 'react'
import avatar from '../../assets/generic-avatar.png'
import './Header.css'

function Header({ weatherData, onAddClothes }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
  })

  function toggleMobileMenu() {
    setIsMobileMenuOpened((isOpened) => !isOpened)
  }

  function handleAddClothes() {
    setIsMobileMenuOpened(false)
    onAddClothes()
  }

  return (
    <header className="header">
      <div className="header__content">
        <a className="header__logo" href="/" aria-label="WTWR home">
          wtwr°
        </a>
        <p className="header__date header__date_desktop">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__actions">
          <button className="header__add-clothes" type="button" onClick={onAddClothes}>
            + Add clothes
          </button>
          <p className="header__user-name">Gabriel Romero</p>
          <img className="header__avatar" src={avatar} alt="Gabriel Romero" />
        </div>
        <button
          className={`header__menu-button ${
            isMobileMenuOpened ? 'header__menu-button_opened' : ''
          }`}
          type="button"
          aria-label={isMobileMenuOpened ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpened}
          onClick={toggleMobileMenu}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          className={`header__mobile-menu ${
            isMobileMenuOpened ? 'header__mobile-menu_opened' : ''
          }`}
        >
          <div className="header__mobile-user">
            <p className="header__mobile-user-name">Gabriel Romero</p>
            <img className="header__mobile-avatar" src={avatar} alt="" />
          </div>
          <button
            className="header__mobile-add-clothes"
            type="button"
            onClick={handleAddClothes}
          >
            + Add clothes
          </button>
        </div>
      </div>
      <p className="header__date header__date_mobile">
        {currentDate}, {weatherData.city}
      </p>
    </header>
  )
}

export default Header

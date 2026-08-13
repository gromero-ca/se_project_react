import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultClothingItems } from "../../utils/clothingItems";
import { coordinates, fallbackWeather } from "../../utils/constants";
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(fallbackWeather);
  const [clothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const hasLoadedWeather = useRef(false);

  useEffect(() => {
    if (hasLoadedWeather.current) {
      return undefined;
    }

    hasLoadedWeather.current = true;
    getWeatherData(coordinates)
      .then((data) => setWeatherData(data))
      .catch(() => setWeatherData(fallbackWeather));

    return undefined;
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveModal("");
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function handleOpenAddClothes() {
    setActiveModal("add-clothes");
  }

  function handleOpenCard(card) {
    setSelectedCard(card);
    setActiveModal("item");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} onAddClothes={handleOpenAddClothes} />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleOpenCard}
        />
        <Footer />
      </div>
      <ModalWithForm
        isOpen={activeModal === "add-clothes"}
        onClose={handleCloseModal}
        title="New garment"
        name="new-garment"
        buttonText="Add garment"
      >
        <label className="modal-form__label" htmlFor="garment-name">
          Name
          <input id="garment-name" className="modal-form__input" type="text" />
        </label>
        <label className="modal-form__label" htmlFor="garment-image">
          Image URL
          <input id="garment-image" className="modal-form__input" type="url" />
        </label>
        <fieldset className="modal-form__fieldset">
          <legend className="modal-form__legend">
            Select the weather type:
          </legend>
          <label className="modal-form__radio-label" htmlFor="weather-hot">
            <input id="weather-hot" name="weather" type="radio" value="hot" />
            Hot
          </label>
          <label className="modal-form__radio-label" htmlFor="weather-warm">
            <input
              id="weather-warm"
              name="weather"
              type="radio"
              value="warm"
              defaultChecked
            />
            Warm
          </label>
          <label className="modal-form__radio-label" htmlFor="weather-cold">
            <input id="weather-cold" name="weather" type="radio" value="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "item"}
        onClose={handleCloseModal}
        selectedCard={selectedCard}
      />
    </div>
  );
}

export default App;

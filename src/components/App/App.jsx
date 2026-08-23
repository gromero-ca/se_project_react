import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, deleteItem, getItems } from "../../utils/api";
import { coordinates, fallbackWeather } from "../../utils/constants";
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(fallbackWeather);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const hasLoadedWeather = useRef(false);
  const hasLoadedItems = useRef(false);

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
    if (hasLoadedItems.current) {
      return undefined;
    }

    hasLoadedItems.current = true;
    getItems()
      .then((items) => setClothingItems(items))
      .catch(() => setClothingItems([]));

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

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  }

  function handleOpenAddClothes() {
    setActiveModal("add-clothes");
  }

  function handleOpenCard(card) {
    setSelectedCard(card);
    setActiveModal("item");
  }

  function handleOpenDelete(card) {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  }

  function handleCancelDelete() {
    setCardToDelete(null);
    setActiveModal("item");
  }

  function handleAddItem(item) {
    return addItem(item)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        handleCloseModal();
        return newItem;
      })
      .catch((error) => {
        throw error;
      });
  }

  function handleConfirmDelete() {
    if (!cardToDelete) {
      return Promise.resolve();
    }

    return deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id),
        );
        handleCloseModal();
      })
      .catch((error) => {
        throw error;
      });
  }

  const contextValue = {
    currentTemperatureUnit,
    handleToggleSwitchChange,
  };

  return (
    <BrowserRouter>
      <CurrentTemperatureUnitContext.Provider value={contextValue}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              onAddClothes={handleOpenAddClothes}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleOpenCard}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onAddClothes={handleOpenAddClothes}
                    onCardClick={handleOpenCard}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-clothes"}
            onAddItem={handleAddItem}
            onClose={handleCloseModal}
          />
          <ItemModal
            isOpen={activeModal === "item"}
            onClose={handleCloseModal}
            onDelete={handleOpenDelete}
            selectedCard={selectedCard}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;

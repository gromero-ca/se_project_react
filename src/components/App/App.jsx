import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { signup, signin, getCurrentUser } from "../../utils/auth";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  addCardLike,
  addItem,
  deleteItem,
  getItems,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { coordinates, fallbackWeather } from "../../utils/constants";
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(
    Boolean(localStorage.getItem("jwt")),
  );
  const [weatherData, setWeatherData] = useState(fallbackWeather);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const hasLoadedWeather = useRef(false);
  const hasLoadedItems = useRef(false);

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
    setDeleteError("");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    let active = true;
    getCurrentUser(token)
      .then((user) => {
        if (active) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        if (active) localStorage.removeItem("jwt");
      })
      .finally(() => {
        if (active) setIsCheckingAuth(false);
      });
    return () => {
      active = false;
    };
  }, []);

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
    if (!activeModal) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeModal, handleCloseModal]);

  function handleLogin(data) {
    return signin(data).then(({ token }) => {
      if (!token) throw new Error("Missing token");
      return getCurrentUser(token).then((user) => {
        localStorage.setItem("jwt", token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
      });
    });
  }

  function handleRegister(data) {
    return signup(data).then(() =>
      handleLogin({ email: data.email, password: data.password }),
    );
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
  }

  function handleUpdateProfile(data) {
    return updateProfile(data, localStorage.getItem("jwt")).then((user) => {
      setCurrentUser(user);
      handleCloseModal();
    });
  }

  function handleCardLike(item) {
    const isLiked = item.likes?.includes(currentUser?._id);
    const request = isLiked ? removeCardLike : addCardLike;
    request(item._id, localStorage.getItem("jwt"))
      .then((updated) =>
        setClothingItems((items) =>
          items.map((card) => (card._id === updated._id ? updated : card)),
        ),
      )
      .catch((error) => console.error(error));
  }

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
    setDeleteError("");
    setActiveModal("delete-confirmation");
  }

  function handleCancelDelete() {
    setCardToDelete(null);
    setDeleteError("");
    setActiveModal("item");
  }

  function handleAddItem(item) {
    return addItem(item, localStorage.getItem("jwt")).then((newItem) => {
      setClothingItems((items) => [newItem, ...items]);
      handleCloseModal();
      return newItem;
    });
  }

  function handleConfirmDelete() {
    if (!cardToDelete) {
      return Promise.resolve();
    }

    return deleteItem(cardToDelete._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id),
        );
        handleCloseModal();
      })
      .catch((error) => {
        setDeleteError(
          error.message || "Unable to delete this garment. Please try again.",
        );
      });
  }

  const contextValue = {
    currentTemperatureUnit,
    handleToggleSwitchChange,
  };

  return (
    <BrowserRouter>
      <CurrentTemperatureUnitContext.Provider value={contextValue}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <div className="page__content">
              <Header
                weatherData={weatherData}
                onAddClothes={handleOpenAddClothes}
                isLoggedIn={isLoggedIn}
                onLogin={() => setActiveModal("login")}
                onRegister={() => setActiveModal("register")}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleOpenCard}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      isCheckingAuth={isCheckingAuth}
                    >
                      <Profile
                        clothingItems={clothingItems.filter(
                          (item) => item.owner === currentUser?._id,
                        )}
                        onAddClothes={handleOpenAddClothes}
                        onCardClick={handleOpenCard}
                        onCardLike={handleCardLike}
                        onLogout={handleLogout}
                        onEditProfile={() => setActiveModal("edit-profile")}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLogin={handleLogin}
              onRegister={() => setActiveModal("register")}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegister={handleRegister}
              onLogin={() => setActiveModal("login")}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={handleCloseModal}
              onUpdate={handleUpdateProfile}
              currentUser={currentUser}
            />
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
              error={deleteError}
            />
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;

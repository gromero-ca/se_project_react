import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData, clothingItems, onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temperature[currentTemperatureUnit];
  const filteredItems = clothingItems.filter((item) => {
    const itemWeather = item.weather.toLowerCase();
    return itemWeather === weatherData.condition;
  });

  return (
    <main className="main">
      <WeatherCard temperature={weatherData.temperature} />
      <section className="clothing-section">
        <h1 className="clothing-section__title">
          Today is {temperature}° {currentTemperatureUnit} / You may want to
          wear:
        </h1>
        <ul className="clothing-items">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onClick={onCardClick}
              onLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

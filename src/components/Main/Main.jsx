import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData, clothingItems, onCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.condition,
  );

  return (
    <main className="main">
      <WeatherCard temperature={weatherData.temperature} />
      <section className="clothing-section">
        <h1 className="clothing-section__title">
          Today is {weatherData.temperature}° F / You may want to wear:
        </h1>
        <ul className="clothing-items">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

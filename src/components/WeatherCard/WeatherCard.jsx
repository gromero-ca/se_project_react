import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import weatherMask from "../../assets/weather-banner.svg";
import "./WeatherCard.css";

function WeatherCard({ temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card" aria-label="Current weather">
      <img
        className="weather-card__image"
        src={weatherMask}
        alt="Weather illustration"
      />
      <p className="weather-card__temperature">
        {temperature[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;

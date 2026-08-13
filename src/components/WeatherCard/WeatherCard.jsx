import weatherMask from "../../assets/weather-banner.svg";
import "./WeatherCard.css";

function WeatherCard({ temperature }) {
  return (
    <section className="weather-card" aria-label="Current weather">
      <img className="weather-card__image" src={weatherMask} alt="" />
      <p className="weather-card__temperature">{temperature}°F</p>
    </section>
  );
}

export default WeatherCard;

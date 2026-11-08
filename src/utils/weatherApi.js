import { checkResponse } from "./api";
import { apiKey, fallbackWeather } from "./constants";

function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  }

  if (temperature >= 66) {
    return "warm";
  }

  return "cold";
}

async function getWeatherData({ latitude, longitude }) {
  const url = apiKey
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
    : `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;
  const response = await fetch(url).then(checkResponse);

  const data = await response.json();
  const fahrenheit = Math.round(
    apiKey ? data.main.temp : data.current.temperature_2m,
  );
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));

  return {
    city: data.name || fallbackWeather.city,
    temperature: {
      F: fahrenheit,
      C: celsius,
    },
    condition: getWeatherCondition(fahrenheit),
  };
}

export { getWeatherCondition, getWeatherData };

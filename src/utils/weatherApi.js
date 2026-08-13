import { apiKey, fallbackWeather } from './constants'

function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return 'hot'
  }

  if (temperature >= 66) {
    return 'warm'
  }

  return 'cold'
}

async function getWeatherData({ latitude, longitude }) {
  if (!apiKey) {
    return fallbackWeather
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Weather request failed')
  }

  const data = await response.json()
  const temperature = Math.round(data.main.temp)

  return {
    city: fallbackWeather.city,
    temperature,
    condition: getWeatherCondition(temperature),
  }
}

export { getWeatherCondition, getWeatherData }

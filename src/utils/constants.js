const coordinates = {
  latitude: 33.7839,
  longitude: -116.9586,
};

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || "";

const fallbackWeather = {
  city: "San Jacinto, California",
  temperature: 75,
  condition: "warm",
};

export { apiKey, coordinates, fallbackWeather };

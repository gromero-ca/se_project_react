# WTWR

WTWR is a responsive weather-based clothing recommendation app. It displays the current temperature, filters clothing suggestions by weather condition, supports Fahrenheit and Celsius, and includes a profile page for managing clothing items.

![WTWR responsive app cover](public/images/wtwr-readme-cover.png)

## Technologies

- React
- Vite
- JavaScript
- CSS media queries
- React Router
- React Context API
- Custom `useForm` hook
- Express and MongoDB backend
- OpenWeather API
- Prettier for consistent code formatting

## Running locally

Install the dependencies:

```bash
npm install
```

Start MongoDB and the [WTWR backend](https://github.com/gromero-ca/se_project_express) on port 3001. Follow its README for setup, then run:

```bash
npm start
```

In a second terminal, start the React application:

```bash
npm run dev
```

To use live weather data, add an OpenWeather API key to `.env`:

```bash
VITE_OPENWEATHER_API_KEY=your_api_key
```

The app uses San Jacinto, California as its default location and shows fallback weather data when the key is missing or the request fails. The Express API runs at `http://localhost:3001`. Sign up or log in to manage clothing items and your profile. Authentication persists using a JWT in local storage.

## Project pitch video

[Watch the WTWR project pitch video on Google Drive](https://drive.google.com/file/d/1e0KhMCgZBaBdlMv7soX721Pei-ui0Iqm/view?usp=sharing)

Run `npm run format` to format the project with Prettier.

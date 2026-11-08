# WTWR

WTWR is a responsive weather-based clothing recommendation app. It displays the current temperature, filters clothing suggestions by weather condition, supports Fahrenheit and Celsius, and includes a profile page for managing clothing items.

![WTWR responsive app cover](public/images/wtwr-readme-cover.png)

## Deployed app

Visit [WTWR](https://35.209.135.208.sslip.io).

## Technologies

- React
- Vite
- JavaScript
- CSS media queries
- React Router
- React Context API
- Custom `useForm` hook
- Express and MongoDB backend
- OpenWeather and Open-Meteo weather APIs
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

To use OpenWeather instead, add an OpenWeather API key to `.env`. Vite exposes this key to anyone who can access the frontend; use a restricted key and never use this option for a secret:

```bash
VITE_OPENWEATHER_API_KEY=your_api_key
```

The app uses San Jacinto, California as its default location. Without an OpenWeather key, it uses [Open-Meteo](https://open-meteo.com/) for current weather. It shows fallback weather data if the request fails. The Express API runs at `http://localhost:3001`. Sign up or log in to manage clothing items and your profile. Authentication persists using a JWT in local storage.

## Production build

Set `VITE_API_URL` to the deployed HTTPS API address when building for production:

```bash
VITE_API_URL=https://api.example.com npm run build
```

Without this setting, the app uses `http://localhost:3001` for local testing. Do not put secrets in `VITE_` variables because they are included in the browser bundle.

## Project pitch video

[Watch the WTWR project pitch video on Google Drive](https://drive.google.com/file/d/1e0KhMCgZBaBdlMv7soX721Pei-ui0Iqm/view?usp=sharing)

Run `npm run format` to format the project with Prettier.

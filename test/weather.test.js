import { test } from "node:test";
import process from "node:process";
import assert from "node:assert/strict";
import { createServer } from "vite";

test("fetches current weather when no API key is configured", async () => {
  process.env.VITE_OPENWEATHER_API_KEY = "";
  const server = await createServer({ server: { middlewareMode: true } });
  const originalFetch = globalThis.fetch;
  try {
    const { getWeatherData } = await server.ssrLoadModule(
      "/src/utils/weatherApi.js",
    );
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ current: { temperature_2m: 70 } }), {
        status: 200,
      });
    const weather = await getWeatherData({
      latitude: 33.7839,
      longitude: -116.9586,
    });
    assert.equal(weather.temperature.F, 70);
    assert.equal(weather.temperature.C, 21);
    assert.equal(weather.condition, "warm");
  } finally {
    globalThis.fetch = originalFetch;
    await server.close();
  }
});

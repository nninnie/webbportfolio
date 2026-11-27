/* -----------------------------------------
   🌤️ VÄDER – Open-Meteo (gratis API, ingen nyckel behövs)
----------------------------------------- */

import { isEnglishPage, setText } from "./utils.js";

const WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&current_weather=true";

// Om API:et inte svarar inom 5 sekunder ger vi upp och visar "Väder saknas"
const TIMEOUT_MS = 5000;

// Open-Meteo skickar en väderkod (WMO).
// En tabell: ikon + text på svenska och engelska för varje kod.
const WEATHER_CODES = {
    0:  { icon: "☀️", sv: "Klart",                       en: "Clear" },
    1:  { icon: "🌤️", sv: "Mest klart",                  en: "Mostly clear" },
    2:  { icon: "⛅", sv: "Delvis molnigt",              en: "Partly cloudy" },
    3:  { icon: "☁️", sv: "Mulet",                       en: "Overcast" },
    45: { icon: "🌫️", sv: "Dimma",                       en: "Fog" },
    48: { icon: "🌫️", sv: "Dimma",                       en: "Fog" },
    51: { icon: "🌧️", sv: "Lätt duggregn",               en: "Light drizzle" },
    53: { icon: "🌧️", sv: "Duggregn",                    en: "Drizzle" },
    55: { icon: "🌧️", sv: "Kraftigt duggregn",           en: "Heavy drizzle" },
    56: { icon: "🌧️", sv: "Underkylt duggregn",          en: "Freezing drizzle" },
    57: { icon: "🌧️", sv: "Kraftigt underkylt duggregn", en: "Heavy freezing drizzle" },
    61: { icon: "🌧️", sv: "Lätt regn",                   en: "Light rain" },
    63: { icon: "🌧️", sv: "Regn",                        en: "Rain" },
    65: { icon: "🌧️", sv: "Kraftigt regn",               en: "Heavy rain" },
    66: { icon: "🌧️", sv: "Underkylt regn",              en: "Freezing rain" },
    67: { icon: "🌧️", sv: "Kraftigt underkylt regn",     en: "Heavy freezing rain" },
    71: { icon: "❄️", sv: "Lätt snöfall",                en: "Light snow" },
    73: { icon: "❄️", sv: "Snöfall",                     en: "Snow" },
    75: { icon: "❄️", sv: "Kraftigt snöfall",            en: "Heavy snow" },
    77: { icon: "❄️", sv: "Snökorn",                     en: "Snow grains" },
    80: { icon: "🌦️", sv: "Skurar",                      en: "Showers" },
    81: { icon: "🌦️", sv: "Regnskurar",                  en: "Rain showers" },
    82: { icon: "🌦️", sv: "Kraftiga regnskurar",         en: "Heavy rain showers" },
    85: { icon: "🌨️", sv: "Snöbyar",                     en: "Snow showers" },
    86: { icon: "🌨️", sv: "Kraftiga snöbyar",            en: "Heavy snow showers" },
    95: { icon: "⛈️", sv: "Åska",                        en: "Thunderstorm" },
    96: { icon: "⛈️", sv: "Åska med lätt hagel",         en: "Thunderstorm with light hail" },
    99: { icon: "⛈️", sv: "Åska med kraftigt hagel",     en: "Thunderstorm with heavy hail" }
};

// Används om API:et skickar en kod som inte finns i tabellen
const UNKNOWN_WEATHER = { icon: "🌡️", sv: "Okänt väder", en: "Unknown weather" };

// async/await: väntar på svaret utan att låsa sidan
export async function initWeather() {
    try {
        // AbortSignal.timeout avbryter anropet om det tar för lång tid
        const response = await fetch(WEATHER_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });

        // fetch kastar inte fel vid 404/500 – därför kollar vi själva
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const weather = WEATHER_CODES[data.current_weather.weathercode] || UNKNOWN_WEATHER;

        const icon = weather.icon;
        const desc = isEnglishPage ? weather.en : weather.sv;

        // Samma data visas på flera ställen
        setText("weather", `${temp}°C ${icon}`);             // navbar
        setText("weatherIcon", icon);                        // enhetens widget
        setText("weatherTemp", `${temp}°`);
        setText("weatherDesc", desc);
        setText("taskbarWeather", `${icon} ${temp}° ${desc}`); // laptopens aktivitetsfält

    } catch (err) {
        console.error("Weather error:", err);
        setText("weatherDesc", isEnglishPage ? "Weather unavailable" : "Väder saknas");
    }
}

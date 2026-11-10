/* -----------------------------------------
   🌤️ VÄDER – Open-Meteo (gratis API, ingen nyckel behövs)
----------------------------------------- */

import { isEnglishPage, setText } from "./utils.js";

const WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&current_weather=true";

// Open-Meteo skickar en väderkod (WMO) – här översätts den till text
const weatherDescriptionsSv = {
    0: "Klart",
    1: "Mest klart",
    2: "Delvis molnigt",
    3: "Mulet",
    45: "Dimma",
    48: "Dimma",
    51: "Lätt duggregn",
    53: "Duggregn",
    55: "Kraftigt duggregn",
    61: "Lätt regn",
    63: "Regn",
    65: "Kraftigt regn",
    71: "Lätt snöfall",
    73: "Snöfall",
    75: "Kraftigt snöfall",
    80: "Skurar",
    81: "Regnskurar",
    82: "Kraftiga regnskurar",
    95: "Åska",
    96: "Åska med lätt hagel",
    99: "Åska med kraftigt hagel"
};

const weatherDescriptionsEn = {
    0: "Clear",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    80: "Showers",
    81: "Rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail"
};

// Väderkod → ikon (intervall, eftersom flera koder betyder samma sak)
function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";
    return "🌡️";
}

// async/await: väntar på svaret utan att låsa sidan
export async function initWeather() {
    try {
        const response = await fetch(WEATHER_URL);

        // fetch kastar inte fel vid 404/500 – därför kollar vi själva
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        const icon = getWeatherIcon(code);
        const descriptions = isEnglishPage ? weatherDescriptionsEn : weatherDescriptionsSv;
        const desc = descriptions[code] || (isEnglishPage ? "Unknown weather" : "Okänt väder");

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

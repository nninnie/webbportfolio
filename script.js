/* -----------------------------------------
   🌞 / 🌙  TEMA-TOGGLE (sol i light mode, måne i dark mode)
----------------------------------------- */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    // Light mode → visa måne
    if (document.body.classList.contains("light")) {
        themeToggle.textContent = "🌑";
    } 
    // Dark mode → visa sol
    else {
        themeToggle.textContent = "🌕";
    }
});


/* -----------------------------------------
   🎨  GLOW COLOR PICKER (sparas i localStorage)
----------------------------------------- */
const glowPicker = document.getElementById("glowPicker");
const openColorPicker = document.getElementById("openColorPicker");

// Ladda sparad glow-färg om den finns
const savedGlow = localStorage.getItem("glowColor");
if (savedGlow) {
    document.documentElement.style.setProperty("--glow", savedGlow);
    glowPicker.value = savedGlow;
}

// Klick på 🎨 öppnar färgväljaren
openColorPicker.addEventListener("click", () => {
    glowPicker.click();
});

// När användaren väljer färg
glowPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty("--glow", color);
    localStorage.setItem("glowColor", color);
});


/* -----------------------------------------
   🌤️  VÄDER-API (Open-Meteo)
----------------------------------------- */
async function loadWeather() {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&current_weather=true"
        );

        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        const weatherEl = document.getElementById("weather");

        // Ikon baserat på väderkod
        let icon = "☀️";
        if (code >= 45 && code <= 48) icon = "🌫️";
        if (code >= 51 && code <= 67) icon = "🌧️";
        if (code >= 71 && code <= 77) icon = "❄️";
        if (code >= 80 && code <= 82) icon = "🌦️";
        if (code >= 95) icon = "⛈️";

        weatherEl.textContent = `${temp}°C ${icon}`;
    } catch (err) {
        console.log("Weather error:", err);
    }
}

loadWeather();


/* -----------------------------------------
   🍔  HAMBURGARMENY (öppna/stäng)
----------------------------------------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
});


window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 10) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

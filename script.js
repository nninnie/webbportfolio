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

// När användaren väljer färg
glowPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty("--glow", color);
    localStorage.setItem("glowColor", color);
});

// Ladda sparad glow vid start
const savedGlow = localStorage.getItem("glowColor");
if (savedGlow) {
    document.documentElement.style.setProperty("--glow", savedGlow);
    glowPicker.value = savedGlow;
} else {
    // Standard Samsung-blå glow
    document.documentElement.style.setProperty("--glow", "#003B73");
    glowPicker.value = "#003B73";
}


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


/* -----------------------------------------
   📜 NAVBAR SCROLL-EFFEKT
----------------------------------------- */
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 10) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});


/* -----------------------------------------
   📩 Kontaktformulär: skicka utan redirect + visa popup
----------------------------------------- */
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stoppar FormSubmit från att ladda om sidan

    const form = this;
    const formData = new FormData(form);

    // Skicka formuläret via fetch (AJAX)
    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(() => {
        // Visa popup
        document.getElementById("successPopup").style.display = "block";

        // Dölj popup efter 4 sekunder
        setTimeout(() => {
            document.getElementById("successPopup").style.display = "none";
        }, 4000);

        // Rensa formuläret
        form.reset();
    })
    .catch(error => console.log("FormSubmit error:", error));
});


/* -----------------------------------------
   📁 Mappar Portfolio: popover-kort
----------------------------------------- */
const projects = {
    "Kassasystem App": {
        description: "Ett av mina första .NET-projekt. Byggt i C# med SQL-databas, CRUD-funktionalitet och fokus på att lära mig grunderna i objektorientering och datalagring.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem#readme",
        tech: ["C#", ".NET", "SQL", "CRUD", "OOP"]
    },

    "Hotell App": {
        description: "Mitt första fullstack-inspirerade projekt i .NET. Jag tränade på API-anrop, SQL-hantering, systemstruktur och backend-logik.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL", "API", "Backend"]
    },

    "Webbportfolio": {
        description: "Min första riktiga portfolio byggd från grunden med HTML, CSS och JavaScript. Fokus på glow UI, modern design, responsivitet och interaktiva komponenter.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.github.io/webbportfolio/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "Glow UI"]
    }
};

const modal = document.getElementById("projectModal");
const titleEl = document.getElementById("projectTitle");
const descEl = document.getElementById("projectDescription");
const githubEl = document.getElementById("githubLink");
const demoEl = document.getElementById("demoLink");

// Öppna popover när man klickar på en mapp
document.querySelectorAll(".folder-item").forEach(folder => {
    folder.addEventListener("click", (e) => {
        e.stopPropagation(); // hindrar att klicket stänger direkt via document-click

        const name = folder.querySelector(".folder-title").textContent;

        titleEl.textContent = name;
        descEl.textContent = projects[name].description;
        githubEl.href = projects[name].github;
        demoEl.href = projects[name].demo;

        const rect = folder.getBoundingClientRect();
        const modalWidth = 280;

        // Centrera popover över mappen
        const left = rect.left + (rect.width / 2) - (modalWidth / 2);
        const top = Math.max(20, rect.top - 150);

        modal.style.left = left + "px";
        modal.style.top = top + "px";
        modal.style.display = "block";
    });
});

// Stäng popover när man klickar utanför
document.addEventListener("click", (e) => {
    if (!modal.contains(e.target) && !e.target.closest(".folder-item")) {
        modal.style.display = "none";
    }
});

// Stäng med ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});
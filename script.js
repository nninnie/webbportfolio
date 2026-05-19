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
        description: "Ett .NET-projekt byggt i C# i Visual Studio med SQL-databas. Jag arbetade med CRUD-funktionalitet, OOP och en tydlig mappstruktur. Jag började även tillämpa SOLID och DRY för att skriva mer hållbar kod.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem#readme",
        tech: ["C#", "OOP"]
    },

    "Hotell App": {
        description: "Ett mer avancerat .NET-projekt där jag använde C# och SQL via Code First. Jag arbetade med datamodellering, CRUD-logik och en renare arkitektur med tydligare mappar och klasser. Här fördjupade jag mina kunskaper i OOP, SOLID och DRY.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", "SQL"]
    },

    "Webbportfolio": {
        description: "En egenbyggd webbportfolio utvecklad i Visual Studio Code med HTML5, CSS3 och JavaScript. Fokus låg på glow UI, responsiv design och interaktiva komponenter. Projektet gav mig praktisk erfarenhet av modern frontend-utveckling och struktur.",
        github: "https://nninnie.github.io/webbportfolio",
        demo: "https://github.com/nninnie/webbportfolio#readme",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"]
    }
};

const techIcons = {
    "HTML": "devicon-html5-plain colored",
    "CSS": "devicon-css3-plain colored",
    "JavaScript": "devicon-javascript-plain colored",
    "UI/UX": "devicon-figma-plain colored",
    "API": "devicon-nodejs-plain colored",
    "C#": "devicon-csharp-plain colored",
    ".NET": "devicon-dotnetcore-plain colored",
    "SQL": "devicon-microsoftsqlserver-plain colored",
    "OOP": "devicon-code-plain colored"

};

const modal = document.getElementById("projectModal");
const titleEl = document.getElementById("projectTitle");
const descEl = document.getElementById("projectDescription");
const githubEl = document.getElementById("githubLink");
const demoEl = document.getElementById("demoLink");
const techEl = document.getElementById("projectTech");

// Öppna modal
document.querySelectorAll(".folder-item").forEach(folder => {
    folder.addEventListener("click", (e) => {
        e.stopPropagation();

        const name = folder.querySelector(".folder-title").textContent;
        const project = projects[name];

        titleEl.textContent = name;
        descEl.textContent = project.description;
        githubEl.href = project.github;
        demoEl.href = project.demo;

        // 🔥 GENERERA IKONERNA HÄR
        techEl.innerHTML = project.tech
            .map(t => `<i class="${techIcons[t] || ''}"></i>`)
            .join("");

        modal.style.display = "flex";
    });
});

// Stäng med X
document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.display = "none";
});

// Stäng när man klickar utanför
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
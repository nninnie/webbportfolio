/* -----------------------------------------
   🌕 / 🌑  TEMA-TOGGLE (sol i light mode, måne i dark mode)
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

// Glow vid start
const savedGlow = localStorage.getItem("glowColor");

    document.documentElement.style.setProperty("--glow", "#1429a056");
    glowPicker.value = "#1429a0c0";



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

        let icon = "☀️"; 

        if (code === 0) icon = "☀️";        
        if (code === 1) icon = "🌤️";        
        if (code === 2) icon = "⛅";         
        if (code === 3) icon = "☁️";         

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
    e.preventDefault(); // stoppar från att ladda om sidan

    const form = this;
    const formData = new FormData(form);

    // skickar formuläret via fetch (AJAX)
    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(() => {
        // Visa popup
        document.getElementById("successPopup").style.display = "block";

        // döljer popup efter 4 sek
        setTimeout(() => {
            document.getElementById("successPopup").style.display = "none";
        }, 4000);

        // rensar
        form.reset();
    })
    .catch(error => console.log("FormSubmit error:", error));
});

/* -----------------------------------------
   📁 Portfolio Mappar - öppna/stänga
----------------------------------------- */
const projects = {
    "Kassasystem": {
    description:
        "Modernt kassasystem byggt i .NET med C# och SQL.",

    fullDescription:
        "Ett kassasystem utvecklat i C# med fokus på tydlig mappstruktur, OOP och ren kod. Projektet gav praktisk erfarenhet av DRY- och SOLID-principer för att skapa en mer strukturerad och underhållbar applikation.",

    github:
        "https://github.com/nninnie/CashRegisterSystem",

    demo:
        "https://github.com/nninnie/CashRegisterSystem#readme",

    tech: [
        "C#",
        ".NET"
    ],

    features: [
        "CRUD-operationer",
        "OOP-struktur",
        "SOLID"
    ],

    img: "image/portfolio/cashregistersystem.png"


},

"Hotell App": {
    description:
        "Modernt hotellbokningssystem byggt i .NET och SQL Server.",

    fullDescription:
         "Ett hotellbokningssystem utvecklat i C# och SQL Server med Code First som grund för databashantering och datamodellering. Projektet fokuserade på OOP, strukturerad mappstruktur och SOLID-principer för att skapa en skalbar och underhållbar applikation.",
    github:
        "https://github.com/nninnie/HotelBooking",

    demo:
        "https://github.com/nninnie/HotelBooking#readme",

    tech: [
        "C#",
        ".NET",
        "SQL"
    ],

    features: [
        "CRUD-operationer",
        "OOP-struktur",
        "Code First",
        "Databashantering",
        "SOLID"
    ],

    img: "image/portfolio/hotelbooking.png"
},

"Webbportfolio": {
    description:
        "Modern UI/UX-portfolio byggd i HTML, CSS och JavaScript.",

    fullDescription:
        "En egenutvecklad portfolio skapad med HTML5, CSS3 och JavaScript med fokus på modern frontend-utveckling, responsiv design och interaktiva komponenter. Projektet innehåller bland annat dark/light mode, API-integrationer och UI/UX-inspirerad design.",
    github:
        "https://github.com/nninnie/webbportfolio",

    demo:
        "https://nninnie.github.io/webbportfolio/",

    tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "UI/UX",
        "API"
    ],

    features: [
        "Responsiv design",
        "Glow Color Picker",
        "Dark/Light mode",
        "Weather API",
        "Interaktiva komponenter"
    ],

    img: "image/portfolio/webbportfolio.png"
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

const projectsGrid = document.getElementById("projectsGrid");

Object.entries(projects).forEach(([title, data]) => {
    const card = document.createElement("div");
    card.className = "folder-item project-card";

    card.innerHTML = `
        <div class="project-icon"><img src="image/icons/folder.png" alt="folder" class="folder-icon"></div>
        
        <span class="folder-title">${title}</span>
        <p>${data.description}</p>
        

<div class="project-tags">
    ${data.tech.map(t => `<span class="tag">${t}</span>`).join("")}
</div> 
        
    `;

    projectsGrid.appendChild(card);
});


const modal = document.getElementById("projectModal");
const titleEl = document.getElementById("projectTitle");
const descEl = document.getElementById("projectDescription");
const githubEl = document.getElementById("githubLink");
const demoEl = document.getElementById("demoLink");
const techEl = document.getElementById("projectTech");
const features = document.getElementById("features");

// Öppna modal
document.querySelectorAll(".folder-item").forEach(folder => {
    folder.addEventListener("click", (e) => {
        e.stopPropagation();
        

        const name = folder.querySelector(".folder-title").textContent;
        const project = projects[name];

        titleEl.textContent = name;
    
techEl.innerHTML = `
            <div class="card-tech">
                ${project.tech
                    .map(t => `<i class="${techIcons[t] || ''}"></i>`)
                    .join("")}
            </div>
        `;

        descEl.innerHTML = project.fullDescription;


        features.innerHTML = project.features
    .map(f => `<li>${f}</li>`)
    .join("");


        githubEl.href = project.github;
        demoEl.href = project.demo;

        modal.style.display = "flex";

    });
});

// stänger med x
document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.display = "none";
});

// stänger när man klickar utanför
const modalContent = document.querySelector(".project-modal-content");

document.addEventListener("click", (e) => {
    if (modal.style.display === "flex" &&
        !modalContent.contains(e.target) &&
        !e.target.closest(".folder-item")) 
    {
        modal.style.display = "none";
    }
});

// stänga med ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});
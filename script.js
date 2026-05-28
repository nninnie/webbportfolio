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
    description:
        "Modernt kassasystem byggt i .NET och SQL.",

    fullDescription:
        "Ett kassasystem utvecklat i C# med fokus på tydlig mappstruktur, OOP och ren kod. Projektet gav praktisk erfarenhet av DRY- och SOLID-principer för att skapa en mer strukturerad och underhållbar applikation.",

    github:
        "https://github.com/nninnie/CashRegisterSystem",

    demo:
        "https://github.com/nninnie/CashRegisterSystem#readme",

    tech: [
        "C#",
        ".NET",
        "SQL Server"
    ],

    features: [
        "CRUD-operationer",
        "Databashantering",
        "OOP-struktur",
        "Responsiv design"
    ]
},

"Hotell App": {
    description:
        "Modern Hotellbokningssystem byggt i .NET och SQL Server.",

    fullDescription:
         "Ett hotellbokningssystem utvecklat i C# och SQL Server med Code First som grund för databashantering och datamodellering. Projektet fokuserade på OOP, strukturerad mappstruktur och SOLID-principer för att skapa en skalbar och underhållbar applikation.",
    github:
        "https://github.com/nninnie/HotelBooking",

    demo:
        "https://github.com/nninnie/HotelBooking#readme",

    tech: [
        "C#",
        ".NET",
        "SQL Server"
    ],

    features: [
        "CRUD-operationer",
        "Code First",
        "Databashantering",
        "Bokningssystem"
    ]
},

"Webbportfolio": {
    description:
        "Modern portfolio med glow UI och responsiv design.",

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
        "Dark/Light mode",
        "Weather API",
        "Interaktiva komponenter"
    ]
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
        <div class="project-icon">📁</div>
        <span class="folder-title">${title}</span>
        <p>${data.description}</p>


        <div class="card-tech">
            ${data.tech
                .map(t => `<i class="${techIcons[t] || ''}"></i>`)
                .join("")}
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

// Öppna modal
document.querySelectorAll(".folder-item").forEach(folder => {
    folder.addEventListener("click", (e) => {
        e.stopPropagation();
        

        const name = folder.querySelector(".folder-title").textContent;
        const project = projects[name];

        titleEl.textContent = name;
        descEl.innerHTML = project.fullDescription
        .replace(/SOLID-principer/g, '<span class="pink-tech">SOLID-principer</span>')
        .replace(/Code First/g, '<span class="blue-tech">Code First</span>')
        .replace(/SQL/g, '<span class="orange-tech">SQL</span>')
        .replace(/OOP/gi, '<span class="purple-tech">OOP</span>')
        .replace(/frontend-utveckling/gi, '<span class="purple-tech">frontend-utveckling</span>')
        .replace(/UI\/UX/gi, '<span class="blue-tech">UI/UX</span>');


        githubEl.href = project.github;
        demoEl.href = project.demo;

        

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
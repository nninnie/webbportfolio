/* -----------------------------------------
   ☀️ / 🌙  TEMA-TOGGLE / Språk-knapp 
----------------------------------------- */

const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeIcon.innerHTML = `
            <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 0111.21 3 
                         7 7 0 1019 14.79 
                         9.05 9.05 0 0121 12.79z"/>
            </svg>
        `;
    } else {
        themeIcon.innerHTML = `
            <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2m0 16v2m10-10h-2M4 12H2
                         m15.364-7.364l-1.414 1.414
                         M6.05 17.95l-1.414 1.414
                         m0-13.657l1.414 1.414
                         M17.95 17.95l1.414 1.414"/>
            </svg>
        `;
    }
});

// Språk
const langBtn = document.getElementById("languageToggle");
const langFlag = document.getElementById("langFlag");
const isEnglishPage = window.location.pathname.includes("index-en");

langBtn.addEventListener("click", () => {
    if (isEnglishPage) {
        window.location.href = "index.html";
    } else {
        window.location.href = "index-en.html";
    }
});


/* -----------------------------------------
   🎨  GLOW COLOR PICKER 
----------------------------------------- */
const glowPicker = document.getElementById("glowPicker");

glowPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty("--glow", color);
    localStorage.setItem("glowColor", color);
});

const savedGlow = localStorage.getItem("glowColor");

if (savedGlow) {
    document.documentElement.style.setProperty("--glow", savedGlow);
    glowPicker.value = savedGlow;
} else {
    document.documentElement.style.setProperty("--glow", "#1429a056");
    glowPicker.value = "#1429a0c0";
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
   🍔  HAMBURGARMENY 
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
   💡 HERO-TEXT ANIMATION 
----------------------------------------- */

const wordsSv = [
  "Skalbara lösningar",
  "Backend-utveckling",
  "Frontend-utveckling",
  "Fullstack-utveckling",
  "C# & .NET",
  "API-utveckling",
  "SQL & databaser",
  "HTML, CSS & JavaScript",
  "UI/UX-design",
  "Responsiv webbutveckling"
];

const wordsEn = [
  "Scalable solutions",
  "Backend development",
  "Frontend development",
  "Fullstack development",
  "C# & .NET",
  "API development",
  "SQL & databases",
  "HTML, CSS & JavaScript",
  "UI/UX design",
  "Responsive web development"
];

let words = isEnglishPage ? wordsEn : wordsSv;

let i = 0;
let el = document.getElementById("skills-hero-text");

function typeWord() {
  const word = words[i];  
  let j = 0;

  const typer = setInterval(() => {
    el.textContent = word.slice(0, j) + "_";
    j++;

    if (j > word.length) {
      clearInterval(typer);
      setTimeout(() => eraseWord(), 900);
    }
  }, 120);
}

function eraseWord() {
  const word = words[i];   
  let j = word.length;

  const eraser = setInterval(() => {
    el.textContent = word.slice(0, j) + "_";
    j--;

    if (j < 0) {
      clearInterval(eraser);
      i = (i + 1) % words.length;
      typeWord();
    }
  }, 60);
}

typeWord();



/* -----------------------------------------
   📩 Kontaktformulär
----------------------------------------- */
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    // skickar formuläret via fetch (AJAX)
    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(() => {
        document.getElementById("successPopup").style.display = "block";

        setTimeout(() => {
            document.getElementById("successPopup").style.display = "none";
        }, 4000);

        form.reset();
    })
    .catch(error => console.log("FormSubmit error:", error));
});

/* -----------------------------------------
   📁 Portfolio Mappar - öppna/stänga/språk
----------------------------------------- */

const projectsSv = {
    "Kassasystem": {
        description: "Modernt kassasystem byggt i .NET med C# och SQL.",
        fullDescription: "Ett kassasystem utvecklat i C# med fokus på tydlig mappstruktur, OOP och ren kod.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem#readme",
        tech: ["C#", ".NET"],
        features: ["CRUD-operationer", "OOP-struktur", "SOLID"],
        img: "image/portfolio/kassa-system.jpeg"
    },

    "Hotell App": {
        description: "Modernt hotellbokningssystem byggt i .NET och SQL Server.",
        fullDescription: "Ett hotellbokningssystem utvecklat i C# och SQL Server med Code First.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["CRUD-operationer", "OOP-struktur", "Code First", "Databashantering", "SOLID"],
        img: "image/portfolio/hotel-booking.jpeg"
    },

    "Webbportfolio": {
        description: "Modern UI/UX-portfolio byggd i HTML, CSS och JavaScript.",
        fullDescription: "En egenutvecklad portfolio skapad med HTML5, CSS3 och JavaScript.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.github.io/webbportfolio/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"],
        features: ["Responsiv design", "Glow Color Picker", "Dark/Light mode", "Weather API", "Interaktiva komponenter"],
        img: "image/portfolio/webbportfolio.jpeg"
    }
};

const projectsEn = {
    "Cash Register System": {
        description: "Modern cash register system built in .NET with C# and SQL.",
        fullDescription: "A cash register system developed in C# with focus on clean structure, OOP and SOLID.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem#readme",
        tech: ["C#", ".NET"],
        features: ["CRUD operations", "OOP structure", "SOLID principles"],
        img: "image/portfolio/kassa-system.jpeg"
    },

    "Hotel Booking App": {
        description: "Modern hotel booking system built in .NET and SQL Server.",
        fullDescription: "A hotel booking system developed in C# and SQL Server using Code First.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["CRUD operations", "OOP structure", "Code First", "Database handling", "SOLID principles"],
        img: "image/portfolio/hotel-booking.jpeg"
    },

    "Web Portfolio": {
        description: "Modern UI/UX portfolio built with HTML, CSS and JavaScript.",
        fullDescription: "A custom-built portfolio focusing on modern frontend, responsive design and interactive components.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.github.io/webbportfolio/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"],
        features: ["Responsive design", "Glow Color Picker", "Dark/Light mode", "Weather API", "Interactive components"],
        img: "image/portfolio/webbportfolio.jpeg"
    }
};

let lang = isEnglishPage ? "en" : "sv";

let projects = lang === "en" ? projectsEn : projectsSv;
let projectButtonText = lang === "en" ? "View project" : "Se projekt";

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
projectsGrid.innerHTML = ""; 

Object.entries(projects).forEach(([title, data]) => {
    const card = document.createElement("div");
    card.className = "folder-item project-card";

    card.innerHTML = `
        <div class="project-icon">
            <img src="image/icons/folder.png" alt="folder" class="folder-icon">
        </div>
        
        <span class="folder-title">${title}</span>
        <p>${data.description}</p>

        <img src="${data.img}" alt="${title}" class="image-project">
        
        <p class="project-click">${projectButtonText} <span class="arrow">→</span></p>

        <div class="ui-card-accent"></div>
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

document.querySelectorAll(".folder-item").forEach(folder => {
    folder.addEventListener("click", (e) => {
        e.stopPropagation();

        const name = folder.querySelector(".folder-title").textContent;
        const project = projects[name];

        titleEl.textContent = name;

        techEl.innerHTML = `
            <div class="card-tech">
                ${project.tech.map(t => `<i class="${techIcons[t] || ''}"></i>`).join("")}
            </div>
        `;

        descEl.innerHTML = project.fullDescription;

        features.innerHTML = project.features.map(f => `<li>${f}</li>`).join("");

        githubEl.href = project.github;
        demoEl.href = project.demo;

        modal.style.display = "flex";
    });
});

document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (modal.style.display === "flex" &&
        !document.querySelector(".project-modal-content").contains(e.target) &&
        !e.target.closest(".folder-item")) {
        modal.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
});
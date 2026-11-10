/* -----------------------------------------
   🌗 / 🌍  TEMA-TOGGLE / Språk-knapp 
----------------------------------------- */

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    setDefaultGlow(); 
});

// Språk
const langBtn = document.getElementById("languageToggle");

langBtn.addEventListener("click", () => {
    const onEnglishPage = window.location.pathname.includes("index-en");

    if (onEnglishPage) {
        window.location.href = "index.html";
    } else {
        window.location.href = "index-en.html";
    }
});

const isEnglishPage = window.location.pathname.includes("index-en");


/* -----------------------------------------
   🎨  DUAL GLOW COLOR PICKER 
----------------------------------------- */

const glowDarkPicker = document.getElementById("glowDarkPicker");
const glowLightPicker = document.getElementById("glowLightPicker");

// Standardfärger
const defaultDarkGlow = "#1428A0";   // blå
const defaultLightGlow = "#9F4DFF";  // lila

/* 🌙 DARK MODE PICKER */
glowDarkPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty("--glow", color);
});

/* ☀️ LIGHT MODE PICKER */
glowLightPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty("--glow", color);
});

/* -----------------------------------------
   🌗 STANDARD GLOW VID START + TEMA-BYTE
----------------------------------------- */

function setDefaultGlow() {
    const isLight = document.body.classList.contains("light");

    if (isLight) {
        // Light mode standard
        document.documentElement.style.setProperty("--glow", defaultLightGlow);
        glowLightPicker.value = defaultLightGlow;
    } else {
        // Dark mode standard
        document.documentElement.style.setProperty("--glow", defaultDarkGlow);
        glowDarkPicker.value = defaultDarkGlow;
    }
}

// Kör vid start
setDefaultGlow();



/* -----------------------------------------
   🌤️  VÄDER-API (Open-Meteo)
----------------------------------------- */

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

// Sätter text bara om elementet finns (förhindrar krasch på sidor utan elementet)
function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

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

async function loadWeather() {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&current_weather=true"
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        const icon = getWeatherIcon(code);
        const descriptions = isEnglishPage ? weatherDescriptionsEn : weatherDescriptionsSv;
        const desc = descriptions[code] || (isEnglishPage ? "Unknown weather" : "Okänt väder");

        // Navbar
        setText("weather", `${temp}°C ${icon}`);

        // Telefonens väderwidget
        setText("weatherIcon", icon);
        setText("weatherTemp", `${temp}°`);
        setText("weatherDesc", desc);

        // Laptopens aktivitetsfält
        setText("taskbarWeather", `${icon} ${temp}° ${desc}`);

    } catch (err) {
        console.error("Weather error:", err);
        setText("weatherDesc", isEnglishPage ? "Weather unavailable" : "Väder saknas");
    }
}

loadWeather();


/* -----------------------------------------
   🕒  TID I TELEFONENS STATUSBAR
----------------------------------------- */

function updatePhoneTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    setText("phoneTime", `${hours}:${minutes}`);

    // Datum i iPad/laptop-menyraden, t.ex. "tis 10 nov."
    const date = now.toLocaleDateString(isEnglishPage ? "en-GB" : "sv-SE", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });
    setText("deviceDate", date);
}

updatePhoneTime();
setInterval(updatePhoneTime, 30000); // håll klockan aktuell



/* -----------------------------------------
   🍔  HAMBURGARMENY 
----------------------------------------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "flex";

    mobileMenu.style.display = isOpen ? "none" : "flex";
    hamburgerBtn.setAttribute("aria-expanded", !isOpen);
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

// Starta bara om elementet finns
if (el) typeWord();

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



/* -----------------------------------------
   💬 TEXTER FÖR KONTAKTDELEN (SV/EN)
----------------------------------------- */

const contactTexts = isEnglishPage
    ? {
        nameError: "Please enter your name (at least 2 characters).",
        emailError: "Please enter a valid email address, e.g. name@example.com.",
        messageError: "Please write a message (at least 10 characters).",
        sending: "Sending…",
        success: "Thank you! ✨ I'll get back to you as soon as I can.",
        error: "Something went wrong. Please try again or email me directly.",
        phoneCopied: "📞 Number copied: +46 73 570 43 68",
        phoneFallback: "📞 Call me: +46 73 570 43 68"
    }
    : {
        nameError: "Skriv ditt namn (minst 2 tecken).",
        emailError: "Ange en giltig e-postadress, t.ex. namn@exempel.se.",
        messageError: "Skriv ett meddelande (minst 10 tecken).",
        sending: "Skickar…",
        success: "Tack! ✨ Jag återkommer så snart jag kan.",
        error: "Något gick fel. Försök igen eller mejla mig direkt.",
        phoneCopied: "📞 Numret är kopierat: +46 73 570 43 68",
        phoneFallback: "📞 Ring mig: +46 73 570 43 68"
    };


/* -----------------------------------------
   🔔 TOAST (kort notis)
----------------------------------------- */

const toast = document.getElementById("toast");
let toastTimer;

function showToast(text) {
    if (!toast) return;

    toast.textContent = text;
    toast.style.display = "block";

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}


/* -----------------------------------------
   📱 KONTAKT-POPUP – öppna/stänga
----------------------------------------- */

const contactAppBtn = document.querySelector(".contact-app");
const contactPopup = document.getElementById("contactCard");
const closePopupBtn = document.querySelector(".close-popup");

function openContactCard() {
    if (!contactPopup) return;

    contactPopup.hidden = false;
    document.getElementById("name")?.focus();
}

function closeContactCard() {
    if (!contactPopup || contactPopup.hidden) return;

    contactPopup.hidden = true;
    contactAppBtn?.focus(); // lämna tillbaka fokus (tillgänglighet)
}

contactAppBtn?.addEventListener("click", openContactCard);
closePopupBtn?.addEventListener("click", closeContactCard);

// Klick på den mörka bakgrunden (utanför kortet) stänger popupen
contactPopup?.addEventListener("click", (e) => {
    if (e.target === contactPopup) closeContactCard();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeContactCard();
});


/* -----------------------------------------
   📩 KONTAKTFORMULÄR – validering + AJAX
----------------------------------------- */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// En regel per fält: returnerar felmeddelande, eller "" om fältet är ok
const fieldRules = {
    name: (value) => value.length >= 2 ? "" : contactTexts.nameError,
    email: (value) => emailPattern.test(value) ? "" : contactTexts.emailError,
    message: (value) => value.length >= 10 ? "" : contactTexts.messageError
};

function validateField(input) {
    const error = fieldRules[input.name](input.value.trim());
    const errorEl = document.getElementById(`${input.id}Error`);

    input.setAttribute("aria-invalid", error ? "true" : "false");
    if (errorEl) errorEl.textContent = error;

    return error === "";
}

function setFormStatus(text, type = "") {
    if (!formStatus) return;

    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`.trim();
}

if (contactForm) {
    const fields = Object.keys(fieldRules).map((name) => contactForm.elements[name]);
    const submitBtn = contactForm.querySelector("button[type='submit']");

    fields.forEach((input) => {
        // Visa fel när användaren lämnar fältet...
        input.addEventListener("blur", () => validateField(input));

        // ...och ta bort felet direkt när det blir rätt
        input.addEventListener("input", () => {
            if (input.getAttribute("aria-invalid") === "true") validateField(input);
        });
    });

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const results = fields.map(validateField);
        const firstInvalid = fields.find((_, index) => !results[index]);

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        submitBtn.disabled = true; // förhindrar dubbelklick/dubbla mejl
        setFormStatus(contactTexts.sending);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(contactForm)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            contactForm.reset();
            fields.forEach((input) => input.setAttribute("aria-invalid", "false"));
            setFormStatus(contactTexts.success, "success");

        } catch (err) {
            console.error("Contact form error:", err);
            setFormStatus(contactTexts.error, "error");

        } finally {
            submitBtn.disabled = false;
        }
    });
}


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

    "Hotellbokningssystem": {
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

    "Hotel Booking System": {
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




/* -----------------------------------------
   📁  KONTAKT-FALLBACK (Desktop)
----------------------------------------- */

// 📱 Kolla om användaren är på mobil
function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const PHONE_NUMBER = "+46735704368";

// Telefon på dator: kopiera numret och visa en notis
document.querySelector(".phone-link")?.addEventListener("click", async (e) => {
    if (isMobile()) return; // på mobil öppnas telefonappen som vanligt

    e.preventDefault();

    try {
        await navigator.clipboard.writeText(PHONE_NUMBER);
        showToast(contactTexts.phoneCopied);
    } catch {
        showToast(contactTexts.phoneFallback); // t.ex. om urklipp blockeras
    }
});

// SMS på dator: öppna WhatsApp Web istället
document.querySelector(".sms-link")?.addEventListener("click", (e) => {
    if (isMobile()) return;

    e.preventDefault();
    window.open(`https://wa.me/${PHONE_NUMBER.replace("+", "")}`, "_blank", "noopener");
});

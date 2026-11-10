/* -----------------------------------------
   📁 PORTFOLIO – projektdata, projektkort och projekt-popup (modal)
   Lägg till ett projekt = lägg till ett objekt i listan nedan.
   screenshots = bilderna som visas i popupen (valfritt).
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

const projectsSv = {
    "MyBank – Bankadministration": {
        description: "Webbsystem för bankpersonal byggt i ASP.NET Core Razor Pages, EF Core och Identity.",
        fullDescription: "Admin- och kassörsystem för kunder, konton och transaktioner. Byggt i tre lager (webb, services, data access) med rollbaserad inloggning, validering på server och klient, AJAX-laddning av transaktioner och Response Caching.",
        github: "https://github.com/nninnie/BankApp",
        demo: "https://github.com/nninnie/BankApp#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ASP.NET Core Razor Pages", "EF Core (Database First)", "Identity med rollerna Admin/Cashier", "Saldo ändras bara via transaktioner", "Lagerindelning + AutoMapper"],
        img: "image/portfolio/bankapp.webp",
        screenshots: [
            { src: "image/portfolio/screens/bankapp-1.webp", alt: "Startsidan med statistik per land" }
        ]
    },

    "Hotellbokningssystem": {
        description: "Bokningssystem för ett hotell byggt i .NET med EF Core och SQL Server.",
        fullDescription: "Konsolapplikation för rum, gäster, bokningar, fakturor och betalningar. Databasen skapas med EF Core Code First, beroenden hanteras med Autofac och gränssnittet är byggt med Spectre.Console.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["EF Core Code First", "Dependency Injection (Autofac)", "Kontroll av dubbelbokningar", "Fakturor och betalningar", "Inloggning med roller"],
        img: "image/portfolio/hotel-booking.webp",
        screenshots: [
            { src: "image/portfolio/screens/hotel-1.webp", alt: "Rumsöversikt med status" },
            { src: "image/portfolio/screens/hotel-2.webp", alt: "Kalender för in- och utcheckning" },
            { src: "image/portfolio/screens/hotel-3.webp", alt: "Bokningsbekräftelse med pris" }
        ]
    },

    "Filmregister": {
        description: "Filmregister med klassisk dataåtkomst via ADO.NET och SQL Server.",
        fullDescription: "Konsolapplikation där man kan visa, söka, lägga till, uppdatera och ta bort filmer. Dataåtkomsten är skriven med ADO.NET och parametriserade SQL-frågor i ett repository-lager.",
        github: "https://github.com/nninnie/ADONet-MovieRegister",
        demo: "https://github.com/nninnie/ADONet-MovieRegister#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ADO.NET (SqlConnection, SqlCommand)", "Parametriserade SQL-frågor", "Repository-mönster", "Relation Genre (1) → Movie (N)", "Spectre.Console-UI"],
        img: "image/portfolio/movie-register.webp",
        screenshots: [
            { src: "image/portfolio/screens/movie-1.webp", alt: "Huvudmenyn i filmregistret" },
            { src: "image/portfolio/screens/movie-2.webp", alt: "Alla filmer i en tabell" },
            { src: "image/portfolio/screens/movie-3.webp", alt: "Sök filmer efter genre" },
            { src: "image/portfolio/screens/movie-4.webp", alt: "Välj film att uppdatera" }
        ]
    },

    "Kassasystem": {
        description: "Kassasystem för en frukthandel, byggt i C# och .NET med objektorienterad design.",
        fullDescription: "Konsolapplikation där kassören slår in varor med PLU-kod och antal/vikt, ser kundvagnen och får ett kvitto med kampanjrabatter. Produkter, kampanjer och kvitton sparas i textfiler, och koden är uppdelad i controllers, services och dataklasser.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem",
        tech: ["C#", ".NET"],
        features: ["Inslag med PLU-kod och vikt/antal", "Kampanjer och rabatter", "Kvitto med löpnummer", "Filbaserad lagring", "OOP och lagerindelning"],
        img: "image/portfolio/kassa-system.webp",
        screenshots: [
            { src: "image/portfolio/screens/kassa-1.webp", alt: "Kassavy med kundvagn" },
            { src: "image/portfolio/screens/kassa-2.webp", alt: "Kvitto med moms och rabatt" }
        ]
    },

    "Webbportfolio": {
        description: "Modern UI/UX-portfolio byggd i HTML, CSS och JavaScript.",
        fullDescription: "En egenutvecklad portfolio skapad med HTML5, CSS3 och JavaScript.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.se/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"],
        features: ["Responsiv design", "Glow Color Picker", "Dark/Light mode", "Weather API", "Interaktiva komponenter"],
        img: "image/portfolio/webbportfolio.webp",
        screenshots: [
            { src: "image/portfolio/screens/portfolio-0a.webp", alt: "Startsidan i mörkt läge" },
            { src: "image/portfolio/screens/portfolio-0b.webp", alt: "Startsidan i ljust läge" },
            { src: "image/portfolio/screens/portfolio-1.webp", alt: "Kontaktdelen som laptop" },
            { src: "image/portfolio/screens/portfolio-2.webp", alt: "Kontaktdelen som surfplatta" },
            { src: "image/portfolio/screens/portfolio-3.webp", alt: "Kontaktdelen som telefon" }
        ]
    }
};

const projectsEn = {
    "MyBank – Bank administration": {
        description: "Web system for bank staff built with ASP.NET Core Razor Pages, EF Core and Identity.",
        fullDescription: "Admin and cashier system for customers, accounts and transactions. Built in three layers (web, services, data access) with role-based login, server and client validation, AJAX-loaded transactions and Response Caching.",
        github: "https://github.com/nninnie/BankApp",
        demo: "https://github.com/nninnie/BankApp#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ASP.NET Core Razor Pages", "EF Core (Database First)", "Identity with Admin/Cashier roles", "Balance only changes via transactions", "Layered architecture + AutoMapper"],
        img: "image/portfolio/bankapp.webp",
        screenshots: [
            { src: "image/portfolio/screens/bankapp-1.webp", alt: "Start page with statistics per country" }
        ]
    },

    "Hotel Booking System": {
        description: "Booking system for a hotel built in .NET with EF Core and SQL Server.",
        fullDescription: "Console application for rooms, guests, bookings, invoices and payments. The database is created with EF Core Code First, dependencies are handled with Autofac and the UI is built with Spectre.Console.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["EF Core Code First", "Dependency Injection (Autofac)", "Double booking checks", "Invoices and payments", "Login with roles"],
        img: "image/portfolio/hotel-booking.webp",
        screenshots: [
            { src: "image/portfolio/screens/hotel-1.webp", alt: "Room overview with status" },
            { src: "image/portfolio/screens/hotel-2.webp", alt: "Calendar for check-in and check-out" },
            { src: "image/portfolio/screens/hotel-3.webp", alt: "Booking confirmation with price" }
        ]
    },

    "Movie Register": {
        description: "Movie register with classic data access using ADO.NET and SQL Server.",
        fullDescription: "Console application for listing, searching, adding, updating and deleting movies. Data access is written with ADO.NET and parameterized SQL queries in a repository layer.",
        github: "https://github.com/nninnie/ADONet-MovieRegister",
        demo: "https://github.com/nninnie/ADONet-MovieRegister#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ADO.NET (SqlConnection, SqlCommand)", "Parameterized SQL queries", "Repository pattern", "Relation Genre (1) → Movie (N)", "Spectre.Console UI"],
        img: "image/portfolio/movie-register.webp",
        screenshots: [
            { src: "image/portfolio/screens/movie-1.webp", alt: "Main menu of the movie register" },
            { src: "image/portfolio/screens/movie-2.webp", alt: "All movies in a table" },
            { src: "image/portfolio/screens/movie-3.webp", alt: "Search movies by genre" },
            { src: "image/portfolio/screens/movie-4.webp", alt: "Choose a movie to update" }
        ]
    },

    "Cash Register System": {
        description: "Cash register system for a fruit store, built in C# and .NET with object-oriented design.",
        fullDescription: "Console application where the cashier enters items by PLU code and quantity/weight, sees the cart and gets a receipt with campaign discounts. Products, campaigns and receipts are stored in text files, and the code is split into controllers, services and data classes.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem",
        tech: ["C#", ".NET"],
        features: ["PLU entry with weight/quantity", "Campaigns and discounts", "Numbered receipts", "File-based storage", "OOP and layered structure"],
        img: "image/portfolio/kassa-system.webp",
        screenshots: [
            { src: "image/portfolio/screens/kassa-1.webp", alt: "Checkout view with cart" },
            { src: "image/portfolio/screens/kassa-2.webp", alt: "Receipt with VAT and discount" }
        ]
    },

    "Web Portfolio": {
        description: "Modern UI/UX portfolio built with HTML, CSS and JavaScript.",
        fullDescription: "A custom-built portfolio focusing on modern frontend, responsive design and interactive components.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.se/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"],
        features: ["Responsive design", "Glow Color Picker", "Dark/Light mode", "Weather API", "Interactive components"],
        img: "image/portfolio/webbportfolio.webp",
        screenshots: [
            { src: "image/portfolio/screens/portfolio-0a.webp", alt: "Start page in dark mode" },
            { src: "image/portfolio/screens/portfolio-0b.webp", alt: "Start page in light mode" },
            { src: "image/portfolio/screens/portfolio-1.webp", alt: "Contact section as laptop" },
            { src: "image/portfolio/screens/portfolio-2.webp", alt: "Contact section as tablet" },
            { src: "image/portfolio/screens/portfolio-3.webp", alt: "Contact section as phone" }
        ]
    }
};

// Teknik → Devicon-klass (ikonerna laddas från devicon i <head>)
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


/* ---------- 🗂️ Projektkort ---------- */

function renderProjectCards(projects) {
    const projectsGrid = document.getElementById("projectsGrid");
    const projectButtonText = isEnglishPage ? "View project" : "Se projekt";

    projectsGrid.innerHTML = "";

    // Object.entries ger [titel, data] för varje projekt
    Object.entries(projects).forEach(([title, data]) => {
        const card = document.createElement("div");
        card.className = "folder-item project-card";

        card.innerHTML = `
            <div class="project-icon">
                <img src="image/icons/folder.png" alt="folder" class="folder-icon">
            </div>

            <span class="folder-title">${title}</span>
            <p>${data.description}</p>

            <img src="${data.img}" alt="${title}" class="image-project" loading="lazy">

            <p class="project-click">${projectButtonText} <span class="arrow">→</span></p>

            <div class="ui-card-accent"></div>
        `;

        projectsGrid.appendChild(card);
    });
}


/* ---------- 🔍 Projekt-popup (modal) ---------- */

function initProjectModal(projects) {
    const modal = document.getElementById("projectModal");
    const modalContent = document.querySelector(".project-modal-content");
    const titleEl = document.getElementById("projectTitle");
    const descEl = document.getElementById("projectDescription");
    const githubEl = document.getElementById("githubLink");
    const demoEl = document.getElementById("demoLink");
    const techEl = document.getElementById("projectTech");
    const featuresEl = document.getElementById("features");
    const galleryEl = document.getElementById("projectGallery");

    // Fyll popupen med valt projekt och visa den
    document.querySelectorAll(".folder-item").forEach((folder) => {
        folder.addEventListener("click", (e) => {
            e.stopPropagation(); // annars stänger "klick utanför" direkt

            const name = folder.querySelector(".folder-title").textContent;
            const project = projects[name];

            titleEl.textContent = name;

            techEl.innerHTML = `
                <div class="card-tech">
                    ${project.tech.map((t) => `<i class="${techIcons[t] || ""}"></i>`).join("")}
                </div>
            `;

            descEl.innerHTML = project.fullDescription;
            featuresEl.innerHTML = project.features.map((f) => `<li>${f}</li>`).join("");

            // Skärmbilder: klick öppnar bilden i full storlek i en ny flik
            galleryEl.innerHTML = (project.screenshots || []).map((shot) => `
                <a href="${shot.src}" target="_blank" rel="noopener noreferrer">
                    <img src="${shot.src}" alt="${shot.alt}" loading="lazy">
                </a>
            `).join("");

            githubEl.href = project.github;
            demoEl.href = project.demo;

            modal.style.display = "flex";
        });
    });

    const closeModal = () => { modal.style.display = "none"; };

    document.querySelector(".close-modal").addEventListener("click", closeModal);

    // Klick utanför innehållet stänger popupen
    document.addEventListener("click", (e) => {
        if (modal.style.display === "flex" &&
            !modalContent.contains(e.target) &&
            !e.target.closest(".folder-item")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}


export function initProjects() {
    const projects = isEnglishPage ? projectsEn : projectsSv;

    renderProjectCards(projects);
    initProjectModal(projects);
}

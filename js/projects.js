/* -----------------------------------------
   📁 PORTFOLIO – projektdata, projektkort och projekt-popup (modal)
   Lägg till ett projekt = lägg till ett objekt i listan nedan.
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
        img: "image/portfolio/bankapp.webp"
    },

    "Hotellbokningssystem": {
        description: "Bokningssystem för ett hotell byggt i .NET med EF Core och SQL Server.",
        fullDescription: "Konsolapplikation för rum, gäster, bokningar, fakturor och betalningar. Databasen skapas med EF Core Code First, beroenden hanteras med Autofac och gränssnittet är byggt med Spectre.Console.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["EF Core Code First", "Dependency Injection (Autofac)", "Kontroll av dubbelbokningar", "Fakturor och betalningar", "Inloggning med roller"],
        img: "image/portfolio/hotel-booking.webp"
    },

    "Filmregister": {
        description: "Filmregister med klassisk dataåtkomst via ADO.NET och SQL Server.",
        fullDescription: "Konsolapplikation där man kan visa, söka, lägga till, uppdatera och ta bort filmer. Dataåtkomsten är skriven med ADO.NET och parametriserade SQL-frågor i ett repository-lager.",
        github: "https://github.com/nninnie/ADONet-MovieRegister",
        demo: "https://github.com/nninnie/ADONet-MovieRegister#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ADO.NET (SqlConnection, SqlCommand)", "Parametriserade SQL-frågor", "Repository-mönster", "Relation Genre (1) → Movie (N)", "Spectre.Console-UI"],
        img: "image/portfolio/movie-register.webp"
    },

    "Kassasystem": {
        description: "Modernt kassasystem byggt i .NET med C# och SQL.",
        fullDescription: "Ett kassasystem utvecklat i C# med fokus på tydlig mappstruktur, OOP och ren kod.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem#readme",
        tech: ["C#", ".NET"],
        features: ["CRUD-operationer", "OOP-struktur", "SOLID"],
        img: "image/portfolio/kassa-system.jpeg"
    },

    "Webbportfolio": {
        description: "Modern UI/UX-portfolio byggd i HTML, CSS och JavaScript.",
        fullDescription: "En egenutvecklad portfolio skapad med HTML5, CSS3 och JavaScript.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.se/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"],
        features: ["Responsiv design", "Glow Color Picker", "Dark/Light mode", "Weather API", "Interaktiva komponenter"],
        img: "image/portfolio/webbportfolio.jpeg"
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
        img: "image/portfolio/bankapp.webp"
    },

    "Hotel Booking System": {
        description: "Booking system for a hotel built in .NET with EF Core and SQL Server.",
        fullDescription: "Console application for rooms, guests, bookings, invoices and payments. The database is created with EF Core Code First, dependencies are handled with Autofac and the UI is built with Spectre.Console.",
        github: "https://github.com/nninnie/HotelBooking",
        demo: "https://github.com/nninnie/HotelBooking#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["EF Core Code First", "Dependency Injection (Autofac)", "Double booking checks", "Invoices and payments", "Login with roles"],
        img: "image/portfolio/hotel-booking.webp"
    },

    "Movie Register": {
        description: "Movie register with classic data access using ADO.NET and SQL Server.",
        fullDescription: "Console application for listing, searching, adding, updating and deleting movies. Data access is written with ADO.NET and parameterized SQL queries in a repository layer.",
        github: "https://github.com/nninnie/ADONet-MovieRegister",
        demo: "https://github.com/nninnie/ADONet-MovieRegister#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ADO.NET (SqlConnection, SqlCommand)", "Parameterized SQL queries", "Repository pattern", "Relation Genre (1) → Movie (N)", "Spectre.Console UI"],
        img: "image/portfolio/movie-register.webp"
    },

    "Cash Register System": {
        description: "Modern cash register system built in .NET with C# and SQL.",
        fullDescription: "A cash register system developed in C# with focus on clean structure, OOP and SOLID.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem#readme",
        tech: ["C#", ".NET"],
        features: ["CRUD operations", "OOP structure", "SOLID principles"],
        img: "image/portfolio/kassa-system.jpeg"
    },

    "Web Portfolio": {
        description: "Modern UI/UX portfolio built with HTML, CSS and JavaScript.",
        fullDescription: "A custom-built portfolio focusing on modern frontend, responsive design and interactive components.",
        github: "https://github.com/nninnie/webbportfolio",
        demo: "https://nninnie.se/",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX", "API"],
        features: ["Responsive design", "Glow Color Picker", "Dark/Light mode", "Weather API", "Interactive components"],
        img: "image/portfolio/webbportfolio.jpeg"
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

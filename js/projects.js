/* -----------------------------------------
   📁 PORTFOLIO – projektdata, projektkort och projekt-popup (modal)
   Lägg till ett projekt = lägg till ett objekt i listan nedan.
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

const projectsSv = {
    "MyBank – Bankadministration": {
        description: "Webbsystem för bankpersonal byggt i ASP.NET Core Razor Pages, EF Core och Identity.",
        fullDescription: "Admin- och kassörsystem för kunder, konton och transaktioner. Byggt i tre lager (webb, services, data access) med rollbaserad inloggning, validering på server och klient, AJAX-laddning av transaktioner och Response Caching.",
        github: "https://github.com/nninnie/Banksystem",
        demo: "https://bankapp-ninnie-afebhbh6b8cjezg0.swedencentral-01.azurewebsites.net",
        tech: ["C#", ".NET", "SQL"],
        features: ["ASP.NET Core Razor Pages", "EF Core (Database First)", "Identity med rollerna Admin/Cashier", "Saldo ändras bara via transaktioner", "Lagerindelning + AutoMapper"],
        img: "image/portfolio/bankapp.webp"
    },

    "APIAnnons – REST API": {
        description: "REST API för annonser, byggt i ASP.NET Core Web API med EF Core och SQL Server.",
        fullDescription: "Ett API med grundfunktionerna för en köp- och säljsida: lista, hämta, skapa, uppdatera, ändra delar av och ta bort annonser. Klienten skickar DTO:er, svaren har rätt statuskoder och API:t testas och dokumenteras med Swagger UI.",
        github: "https://github.com/nninnie/APIAnnons",
        demo: "https://github.com/nninnie/APIAnnons#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ASP.NET Core Web API (controllers)", "EF Core Code First", "GET, POST, PUT, PATCH och DELETE", "DTO:er och rätt statuskoder (201, 204, 400, 404)", "Swagger UI"],
        img: "image/portfolio/apiannons.webp"
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

    "Guldkortet": {
        description: "Windows Forms-app som tar emot kortkoder över TCP, validerar dem mot SQL-databaser och delar ut belöningar.",
        fullDescription: "Programmet är en TCP-server som tar emot koder från ett externt program (NOS_Export), kontrollerar kund och kort mot två SQL-databaser och skickar tillbaka en belöning. Nätverkstrafiken körs asynkront i bakgrunden så att fönstret aldrig fryser, och belöningarna är byggda med arv och polymorfism.",
        github: "https://github.com/nninnie/Guldkortet",
        demo: "https://github.com/nninnie/Guldkortet",
        tech: ["C#", ".NET", "SQL"],
        features: ["TCP-server (TcpListener, NetworkStream)", "async/await och trådsäker UI-uppdatering (Invoke)", "Arv och polymorfism för belöningar", "Parametriserade SQL-frågor", "Loggning till fil"],
        img: "image/portfolio/guldkortet.webp"
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
        description: "Kassasystem för en frukthandel, byggt i C# och .NET med objektorienterad design.",
        fullDescription: "Konsolapplikation där kassören slår in varor med PLU-kod och antal/vikt, ser kundvagnen och får ett kvitto med kampanjrabatter. Produkter, kampanjer och kvitton sparas i textfiler, och koden är uppdelad i controllers, services och dataklasser.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem",
        tech: ["C#", ".NET"],
        features: ["Inslag med PLU-kod och vikt/antal", "Kampanjer och rabatter", "Kvitto med löpnummer", "Filbaserad lagring", "OOP och lagerindelning"],
        img: "image/portfolio/kassa-system.webp"
    }
};

const projectsEn = {
    "MyBank – Bank administration": {
        description: "Web system for bank staff built with ASP.NET Core Razor Pages, EF Core and Identity.",
        fullDescription: "Admin and cashier system for customers, accounts and transactions. Built in three layers (web, services, data access) with role-based login, server and client validation, AJAX-loaded transactions and Response Caching.",
        github: "https://github.com/nninnie/Banksystem",
        demo: "https://bankapp-ninnie-afebhbh6b8cjezg0.swedencentral-01.azurewebsites.net",
        tech: ["C#", ".NET", "SQL"],
        features: ["ASP.NET Core Razor Pages", "EF Core (Database First)", "Identity with Admin/Cashier roles", "Balance only changes via transactions", "Layered architecture + AutoMapper"],
        img: "image/portfolio/bankapp.webp"
    },

    "APIAnnons – REST API": {
        description: "REST API for classified ads, built with ASP.NET Core Web API, EF Core and SQL Server.",
        fullDescription: "An API with the core features of a buy-and-sell site: list, get, create, update, partially update and delete ads. The client sends DTOs, responses use the correct status codes and the API is tested and documented with Swagger UI.",
        github: "https://github.com/nninnie/APIAnnons",
        demo: "https://github.com/nninnie/APIAnnons#readme",
        tech: ["C#", ".NET", "SQL"],
        features: ["ASP.NET Core Web API (controllers)", "EF Core Code First", "GET, POST, PUT, PATCH and DELETE", "DTOs and correct status codes (201, 204, 400, 404)", "Swagger UI"],
        img: "image/portfolio/apiannons.webp"
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

    "Gold Card": {
        description: "Windows Forms app that receives card codes over TCP, validates them against SQL databases and hands out rewards.",
        fullDescription: "The program is a TCP server that receives codes from an external program (NOS_Export), checks customer and card against two SQL databases and sends back a reward. Network traffic runs asynchronously in the background so the window never freezes, and the rewards are built with inheritance and polymorphism.",
        github: "https://github.com/nninnie/Guldkortet",
        demo: "https://github.com/nninnie/Guldkortet",
        tech: ["C#", ".NET", "SQL"],
        features: ["TCP server (TcpListener, NetworkStream)", "async/await and thread-safe UI updates (Invoke)", "Inheritance and polymorphism for rewards", "Parameterized SQL queries", "Logging to file"],
        img: "image/portfolio/guldkortet.webp"
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
        description: "Cash register system for a fruit store, built in C# and .NET with object-oriented design.",
        fullDescription: "Console application where the cashier enters items by PLU code and quantity/weight, sees the cart and gets a receipt with campaign discounts. Products, campaigns and receipts are stored in text files, and the code is split into controllers, services and data classes.",
        github: "https://github.com/nninnie/CashRegisterSystem",
        demo: "https://github.com/nninnie/CashRegisterSystem",
        tech: ["C#", ".NET"],
        features: ["PLU entry with weight/quantity", "Campaigns and discounts", "Numbered receipts", "File-based storage", "OOP and layered structure"],
        img: "image/portfolio/kassa-system.webp"
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

    // Object.entries ger [titel, data] för varje projekt.
    // Varje projekt blir ett app-fönster i raden "Senaste appar".
    Object.entries(projects).forEach(([title, data]) => {
        const card = document.createElement("div");
        card.className = "folder-item win";
        card.tabIndex = 0;                      // går att nå med tangentbordet
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `${title}, ${projectButtonText.toLowerCase()}`);

        const tags = data.tech.map((tech) => `<span>${tech}</span>`).join("");

        card.innerHTML = `
            <div class="win-head">
                <span class="win-icon" aria-hidden="true"><img src="image/icons/folder.png" alt="" class="folder-icon"></span>
                <span class="folder-title">${title}</span>
            </div>

            <div class="win-body glass">
                <!-- Två skärmbilder: mörk (filnamn + "-dark") och ljus. CSS visar rätt för temat. -->
                <div class="win-shot">
                    <img src="${data.img.replace(".webp", "-dark.webp")}" alt="" class="img-dark" loading="lazy">
                    <img src="${data.img}" alt="" class="img-light" loading="lazy">
                </div>
                <div class="win-meta">
                    <p>${data.description}</p>
                    <div class="win-tags">${tags}</div>
                    <p class="project-click">${projectButtonText} <span class="arrow">→</span></p>
                </div>
            </div>
        `;

        // Enter och mellanslag öppnar projektet, precis som ett klick
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                card.click();
            }
        });

        projectsGrid.appendChild(card);
    });
}


/* ---------- ↔️ Raden med projekt: pilarna ---------- */

function initProjectRail() {
    const rail = document.getElementById("projectsGrid");
    const buttons = document.querySelectorAll(".rail-btn");
    if (!rail || buttons.length < 2) return;

    // Pilarna scrollar ett kort åt gången
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = rail.querySelector(".win");
            const step = card ? card.getBoundingClientRect().width + 22 : rail.clientWidth;
            rail.scrollBy({ left: step * Number(btn.dataset.dir), behavior: "smooth" });
        });
    });

    // En pil är avstängd när man redan är i början eller slutet av raden
    function updateButtons() {
        buttons[0].disabled = rail.scrollLeft <= 2;
        buttons[1].disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    }

    rail.addEventListener("scroll", () => requestAnimationFrame(updateButtons), { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
}


/* ---------- 🔍 Projekt-popup (modal) ---------- */

function initProjectModal(projects) {
    const modal = document.getElementById("projectModal");
    const modalContent = document.querySelector(".project-modal-content");
    const titleEl = document.getElementById("projectTitle");
    const descEl = document.getElementById("projectDescription");
    const githubEl = document.getElementById("githubLink");
    const demoEl = document.getElementById("demoLink");
    const linksEl = document.querySelector(".project-links");
    const privateNoteEl = document.getElementById("privateNote");
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

            // Privat repo: visa texten i stället för länkar som skulle ge 404
            const isPrivate = project.isPrivate === true;
            linksEl.hidden = isPrivate;
            privateNoteEl.hidden = !isPrivate;

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
    initProjectRail();
}

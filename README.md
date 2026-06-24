<img src="readme-image.png">

# 🌐 Web Portfolio – Frontendprojekt

En modern, responsiv och tillgänglig webportfolio byggd med **HTML**, **CSS** och **JavaScript**.  
Projektet fokuserar på UI/UX‑design, komponentbaserad struktur, API‑integration och en ren, modulär kodbas.  
Portfolion visar mina projekt, erfarenheter och kontaktmöjligheter i ett visuellt premium‑gränssnitt.

---

## ✨ Funktionalitet

### 🌓 Dark & Light Mode
- Tema‑toggle med ikon
- Glow‑effekter och glassmorphism
- Färgpalett anpassad för båda teman
- LocalStorage sparar användarens val

### 🌦️ Väder‑API
- Integration med **OpenWeatherMap**
- Hämtar temperatur, ikon och plats
- Dynamisk uppdatering vid sidladdning
- Felhantering om API inte svarar

### 📱 Responsiv design
- `clamp()` för typografi och spacing
- Flexbox och CSS Grid
- Media queries för mobil, tablet och laptop
- Mobilanpassad slider i referenssektionen

### 📨 Kontaktformulär
- FormSubmit‑integration
- HTML5‑validering
- Custom felmeddelanden
- Bekräftelse‑popup vid skickat meddelande

### 🧭 Navigation
- Sticky navbar
- Smooth scroll
- Skip‑link för tillgänglighet
- Ikoner för språk, tema och väder

---

## 🧱 Arkitektur

Projektet är uppdelat i tydliga lager för att hålla koden ren och lätt att underhålla.

### **HTML – Struktur**
- Semantiska element
- Tydliga sektioner (Hero, About, Skills, Projects, References, Contact)
- Aria‑labels och alt‑texter
- Fokus på WCAG‑principer

### **CSS – Design & Layout**
- Modulär CSS
- Variabler för färger och teman
- Glassmorphism, glow och micro‑interactions
- Responsiv layout med flex/grid
- Komponentbaserad styling

### **JavaScript – Funktionalitet**
- Små, separata funktioner
- Tema‑hantering
- Väder‑API
- Formulärvalidering
- Slider‑logik
- UI‑interaktioner

---

## 🖥️ UI‑lager

UI‑lagret består av flera komponenter:

- **ThemeToggle** – hanterar dark/light mode  
- **WeatherWidget** – hämtar och visar väderdata  
- **LanguageToggle** – språkikon (visuell)  
- **Slider** – mobilanpassad referensslider  
- **FormHandler** – validering och feedback  
- **ScrollEffects** – smooth scroll och navbar‑logik  
- **ModalRenderer** – projektmodals med GitHub/README‑länkar  

Varje komponent har ett tydligt ansvar, vilket gör koden lätt att bygga ut.

---

## ♿ WCAG & Tillgänglighet

- Semantisk HTML  
- Alt‑texter  
- Aria‑labels  
- Fokusmarkeringar  
- Skip‑link  
- Kontrastkontroll i båda teman  
- Tangentbordsnavigering  

---

## 🧪 Tekniker

- HTML5  
- CSS3  
- JavaScript (ES6)  
- OpenWeatherMap API  
- FormSubmit  
- LocalStorage  

---

## 📄 Dokumentation

- Figma‑skisser (internt)  
- Moodboard (internt)  
- Komponentplanering  
- UI‑system (spacing, färger, typografi)

---

## 🧩 Lärdomar & Arbetssätt

Jag arbetade enligt principer som:

- **Single Responsibility Principle** – varje JS‑funktion gör en sak  
- **Modulär CSS** – komponentbaserad styling  
- **Iterativ design** – bygga → testa → förbättra  
- **Responsiv först** – mobil → tablet → laptop  

Lärdomar:

- Jag hade velat börja i Figma tidigare  
- Att planera komponenter sparar mycket tid  
- `clamp()` är extremt kraftfullt för responsivitet  
- Light mode kräver mer kontrastarbete än dark mode  

---

## 📌 Todo

- Förbättra light mode‑kontraster  
- Översätta todo‑listan till engelska  
- Förtydliga slider‑hint på mobil  
- Lägga till fler micro‑interactions  

---

## ✍️ Utvecklat av  
**Ninnie Dahlström – Web Portfolio**

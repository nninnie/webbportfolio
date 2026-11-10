/* -----------------------------------------
   💡 HERO – skrivmaskinseffekt (skriver, väntar, suddar, nästa ord)
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

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

export function initHeroTyping() {
    const el = document.getElementById("skills-hero-text");
    if (!el) return; // starta bara om elementet finns

    const words = isEnglishPage ? wordsEn : wordsSv;
    let i = 0; // index för aktuellt ord

    // Skriver ett tecken i taget
    function typeWord() {
        const word = words[i];
        let j = 0;

        const typer = setInterval(() => {
            el.textContent = word.slice(0, j) + "_";
            j++;

            if (j > word.length) {
                clearInterval(typer);
                setTimeout(eraseWord, 900);
            }
        }, 120);
    }

    // Suddar ett tecken i taget och går sedan till nästa ord
    function eraseWord() {
        const word = words[i];
        let j = word.length;

        const eraser = setInterval(() => {
            el.textContent = word.slice(0, j) + "_";
            j--;

            if (j < 0) {
                clearInterval(eraser);
                i = (i + 1) % words.length; // % gör att listan börjar om
                typeWord();
            }
        }, 60);
    }

    typeWord();
}

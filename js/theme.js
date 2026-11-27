/* -----------------------------------------
   🌗 TEMA, 🌍 SPRÅK och 🎨 GLÖDFÄRG
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

// Standardfärger för glöden (--glow) i respektive tema
const defaultDarkGlow = "#1428A0";   // blå
const defaultLightGlow = "#9F4DFF";  // lila

// CV-filer per språk och tema (mörkt läge / ljust läge)
const CV_FILES = {
    sv: { dark: "image/cv-ninnie-dahlstrom.pdf", light: "image/cv-ninnie-dahlstrom-light.pdf" },
    en: { dark: "image/cv-ninnie-dahlstrom-eng.pdf", light: "image/cv-ninnie-dahlstrom-eng-light.pdf" }
};

export function initTheme() {
    const themeBtn = document.getElementById("themeToggle");
    const langBtn = document.getElementById("languageToggle");
    const glowDarkPicker = document.getElementById("glowDarkPicker");
    const glowLightPicker = document.getElementById("glowLightPicker");

    // Sätter temats standardglöd och synkar färgväljaren
    function setDefaultGlow() {
        const isLight = document.body.classList.contains("light");

        if (isLight) {
            document.documentElement.style.setProperty("--glow", defaultLightGlow);
            glowLightPicker.value = defaultLightGlow;
        } else {
            document.documentElement.style.setProperty("--glow", defaultDarkGlow);
            glowDarkPicker.value = defaultDarkGlow;
        }
    }

    // CV:t följer temat: mörkt CV i mörkt läge, ljust CV i ljust läge (på båda språken)
    function syncCvLinks() {
        const isLight = document.body.classList.contains("light");
        const cv = isEnglishPage ? CV_FILES.en : CV_FILES.sv;

        document.querySelectorAll('a[href^="image/cv-ninnie-dahlstrom"]').forEach((link) => {
            link.setAttribute("href", isLight ? cv.light : cv.dark);
        });
    }

    // Tema: klassen .light på <body> styr allt i css/theme-light.css
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        setDefaultGlow();
        syncCvLinks();
    });

    // Språk: växla mellan svenska och engelska sidan
    langBtn.addEventListener("click", () => {
        const onEnglishPage = window.location.pathname.includes("index-en");
        window.location.href = onEnglishPage ? "index.html" : "index-en.html";
    });

    // Färgväljarna skriver direkt till CSS-variabeln --glow
    glowDarkPicker.addEventListener("input", (e) => {
        document.documentElement.style.setProperty("--glow", e.target.value);
    });

    glowLightPicker.addEventListener("input", (e) => {
        document.documentElement.style.setProperty("--glow", e.target.value);
    });

    // Kör vid start
    setDefaultGlow();
}

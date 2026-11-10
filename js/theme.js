/* -----------------------------------------
   🌗 TEMA, 🌍 SPRÅK och 🎨 GLÖDFÄRG
----------------------------------------- */

// Standardfärger för glöden (--glow) i respektive tema
const defaultDarkGlow = "#1428A0";   // blå
const defaultLightGlow = "#9F4DFF";  // lila

// CV-filer per tema
const CV_DARK = "image/cv-ninnie-dahlstrom.pdf";
const CV_LIGHT = "image/cv-ninnie-dahlstrom-light.pdf";

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

    // CV:t följer temat: mörkt CV i mörkt läge, ljust CV i ljust läge (svenska sidan)
    function syncCvLinks() {
        const isLight = document.body.classList.contains("light");

        document.querySelectorAll('a[href^="image/cv-ninnie-dahlstrom"]').forEach((link) => {
            if (link.getAttribute("href").includes("-eng")) return; // engelska CV:t har bara en version
            link.setAttribute("href", isLight ? CV_LIGHT : CV_DARK);
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

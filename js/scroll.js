/* -----------------------------------------
   🧭 SCROLL – hopp till sektionerna och pilen som följer med
   Varje sektion har 40vh luft ovanför rubriken. Vanliga #-länkar
   hamnar därför i luften. Här räknar vi i stället från rubriken
   och centrerar sektionen på skärmen.
----------------------------------------- */

const SECTION_IDS = ["about", "skills", "portfolio", "reference", "contact"];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function navHeight() {
    const nav = document.querySelector(".navbar");
    return nav ? nav.offsetHeight : 0;
}

// Sektionens innehåll börjar vid rubriken, luften ovanför räknas inte
function contentBox(section) {
    const heading = section.querySelector(".oneui-head, .contact-title") || section;
    const top = heading.getBoundingClientRect().top + window.scrollY;
    const bottom = section.getBoundingClientRect().bottom + window.scrollY;
    return { top, height: bottom - top };
}

// Får sektionen plats centreras den, annars hamnar rubriken precis under menyn
function scrollToSection(section, smooth = true) {
    const nav = navHeight();
    const { top, height } = contentBox(section);
    const space = window.innerHeight - nav;
    const offset = height < space ? (space - height) / 2 : 16;

    window.scrollTo({
        top: top - nav - offset,
        behavior: smooth && !reducedMotion ? "smooth" : "auto"
    });
}

// Nästa sektion är den första vars rubrik ligger nedanför mitten av skärmen
// (en sektion som redan är centrerad räknas alltså inte)
function nextSection() {
    const limit = window.scrollY + window.innerHeight / 2;
    return SECTION_IDS
        .map((id) => document.getElementById(id))
        .find((section) => section && contentBox(section).top > limit);
}

export function initScroll() {
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburgerBtn = document.getElementById("hamburgerBtn");

    // Alla länkar till en sektion (pilen i hero och menyn) använder samma hopp
    document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        const id = link.getAttribute("href").slice(1);
        if (!SECTION_IDS.includes(id)) return;

        event.preventDefault();
        scrollToSection(document.getElementById(id));
        history.pushState(null, "", `#${id}`);

        // Stäng mobilmenyn efter ett val
        if (mobileMenu && mobileMenu.style.display === "flex") {
            mobileMenu.style.display = "none";
            hamburgerBtn?.setAttribute("aria-expanded", "false");
        }
    });

    // Öppnas sidan med en länk som nninnie.se/#about hamnar vi rätt direkt
    window.addEventListener("load", () => {
        const section = document.getElementById(location.hash.slice(1));
        if (section && SECTION_IDS.includes(section.id)) scrollToSection(section, false);
    });

    // Pilen som följer med: dold i hero (där finns redan en pil) och vid sista sektionen
    const arrow = document.getElementById("nextSection");
    const hero = document.querySelector(".lockscreen");
    if (!arrow) return;

    function updateArrow() {
        const heroVisible = hero && hero.getBoundingClientRect().bottom > window.innerHeight * 0.5;
        arrow.classList.toggle("is-hidden", heroVisible || !nextSection());
    }

    arrow.addEventListener("click", () => {
        const section = nextSection();
        if (section) scrollToSection(section);
    });

    window.addEventListener("scroll", () => requestAnimationFrame(updateArrow), { passive: true });
    window.addEventListener("resize", updateArrow);
    updateArrow();
}

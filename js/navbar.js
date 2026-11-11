/* -----------------------------------------
   🍔 NAVBAR – mobilmeny och skugga vid scroll
----------------------------------------- */

export function initNavbar() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const nav = document.querySelector(".navbar");

    // Öppna/stäng mobilmenyn. aria-expanded berättar läget för skärmläsare
    hamburgerBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.style.display === "flex";

        mobileMenu.style.display = isOpen ? "none" : "flex";
        hamburgerBtn.setAttribute("aria-expanded", !isOpen);
    });

    // Klassen .scrolled ger navbaren bakgrund när man scrollat ner
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 10);
    });
}

/* -----------------------------------------
   📩 KONTAKT – popup, formulär (validering + AJAX), toast och telefon på dator
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

const PHONE_NUMBER = "+46735704368";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Alla texter på ett ställe → lätt att översätta och ändra
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

// En regel per fält: returnerar felmeddelande, eller "" om fältet är ok
const fieldRules = {
    name: (value) => value.length >= 2 ? "" : contactTexts.nameError,
    email: (value) => emailPattern.test(value) ? "" : contactTexts.emailError,
    message: (value) => value.length >= 10 ? "" : contactTexts.messageError
};


/* ---------- 🔔 Toast (kort notis) ---------- */

let toastTimer;

function showToast(text) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = text;
    toast.style.display = "block";

    clearTimeout(toastTimer); // ny notis startar om timern
    toastTimer = setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}


/* ---------- 📱 Popup – öppna/stänga ---------- */

function initPopup() {
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

    // ?. = kör bara om elementet finns
    contactAppBtn?.addEventListener("click", openContactCard);
    closePopupBtn?.addEventListener("click", closeContactCard);

    // Klick på den mörka bakgrunden (utanför kortet) stänger popupen
    contactPopup?.addEventListener("click", (e) => {
        if (e.target === contactPopup) closeContactCard();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeContactCard();
    });
}


/* ---------- 📩 Formulär – validering + AJAX ---------- */

function validateField(input) {
    const error = fieldRules[input.name](input.value.trim());
    const errorEl = document.getElementById(`${input.id}Error`);

    // aria-invalid läses av skärmläsare och används i CSS för röd ram
    input.setAttribute("aria-invalid", error ? "true" : "false");
    if (errorEl) errorEl.textContent = error;

    return error === "";
}

function setFormStatus(text, type = "") {
    const formStatus = document.getElementById("formStatus");
    if (!formStatus) return;

    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`.trim();
}

function initForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

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
        e.preventDefault(); // vi skickar själva med fetch (ingen sidladdning)

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
            submitBtn.disabled = false; // körs alltid, både vid lyckat och fel
        }
    });
}


/* ---------- 📞 Telefon/SMS på dator ---------- */

function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function initPhoneFallback() {
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
}


export function initContact() {
    initPopup();
    initForm();
    initPhoneFallback();
}

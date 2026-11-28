/* -----------------------------------------
   💬 REFERENSER – "Läs mer" i pratbubblorna
   Varje citat visar två rader. Är texten längre får bubblan en knapp
   som fäller ut hela citatet (och tillbaka).
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

export async function initReferences() {
    // Mät först när typsnittet har laddats, annars blir radlängden fel
    await document.fonts.ready;

    const labels = isEnglishPage
        ? { more: "Read more", less: "Show less" }
        : { more: "Läs mer", less: "Visa mindre" };

    document.querySelectorAll("#reference .bubble").forEach((bubble, i) => {
        const quote = bubble.querySelector("blockquote p");
        if (!quote) return;

        quote.id = quote.id || `refQuote${i}`;
        quote.classList.add("is-clamped");

        // Ryms texten redan på två rader behövs ingen knapp
        if (quote.scrollHeight <= quote.clientHeight + 2) {
            quote.classList.remove("is-clamped");
            return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "read-more";
        button.textContent = labels.more;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", quote.id);

        button.addEventListener("click", () => {
            const open = quote.classList.toggle("is-clamped") === false;
            button.textContent = open ? labels.less : labels.more;
            button.setAttribute("aria-expanded", String(open));
        });

        // Knappen ligger på samma rad som namnet, så att bubblan inte blir högre
        const sign = bubble.querySelector(".msg-sign");
        (sign || quote.closest("blockquote")).append(button);
    });
}

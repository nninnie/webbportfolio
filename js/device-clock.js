/* -----------------------------------------
   🕒 KLOCKA OCH DATUM i telefonens/surfplattans/laptopens statusrad
----------------------------------------- */

import { isEnglishPage, setText } from "./utils.js";

function updateDeviceClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    setText("phoneTime", `${hours}:${minutes}`);

    // Datum i surfplattans/laptopens statusrad, t.ex. "tis 10 nov."
    const date = now.toLocaleDateString(isEnglishPage ? "en-GB" : "sv-SE", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });
    setText("deviceDate", date);

    // Låsskärmen i hero: långt datum och tid, t.ex. "Lördag 28 november · 14:40"
    const longDate = now.toLocaleDateString(isEnglishPage ? "en-GB" : "sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
    setText("heroDate", `${longDate.charAt(0).toUpperCase()}${longDate.slice(1)} · ${hours}:${minutes}`);
}

export function initDeviceClock() {
    updateDeviceClock();
    setInterval(updateDeviceClock, 30000); // håll klockan aktuell
}

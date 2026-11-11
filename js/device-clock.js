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
}

export function initDeviceClock() {
    updateDeviceClock();
    setInterval(updateDeviceClock, 30000); // håll klockan aktuell
}

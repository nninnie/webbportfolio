/* -----------------------------------------
   🎓 KURSER – utbildningen i Om mig
   Status räknas ut från dagens datum, så listan uppdaterar sig själv:
   ✓ klar, ● pågår, ○ kommande. Datumen kommer från utbildningsöversikten.
----------------------------------------- */

import { isEnglishPage } from "./utils.js";

const COURSES = [
    { sv: "Objektorienterad programmering med C#", en: "Object-oriented programming with C#", start: "2026-01-12", end: "2026-03-06" },
    { sv: "Databasutveckling", en: "Database development", start: "2026-03-09", end: "2026-04-17" },
    { sv: "Dynamiska webbapplikationer", en: "Dynamic web applications", start: "2026-04-20", end: "2026-06-26" },
    { sv: "Agil systemutveckling", en: "Agile development", start: "2026-08-24", end: "2026-09-18" },
    { sv: "Affärsmannaskap", en: "Business skills", start: "2026-09-21", end: "2026-10-02" },
    { sv: "Programmering med C# .NET", en: "Programming with C# .NET", start: "2026-10-05", end: "2026-11-27" },
    { sv: "Testdriven utveckling", en: "Test-driven development", start: "2026-11-30", end: "2026-12-25" },
    { sv: "Windows-applikationsutveckling", en: "Windows application development", start: "2026-12-28", end: "2027-02-05" },
    { sv: "Molntjänster och publicering", en: "Cloud services and deployment", start: "2027-02-08", end: "2027-03-05" },
    { sv: "LIA", en: "Internship (LIA)", start: "2027-03-08", end: "2027-11-19" },
    { sv: "Examensarbete", en: "Degree project", start: "2027-11-22", end: "2027-12-17" }
];

function statusFor(course, today) {
    if (today > course.end) return "done";
    if (today >= course.start) return "now";
    return "next";
}

export function initCourses() {
    const list = document.getElementById("courseList");
    if (!list) return;

    // Datum som text, t.ex. "2026-11-28", går att jämföra direkt
    const today = new Date().toISOString().slice(0, 10);
    const labels = isEnglishPage
        ? { done: "Completed", now: "In progress", next: "Upcoming" }
        : { done: "Klar", now: "Pågår", next: "Kommande" };

    // Kort datum, t.ex. "jan – mar 2026"
    const locale = isEnglishPage ? "en-GB" : "sv-SE";
    const month = (d) => new Date(d).toLocaleDateString(locale, { month: "short" }).replace(".", "");
    const period = (c) => `${month(c.start)} – ${month(c.end)} ${c.end.slice(0, 4)}`;

    list.innerHTML = COURSES.map((course) => {
        const status = statusFor(course, today);
        const name = isEnglishPage ? course.en : course.sv;
        return `<li class="course ${status}">
            <span class="course-dot" aria-hidden="true"></span>
            <span class="course-name">${name}<span class="visually-hidden"> (${labels[status]})</span></span>
            <span class="course-date">${period(course)}</span>
        </li>`;
    }).join("");
}

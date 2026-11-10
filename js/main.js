/* =========================================================
   main.js – startpunkten för all JavaScript
   Varje del av sidan har en egen modul (separation of concerns),
   här importeras de och startas i rätt ordning.
   type="module" i HTML gör att filen körs först när sidan laddats (som defer).
   ========================================================= */

import { initTheme } from "./theme.js";
import { initWeather } from "./weather.js";
import { initDeviceClock } from "./device-clock.js";
import { initNavbar } from "./navbar.js";
import { initHeroTyping } from "./hero-typing.js";
import { initContact } from "./contact.js";
import { initProjects } from "./projects.js";

initTheme();
initWeather();      // async – sidan väntar inte på vädret
initDeviceClock();
initNavbar();
initHeroTyping();
initContact();
initProjects();

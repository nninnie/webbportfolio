/* -----------------------------------------
   🧰 UTILS – små hjälpare som flera moduler använder
   (samma tanke som en Helpers-mapp i BankApp)
----------------------------------------- */

// Sidans språk avgörs av filnamnet: index-en.html = engelska
export const isEnglishPage = window.location.pathname.includes("index-en");

// Sätter text bara om elementet finns → ingen krasch på sidor som saknar elementet
export function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

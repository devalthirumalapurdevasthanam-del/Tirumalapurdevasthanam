async function setLang(lang) {
  try {
    const res = await fetch(`data/${lang}.json`);
    const data = await res.json();

    // Update all text using data-key
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (data[key]) {
        el.textContent = data[key];
      }
    });

    // IMPORTANT: set html lang attribute (for Telugu styling)
    document.documentElement.setAttribute("lang", lang);

    // Save preference
    localStorage.setItem("lang", lang);

    // Update active button
    updateLangButtons(lang);

  } catch (err) {
    console.error("Language load error:", err);
  }
}

function updateLangButtons(lang) {
  const te = document.getElementById("btn-te");
  const en = document.getElementById("btn-en");

  if (te) te.classList.remove("active");
  if (en) en.classList.remove("active");

  if (lang === "te" && te) te.classList.add("active");
  if (lang === "en" && en) en.classList.add("active");
}

// Load saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "te";
  setLang(savedLang);
});

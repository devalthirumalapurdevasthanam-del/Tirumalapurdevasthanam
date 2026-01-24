async function setLang(lang) {
  const res = await fetch(`data/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (data[key]) el.textContent = data[key];
  });

  localStorage.setItem("lang", lang);
  updateLangButtons(lang);
}

function updateLangButtons(lang) {
  const te = document.getElementById("btn-te");
  const en = document.getElementById("btn-en");

  if (te) te.classList.remove("active");
  if (en) en.classList.remove("active");

  if (lang === "te" && te) te.classList.add("active");
  if (lang === "en" && en) en.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "te";
  setLang(lang);
});

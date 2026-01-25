/* =======================
   LANGUAGE HANDLING
======================= */
async function setLang(lang) {
  try {
    const res = await fetch(`data/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (data[key]) el.textContent = data[key];
    });

    localStorage.setItem("lang", lang);
    updateLangButtons(lang);
  } catch (e) {
    console.error("Language load error:", e);
  }
}

function updateLangButtons(lang) {
  document.getElementById("btn-te")?.classList.remove("active");
  document.getElementById("btn-en")?.classList.remove("active");

  if (lang === "te") document.getElementById("btn-te")?.classList.add("active");
  if (lang === "en") document.getElementById("btn-en")?.classList.add("active");
}

/* =======================
   AUDIO HANDLING
======================= */
function initAudio() {
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("audio-toggle");
  if (!audio || !toggle) return;

  let muted = localStorage.getItem("audioMuted") === "true";
  audio.muted = muted;
  toggle.textContent = muted ? "🔇" : "🔊";

  // Browser requires user interaction
  document.body.addEventListener(
    "click",
    () => {
      if (!audio.muted) {
        audio.play().catch(() => {});
      }
    },
    { once: true }
  );

  toggle.addEventListener("click", e => {
    e.stopPropagation();
    audio.muted = !audio.muted;
    toggle.textContent = audio.muted ? "🔇" : "🔊";
    localStorage.setItem("audioMuted", audio.muted);
    if (!audio.muted) audio.play().catch(() => {});
  });
}

/* =======================
   INIT ON PAGE LOAD
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "te";
  setLang(lang);
  initAudio();
});

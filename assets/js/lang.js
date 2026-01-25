/* =======================
   LANGUAGE HANDLING
======================= */
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
  document.getElementById("btn-te")?.classList.remove("active");
  document.getElementById("btn-en")?.classList.remove("active");

  if (lang === "te") document.getElementById("btn-te")?.classList.add("active");
  if (lang === "en") document.getElementById("btn-en")?.classList.add("active");
}

/* =======================
   AUDIO HANDLING
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("audio-toggle");

  if (!audio || !toggle) return;

  let muted = localStorage.getItem("audioMuted") === "true";

  audio.muted = muted;
  toggle.textContent = muted ? "🔇" : "🔊";

  // 🔔 Start audio AFTER first user click
  const startAudioOnce = () => {
    if (!muted && audio.paused) {
      audio.play().catch(() => {});
    }
    document.removeEventListener("click", startAudioOnce);
  };

  document.addEventListener("click", startAudioOnce);

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    muted = !muted;
    audio.muted = muted;
    toggle.textContent = muted ? "🔇" : "🔊";
    localStorage.setItem("audioMuted", muted);

    if (!muted) audio.play().catch(() => {});
  });

  // Load language
  const lang = localStorage.getItem("lang") || "te";
  setLang(lang);
});

async function setLang(lang) {
  const res = await fetch(`data/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (data[key]) el.innerText = data[key];
  });

  localStorage.setItem("lang", lang);
  updateLangButtons(lang);
}

function updateLangButtons(lang) {
  document.getElementById("btn-te")?.classList.remove("active");
  document.getElementById("btn-en")?.classList.remove("active");

  if (lang === "te") {
    document.getElementById("btn-te")?.classList.add("active");
  } else {
    document.getElementById("btn-en")?.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  /* ========= LANGUAGE INIT ========= */
  const lang = localStorage.getItem("lang") || "te";
  await setLang(lang);

  /* ========= AUDIO CONTROLS ========= */
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("audio-toggle");

  if (!audio || !toggle) return;

  let isMuted = localStorage.getItem("audioMuted") === "true";

  audio.muted = isMuted;
  toggle.textContent = isMuted ? "🔇" : "🔊";

  // autoplay after first user interaction
  document.body.addEventListener(
    "click",
    () => {
      if (!isMuted && audio.paused) {
        audio.play().catch(() => {});
      }
    },
    { once: true }
  );

  toggle.addEventListener("click", e => {
    e.stopPropagation();
    isMuted = !isMuted;
    audio.muted = isMuted;
    toggle.textContent = isMuted ? "🔇" : "🔊";
    localStorage.setItem("audioMuted", isMuted);
    if (!isMuted) audio.play().catch(() => {})

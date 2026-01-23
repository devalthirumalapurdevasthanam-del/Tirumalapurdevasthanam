async function setLang(lang){
  const res = await fetch(`data/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");
    if(data[key]) el.innerText = data[key];
  });

  localStorage.setItem("lang", lang);
  updateLangButtons(lang);
}

function updateLangButtons(lang){
  document.getElementById("btn-te")?.classList.remove("active");
  document.getElementById("btn-en")?.classList.remove("active");

  if(lang === "te"){
    document.getElementById("btn-te")?.classList.add("active");
  }else{
    document.getElementById("btn-en")?.classList.add("active");
  }
}

window.onload = () => {
  const lang = localStorage.getItem("lang") || "te";
  setLang(lang);
};

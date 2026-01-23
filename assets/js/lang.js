async function setLang(lang){
  const res = await fetch(`data/${lang}.json`);
  const data = await res.json();
  document.querySelectorAll("[data-key]").forEach(e=>{
    if(data[e.dataset.key]) e.innerText=data[e.dataset.key];
  });
  localStorage.setItem("lang",lang);
}
window.onload=()=>setLang(localStorage.getItem("lang")||"te");

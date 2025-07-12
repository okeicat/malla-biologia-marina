const mallaData = [
  {
    semestre: 1,
    ramos: [
      { nombre:"Matemática I", creditos:4, tipo:"troncal" },
      { nombre:"Biología General", creditos:4, tipo:"troncal" },
      { nombre:"Técnicas de Comunicación Científica", creditos:3, tipo:"troncal" },
      { nombre:"Introducción a las Ciencias del Mar", creditos:3, tipo:"troncal" },
      { nombre:"Inglés Comunicativo 1", creditos:3, tipo:"troncal" },
      { nombre:"Complementario 1", creditos:2, tipo:"complementario" }
    ]
  },
  {
    semestre: 2,
    ramos: [
      { nombre:"Matemática II", creditos:4, tipo:"troncal", prereq:"Matemática I" },
      { nombre:"Biología Marina", creditos:4, tipo:"troncal" },
      { nombre:"Química General I", creditos:5, tipo:"troncal" },
      { nombre:"Introducción a la Biodiversidad Marina", creditos:4, tipo:"troncal" },
      { nombre:"Inglés Comunicativo 2", creditos:3, tipo:"troncal", prereq:"Inglés Comunicativo 1" },
      { nombre:"Complementario 2", creditos:2, tipo:"complementario" }
    ]
  },
  // ... (semestres 3 a 10 llenados de forma similar)
  {
    semestre: 10,
    ramos: [
      { nombre:"Seminario de Título", creditos:20, tipo:"troncal" }
    ]
  }
];

function renderMalla() {
  const cont = document.getElementById("malla");
  mallaData.forEach(s => {
    const divS = document.createElement("div");
    divS.className = "semestre";
    divS.innerHTML = `<h2>Sem ${s.semestre}</h2>`;
    s.ramos.forEach(r => {
      const divR = document.createElement("div");
      divR.className = `ramo ${r.tipo}`;
      divR.innerText = `${r.nombre} (${r.creditos})`;
      divR.onclick = () => showInfo(r);
      divS.appendChild(divR);
    });
    cont.appendChild(divS);
  });
}
function showInfo(ramo) {
  document.getElementById("modal-title").innerText = ramo.nombre;
  let texto = `Créditos: ${ramo.creditos}`;
  if(ramo.prereq) texto += `\nPrerrequisito: ${ramo.prereq}`;
  document.getElementById("modal-content").innerText = texto;
  document.getElementById("info-modal").style.display = "flex";
}
window.onload = () => {
  renderMalla();
  document.querySelector(".close").onclick = () => document.getElementById("info-modal").style.display = "none";
};

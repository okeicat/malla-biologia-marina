// 🧠 Convertir texto de prerrequisitos en arreglo
function parsePrereq(texto) {
  if (!texto) return [];
  return texto.split(/ y |,|\/|;/).map(p => p.trim());
}

// ✅ Estado de aprobación
let aprobados = new Set();

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
  {
    semestre: 3,
    ramos: [
      { nombre:"Zoología Marina", creditos:5, tipo:"troncal", prereq:"Introducción a la Biodiversidad Marina" },
      { nombre:"Botánica Marina", creditos:4, tipo:"troncal", prereq:"Introducción a la Biodiversidad Marina" },
      { nombre:"Computación y Programación Básica", creditos:3, tipo:"troncal" },
      { nombre:"Química General II", creditos:5, tipo:"troncal", prereq:"Química General I" },
      { nombre:"Física I", creditos:4, tipo:"troncal" },
      { nombre:"Complementaria 3", creditos:2, tipo:"complementario" }
    ]
  },
  {
    semestre: 4,
    ramos: [
      { nombre:"Física II", creditos:4, tipo:"troncal", prereq:"Física I" },
      { nombre:"Bioestadística I", creditos:4, tipo:"troncal", prereq:"Matemática II" },
      { nombre:"Química Orgánica Básica", creditos:4, tipo:"troncal", prereq:"Química General II" },
      { nombre:"Biología de Recursos", creditos:4, tipo:"troncal", prereq:"Botánica Marina y Zoología Marina" },
      { nombre:"Fundamento y Metodología de las Ciencias", creditos:3, tipo:"troncal", prereq:"Botánica Marina, Biología Marina y Zoología Marina" },
      { nombre:"Electivo 1", creditos:4, tipo:"electivo" }
    ]
  },
  {
    semestre: 5,
    ramos: [
      { nombre:"Análisis Instrumental", creditos:4, tipo:"troncal", prereq:"Química Orgánica Básica" },
      { nombre:"Bioestadística II", creditos:4, tipo:"troncal", prereq:"Bioestadística I" },
      { nombre:"Biología Pesquera", creditos:4, tipo:"troncal", prereq:"Biología de Recursos y Bioestadística I" },
      { nombre:"Oceanografía General", creditos:4, tipo:"troncal", prereq:"Introducción a las Ciencias del Mar, Introducción a la Biodiversidad Marina, Física I, Química General II" },
      { nombre:"Electivo 2", creditos:4, tipo:"electivo" }
    ]
  },
  {
    semestre: 6,
    ramos: [
      { nombre:"Bioquímica", creditos:4, tipo:"troncal", prereq:"Química Orgánica Básica" },
      { nombre:"Oceanografía Biológica", creditos:4, tipo:"troncal", prereq:"Oceanografía General" },
      { nombre:"Ecología Marina", creditos:3, tipo:"troncal", prereq:"Botánica Marina, Zoología Marina, Bioestadística II" },
      { nombre:"Impacto Antropogénico en el Océano", creditos:4, tipo:"troncal", prereq:"Oceanografía General, Análisis Instrumental" },
      { nombre:"Electiva 3", creditos:4, tipo:"electivo" }
    ]
  },
  {
    semestre: 7,
    ramos: [
      { nombre:"Fisiología Animal Comparada", creditos:4, tipo:"troncal", prereq:"Bioquímica, Zoología Marina" },
      { nombre:"Genética de Organismos Marinos", creditos:4, tipo:"troncal", prereq:"Bioquímica" },
      { nombre:"Legislación y Sustentabilidad", creditos:4, tipo:"troncal" },
      { nombre:"Microbiología Marina", creditos:4, tipo:"troncal", prereq:"Bioquímica" }
    ]
  },
  {
    semestre: 8,
    ramos: [
      { nombre:"Evolución y Biogeografía", creditos:4, tipo:"troncal", prereq:"Genética de Organismos Marinos" },
      { nombre:"Economía, Administración y Emprendimiento", creditos:4, tipo:"troncal", prereq:"Bioestadística II" },
      { nombre:"Conservación Marina", creditos:4, tipo:"troncal", prereq:"Botánica Marina, Zoología Marina, Ecología Marina" },
      { nombre:"Acuicultura", creditos:4, tipo:"troncal", prereq:"Botánica Marina, Zoología Marina" },
      { nombre:"Electivo 5", creditos:4, tipo:"electivo" }
    ]
  },
  {
    semestre: 9,
    ramos: [
      { nombre:"Producción y Control de Calidad", creditos:3, tipo:"troncal", prereq:"Legislación y Sustentabilidad, Acuicultura" },
      { nombre:"Taller de Divulgación Científica", creditos:2, tipo:"troncal" },
      { nombre:"Proyecto de Seminario de Título", creditos:2, tipo:"troncal" },
      { nombre:"Práctica Profesional", creditos:4, tipo:"troncal" }
    ]
  },
  {
    semestre: 10,
    ramos: [
      { nombre:"Seminario de Título", creditos:20, tipo:"troncal" }
    ]
  }
];

function renderMalla() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";

  mallaData.forEach(s => {
    const divS = document.createElement("div");
    divS.className = "semestre";
    divS.innerHTML = `<h2>Semestre ${s.semestre}</h2>`;

    s.ramos.forEach(r => {
      const divR = document.createElement("div");
      divR.className = "ramo";

      const prerreqs = parsePrereq(r.prereq);
      const habilitado = prerreqs.every(req => aprobados.has(req));
      const aprobado = aprobados.has(r.nombre);

      if (aprobado) {
        divR.classList.add("aprobado");
      } else if (habilitado || prerreqs.length === 0) {
        divR.classList.add("disponible");
      } else {
        divR.classList.add("bloqueado");
      }

      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.checked = aprobado;

      chk.onclick = (e) => {
        if (e.target.checked) {
          aprobados.add(r.nombre);
        } else {
          aprobados.delete(r.nombre);
        }
        renderMalla();
      };

      divR.appendChild(chk);
      divR.appendChild(document.createTextNode(` ${r.nombre} (${r.creditos})`));
      divR.onclick = () => showInfo(r);
      divS.appendChild(divR);
    });

    cont.appendChild(divS);
  });
}

function showInfo(ramo) {
  document.getElementById("modal-title").innerText = ramo.nombre;
  let texto = `Créditos: ${ramo

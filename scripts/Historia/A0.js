/* ACTIVIDAD 1 */
const palabras = [
    "POBLACIÓN","FAMILIA","VIVIENDA","CLASES","DIVERSIDAD","EDUCACIÓN","COMERCIO",
    "MERCADO","RIQUEZA","TRABAJO","INDUSTRIA","FÁBRICA","GOBIERNO","CONSTITUCIÓN",
    "REPÚBLICA","PARLAMENTO","MONARQUÍA","PRESIDENCIA","TRADICIÓN","LENGUA",
    "RELIGIÓN","IDENTIDAD","ARTE","PATRIMONIO"
];

let usadas = [];

const btnPalabra = document.getElementById("btn-palabra");
const btnBingo = document.getElementById("btn-bingo");
const palabraActual = document.getElementById("palabra-actual");
const listaBingo = document.getElementById("lista-bingo");

btnPalabra.addEventListener("click", () => {
    if (usadas.length === palabras.length) {
        palabraActual.textContent = "¡Ya están todas las palabras!";
        return;
    }
    let palabra;
    do {
        const index = Math.floor(Math.random() * palabras.length);
        palabra = palabras[index];
    } while (usadas.includes(palabra));

    usadas.push(palabra);
    palabraActual.textContent = palabra;
});

btnBingo.addEventListener("click", () => {
    if (usadas.length === 0) {
        listaBingo.innerHTML = "<p>No ha salido ninguna palabra todavía.</p>";
    } else {
        listaBingo.innerHTML = "<h3>Palabras:</h3><ul>" +
            usadas.map((p, i) => `<li data-index="${i}">${p}</li>`).join("") +
            "</ul>";

        const items = listaBingo.querySelectorAll("li");
        items.forEach(item => {
            item.addEventListener("click", () => {
                item.classList.toggle("marcada");
                if (item.classList.contains("marcada")) {
                    item.textContent = "✅ " + usadas[item.dataset.index];
                } else {
                    item.textContent = usadas[item.dataset.index];
                }
            });
        });
    }
});

/* ACTIVIDAD 2 */
const respuestas = {
  "Plaça del Rei": {
    sustantivos: ["Muralla","Plaza","Piedra","Arcos"],
    adjetivos: ["Medieval","Histórico/a","Tranquilo/a","Amplio/a"]
  },
  "Park Güell": {
    sustantivos: ["Colores","Azulejos","Fantasía","Modernismo"],
    adjetivos: ["Colorido/a","Mágico/a","Único/a","Creativo/a"]
  },
  "Turó de la Rovira": {
    sustantivos: ["Búnker","Mirador","Guerra","Ruinas"],
    adjetivos: ["Abandonado/a","Elevado/a","Panorámico/a","Estratégico/a"]
  }
};

function normalizar(str) {
  return str.trim().toLowerCase();
}

function tacharEnLista(palabra, tipo) {
  const lista = document.querySelector(
    tipo === "sustantivo" ? ".columna-1 ul" : ".columna-2 ul"
  );

  lista.querySelectorAll("li").forEach(li => {
    if (normalizar(li.innerText) === palabra) {
      li.style.textDecoration = "line-through";
      li.style.color = "#888";
    }
  });
}

const botonVerificar = document.querySelector(".bloques .verificar");

botonVerificar.addEventListener("click", () => {
  document.querySelectorAll(".bloque").forEach(bloque => {
    const titulo = bloque.querySelector("figcaption strong").innerText;
    const inputs = bloque.querySelectorAll("input");

    const sustantivosCorrectos = respuestas[titulo].sustantivos.map(normalizar);
    const adjetivosCorrectos = respuestas[titulo].adjetivos.map(normalizar);

    const inputsSustantivos = Array.from(inputs).filter((_, i) => i % 2 === 0);
    const inputsAdjetivos = Array.from(inputs).filter((_, i) => i % 2 !== 0);

    inputsSustantivos.forEach(input => {
      const palabra = normalizar(input.value);
      if (sustantivosCorrectos.includes(palabra)) {
        input.style.backgroundColor = "#d0f0d0";
        input.style.color = "black";
        tacharEnLista(palabra, "sustantivo"); 
      } else {
        input.style.backgroundColor = "#e63946";
        input.style.color = "#ffff";
      }
    });

    inputsAdjetivos.forEach(input => {
      const palabra = normalizar(input.value);
      if (adjetivosCorrectos.includes(palabra)) {
        input.style.backgroundColor = "#d0f0d0";
        input.style.color = "black";
        tacharEnLista(palabra, "adjetivo"); 
      } else {
        input.style.backgroundColor = "#e63946";
        input.style.color = "#ffff";
      }
    });
  });
});

/* ACTIVIDAD 3 */
document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const comprobarBtn = document.getElementById("comprobar");

  let dragged = null;

  draggables.forEach(drag => {
    drag.addEventListener("dragstart", () => {
      dragged = drag;
      drag.classList.add("dragging");
    });
    drag.addEventListener("dragend", () => {
      dragged = null;
      drag.classList.remove("dragging");
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault(); 
      zone.classList.add("over");
    });
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("over");
    });
    zone.addEventListener("drop", e => {
      e.preventDefault();
      zone.classList.remove("over");
      if (dragged) {
        if (dragged.parentNode) dragged.parentNode.removeChild(dragged);
        zone.appendChild(dragged);
      }
    });
  });

  comprobarBtn.addEventListener("click", () => {
    dropzones.forEach(zone => {
      const draggableInside = zone.querySelector(".draggable");
      if (draggableInside) {
        if (draggableInside.textContent === zone.dataset.evento) {
          draggableInside.style.backgroundColor = "#d0f0d0";
          draggableInside.style.color = "black";
        } else {
          draggableInside.style.backgroundColor = "#e63946";
          draggableInside.style.color = "#ffffff";
        }
      }
    });
  });
});

/* ACTIVIDAD 4 */
document.addEventListener("DOMContentLoaded", () => {
  const respuestas = [
    "camp nou",
    "montjuic",  
    "casa batlló", 
    "barrio gótico", 
    "santa maria del mar", 
    "arco de triunfo", 
    "sagrada familia", 
    "torre glòries"
  ];

  const inputs = document.querySelectorAll("#actividad-4 .lugares input");
  const boton = document.querySelector("#actividad-4 .verificar");

  boton.addEventListener("click", () => {
    inputs.forEach((input, i) => {
      const valor = input.value.trim().toLowerCase();
      input.classList.remove("correcto", "incorrecto");

      if (valor === respuestas[i]) {
        input.classList.add("correcto");
      } else {
        input.classList.add("incorrecto");
      }
    });
  });

  const areas = document.querySelectorAll("map area");
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");

  areas.forEach(area => {
    area.addEventListener("click", (e) => {
      e.preventDefault();
      const imgPath = area.dataset.img;
      popupImg.src = imgPath;
      popup.style.display = "block";
    });
  });
});

/* ACTIVIDAD 5 */
const panelImgs = document.querySelectorAll('.panel img');
const canvas = document.getElementById('canvas');

panelImgs.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('src', e.target.src);
  });
});

canvas.addEventListener('dragover', e => e.preventDefault());

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const src = e.dataTransfer.getData('src');
  if (src) {
    const newImg = document.createElement('div');
    newImg.classList.add('draggable');
    newImg.style.left = e.offsetX + 'px';
    newImg.style.top = e.offsetY + 'px';

    const image = document.createElement('img');
    image.src = src;
    image.style.width = "100px";
    image.style.height = "auto";

    const resizer = document.createElement('div');
    resizer.classList.add('resizer');

    newImg.appendChild(image);
    newImg.appendChild(resizer);
    canvas.appendChild(newImg);

    makeDraggable(newImg);
    makeResizable(newImg, resizer);
  }
});

function makeDraggable(element) {
  let offsetX, offsetY, isDragging = false;

  element.addEventListener('mousedown', e => {
    if (e.target.classList.contains('resizer')) return;
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const x = e.clientX - canvas.getBoundingClientRect().left - offsetX;
    const y = e.clientY - canvas.getBoundingClientRect().top - offsetY;
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

function makeResizable(element, resizer) {
  let isResizing = false;

  resizer.addEventListener('mousedown', e => {
    isResizing = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isResizing) return;

    const rect = element.getBoundingClientRect();
    const img = element.querySelector('img');

    const newWidth = e.clientX - rect.left;
    const newHeight = e.clientY - rect.top;

    if (newWidth > 20) img.style.width = newWidth + 'px';
    if (newHeight > 20) img.style.height = newHeight + 'px';
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
  });
}

/* REFLEXIÓN */
document.getElementById("agregar").addEventListener("click", function() {
  const lista = document.querySelector("#reflexion ul");

  const nuevoLi = document.createElement("li");
  nuevoLi.classList.add("sin-punto");

  const inputPais = document.createElement("input");
  inputPais.type = "text";
  inputPais.placeholder = "País";
  inputPais.classList.add("pais"); 

  const inputRecomiendo = document.createElement("input");
  inputRecomiendo.type = "text";
  inputRecomiendo.placeholder = "Recomiendo...";
  inputRecomiendo.classList.add("respuesta"); 

  nuevoLi.appendChild(inputPais);
  nuevoLi.appendChild(inputRecomiendo);

  lista.appendChild(nuevoLi);
});
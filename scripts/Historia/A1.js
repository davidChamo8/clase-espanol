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

/* ACTIVIDAD 3 */
const preguntas = [
  { texto: "¿Qué espacio está bajo tierra?", correcta: "refugi" },
  { texto: "¿Qué espacio está en la montaña?", correcta: "joana" },
  { texto: "¿Qué espacio está dentro de la ciudad?", correcta: "yacer" },
  { texto: "¿Dónde podemos ver las ruinas de un antiguo mercado?", correcta: "yacer" },
  { texto: "¿Dónde podemos ver una antigua escuela en una masía?", correcta: "joana" },
  { texto: "¿Donde podemos ver un refugio de la Guerra Civil?", correcta: "refugi" },
  { texto: "¿Cuál representa mejor el ámbito de la política?", correcta: "refugi" },
  { texto: "¿Cuál representa mejor el ámbito de la economía?", correcta: "yacer" },
  { texto: "¿Cuál representa mejor el ámbito de la cultura?", correcta: "joana" }
];

const imagenes = {
  joana: { src: "../../../images/joana.png", titulo: "Vil·la Joana" },
  yacer: { src: "../../../images/yacer.png", titulo: "Yacimiento del Born" },
  refugi: { src: "../../../images/refugi.png", titulo: "Refugio 307" }
};

let indicePregunta = 0;

const preguntaTexto = document.getElementById("pregunta-texto");
const opcionesContainer = document.getElementById("opciones-container");
const btnSiguiente = document.getElementById("btn-siguiente");

function cargarPregunta() {
  const pregunta = preguntas[indicePregunta];
  preguntaTexto.textContent = pregunta.texto;
  opcionesContainer.innerHTML = "";

  for (const clave in imagenes) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = imagenes[clave].src;
    img.dataset.opcion = clave;
    img.addEventListener("click", () => comprobarRespuesta(img, pregunta.correcta));

    const caption = document.createElement("figcaption");
    caption.textContent = imagenes[clave].titulo;

    figure.appendChild(img);
    figure.appendChild(caption);
    opcionesContainer.appendChild(figure);
  }

  btnSiguiente.style.display = "none";
}

function comprobarRespuesta(img, correcta) {
  if (img.dataset.opcion === correcta) {
    img.style.border = "5px solid #d0f0d0";
    img.style.outline = "2px solid #002b36";  
    btnSiguiente.style.display = "inline-block";
  } else {
    img.style.border = "5px solid #e63946";
    img.style.outline = "2px solid #002b36";  
  }
}

btnSiguiente.addEventListener("click", () => {
  indicePregunta++;
  if (indicePregunta < preguntas.length) {
    cargarPregunta();
  } else {
    preguntaTexto.textContent = "¡Actividad terminada!";
    opcionesContainer.innerHTML = "";
    btnSiguiente.style.display = "none";
  }
});

cargarPregunta();

/* ACTIVIDAD 4 */
const opciones = document.querySelectorAll(".opcion");
opciones.forEach(boton => {
  boton.addEventListener("click", () => {
    const contenedor = boton.parentElement;
    contenedor.querySelectorAll(".opcion").forEach(b => {
      b.classList.remove("seleccionada");
      b.style.backgroundColor = "";
    });
    boton.classList.add("seleccionada");
    contenedor.setAttribute("data-seleccion", boton.textContent[0].toLowerCase());
  });
});

document.getElementById("comprobar").addEventListener("click", () => {
  const preguntas = document.querySelectorAll(".pregunta");
  let aciertos = 0;
  preguntas.forEach(p => {
    const seleccion = p.querySelector(".seleccionada");
    if (!seleccion) return;

    if (p.getAttribute("data-seleccion") === p.getAttribute("data-respuesta")) {
      aciertos++;
      seleccion.style.backgroundColor = "#d0f0d0";
    } else {
      seleccion.style.backgroundColor = "#e63946";
      seleccion.style.color = "#ffffff";
    }
  });
  document.getElementById("resultado").textContent =
    `${aciertos} de ${preguntas.length} preguntas acertadas`;
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
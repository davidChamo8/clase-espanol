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
(function() {
  const panelImgs = document.querySelectorAll('.panel img');
  const canvas = document.getElementById('canvas');

  panelImgs.forEach(img => {
    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.src);
      e.dataTransfer.effectAllowed = 'copy';
    });
  });

  canvas.addEventListener('dragover', e => e.preventDefault());

  canvas.addEventListener('drop', e => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('src');
    if (!src) return;

    const placed = document.createElement('div');
    placed.classList.add('placed-item');

    const rect = canvas.getBoundingClientRect();
    placed.style.left = (e.clientX - rect.left) + 'px';
    placed.style.top  = (e.clientY - rect.top) + 'px';

    const image = document.createElement('img');
    image.src = src;
    image.style.width = "100px";
    image.style.height = "auto";
    image.draggable = false;
    image.alt = '';

    const resizer = document.createElement('div');
    resizer.classList.add('placed-resizer');

    placed.appendChild(image);
    placed.appendChild(resizer);
    canvas.appendChild(placed);

    makeDraggable(placed);
    makeResizable(placed, resizer);
  });

  function makeDraggable(element) {
    let offsetX = 0, offsetY = 0;

    function onMouseDown(e) {
      if (e.target.classList.contains('placed-resizer')) return;
      e.preventDefault();

      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      const canvasRect = canvas.getBoundingClientRect();

      let x = e.clientX - canvasRect.left - offsetX;
      let y = e.clientY - canvasRect.top - offsetY;

      const maxX = canvas.clientWidth - element.offsetWidth;
      const maxY = canvas.clientHeight - element.offsetHeight;
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      element.style.left = x + 'px';
      element.style.top  = y + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    element.addEventListener('mousedown', onMouseDown);
  }

  function makeResizable(element, resizer) {
    let startX = 0, startY = 0;
    let startW = 0, startH = 0;

    resizer.addEventListener('mousedown', startResize);

    function startResize(e) {
      e.preventDefault();
      e.stopPropagation();
      const img = element.querySelector('img');
      startX = e.clientX;
      startY = e.clientY;
      startW = img.getBoundingClientRect().width;
      startH = img.getBoundingClientRect().height;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const img = element.querySelector('img');

      let newW = startW + dx;
      let newH = startH + dy;

      newW = Math.max(20, newW);
      newH = Math.max(20, newH);

      const canvasRect = canvas.getBoundingClientRect();
      const elRect = element.getBoundingClientRect();
      const offsetLeft = elRect.left - canvasRect.left;
      const offsetTop  = elRect.top  - canvasRect.top;

      const maxW = canvas.clientWidth - offsetLeft;
      const maxH = canvas.clientHeight - offsetTop;

      newW = Math.min(newW, maxW);
      newH = Math.min(newH, maxH);

      img.style.width = newW + 'px';
      img.style.height = newH + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

})();

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
/* ACTIVIDAD 2 */
const pares = [
  { id: 1, contenido: "Vino" },
  { id: 1, contenido: "" },
  { id: 2, contenido: "Tomates" },
  { id: 2, contenido: "" },
  { id: 3, contenido: "Romesco" },
  { id: 3, contenido: "" },
  { id: 4, contenido: "Leña" },
  { id: 4, contenido: "" },
  { id: 5, contenido: "Mojar" },
  { id: 5, contenido: "" },
  { id: 6, contenido: "Pelar" },
  { id: 6, contenido: "" },
  { id: 7, contenido: "Asar" },
  { id: 7, contenido: "" },
  { id: 8, contenido: "Cebollas" },
  { id: 8, contenido: "" },
  { id: 9, contenido: "Parrilla" },
  { id: 9, contenido: "" },
  { id: 10, contenido: "Babero" },
  { id: 10, contenido: "" },
  { id: 11, contenido: "Pan" },
  { id: 11, contenido: "" },
  { id: 12, contenido: "Pinzas" },
  { id: 12, contenido: "" }
];

const imagenesPorId = {
  1: "../../../images/vino.png",
  2: "../../../images/tomates.png",
  3: "../../../images/romesco.png",
  4: "../../../images/leña.png",
  5: "../../../images/mojar.png",
  6: "../../../images/pelar.png",
  7: "../../../images/asar.png",
  8: "../../../images/cebollas.png",
  9: "../../../images/parrilla.png",
  10: "../../../images/babero.png",
  11: "../../../images/pan.png",
  12: "../../../images/pinzas.png"
};

let cartasSeleccionadas = [];
let bloqueo = false;

function crearTablero() {
  const tablero = document.querySelector("#tablero");
  tablero.innerHTML = "";

  const cartasMezcladas = [...pares].sort(() => 0.5 - Math.random());

  cartasMezcladas.forEach((carta) => {
    const cartaElemento = document.createElement("div");
    cartaElemento.classList.add("carta");
    cartaElemento.dataset.id = carta.id;

    const contenidoHTML = carta.contenido !== ""
      ? carta.contenido
      : `<img src="${imagenesPorId[carta.id]}" alt="Imagen ${carta.id}" class="imagen-carta">`;

    cartaElemento.innerHTML = `
      <div class="carta-inner">
        <div class="reverso">?</div>
        <div class="cara">${contenidoHTML}</div>
      </div>
    `;

    cartaElemento.addEventListener("click", () => voltearCarta(cartaElemento));
    tablero.appendChild(cartaElemento);
  });

  crearBancoPalabras();
}

function crearBancoPalabras() {
  const banco = document.querySelector("#banco-palabras");
  banco.innerHTML = "";

  const palabrasUnicas = [...new Set(pares.filter(p => p.contenido !== "").map(p => p.contenido))];

  palabrasUnicas.forEach(palabra => {
    const span = document.createElement("span");
    span.classList.add("palabra");
    span.dataset.palabra = palabra;
    span.textContent = palabra;
    banco.appendChild(span);
  });
}

function voltearCarta(carta) {
  if (bloqueo || carta.classList.contains("volteada")) return;

  carta.classList.add("volteada");
  cartasSeleccionadas.push(carta);

  if (cartasSeleccionadas.length === 2) {
    comprobarPareja();
  }
}

function comprobarPareja() {
  const [carta1, carta2] = cartasSeleccionadas;
  const id1 = carta1.dataset.id;
  const id2 = carta2.dataset.id;

  if (id1 === id2) {
    tacharPalabra(id1);
    cartasSeleccionadas = [];
  } else {
    bloqueo = true;
    setTimeout(() => {
      carta1.classList.remove("volteada");
      carta2.classList.remove("volteada");
      cartasSeleccionadas = [];
      bloqueo = false;
    }, 1000);
  }
}

function tacharPalabra(id) {
  const palabra = pares.find(p => p.id == id && p.contenido !== "").contenido;
  const span = document.querySelector(`#banco-palabras .palabra[data-palabra="${palabra}"]`);
  if (span) {
    span.classList.add("tachado");
  }
}

document.addEventListener("DOMContentLoaded", crearTablero);

/* ACTIVIDAD 3 */
const correctOrder = ["fogata", "servilleta", "calcot", "salsa"];

const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(img => {
  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
});

dropzones.forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.classList.add("hovered");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("hovered");
  });

  zone.addEventListener("drop", e => {
    e.preventDefault();
    zone.classList.remove("hovered");
    const id = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);

    if (zone.firstChild) {
      document.querySelector(".contenedor-imagenes").appendChild(zone.firstChild);
    }

    zone.appendChild(draggedElement);
  });
});

function verificarOrden() {
  const resultado = document.getElementById("resultado");
  const imagenHombre = document.getElementById("hombre");
  let esCorrecto = true;

  dropzones.forEach((zone, index) => {
    const img = zone.querySelector("img");
    if (!img || img.id !== correctOrder[index]) {
      esCorrecto = false;
    }
  });

  if (esCorrecto) {
    imagenHombre.src = "../../../images/feliz.png";
    imagenHombre.alt = "Hombre feliz";
  } else {
    imagenHombre.src = "../../../images/enfadado.png";
    imagenHombre.alt = "Hombre enfadado";
  }
}

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
const canvas = document.getElementById('pizarra');
const ctx = canvas.getContext('2d');
let dibujando = false;
let modo = 'pincel'; 
let color = '#002b36'; 

ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.strokeStyle = color;

function comenzarDibujo(e) {
  if (modo !== 'pincel') return;
  dibujando = true;
  dibujar(e);
}

function terminarDibujo() {
  if (modo !== 'pincel') return;
  dibujando = false;
  ctx.beginPath();
}

function dibujar(e) {
  if (!dibujando || modo !== 'pincel') return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function floodFill(x, y, fillColor) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [ (bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255 ];
  }

  const fillColorRgb = hexToRgb(fillColor);

  function getPixelColor(x, y) {
    const index = (y * canvas.width + x) * 4;
    return [data[index], data[index +1], data[index +2], data[index +3]];
  }

  function colorsMatch(a, b, tolerance=10) {
    for (let i = 0; i < 3; i++) {
      if (Math.abs(a[i] - b[i]) > tolerance) return false;
    }
    return true;
  }

  const targetColor = getPixelColor(x, y);
  if (colorsMatch(targetColor, fillColorRgb)) return; 

  const stack = [[x, y]];

  while (stack.length) {
    const [cx, cy] = stack.pop();
    const currentColor = getPixelColor(cx, cy);

    if (colorsMatch(currentColor, targetColor)) {
      const idx = (cy * canvas.width + cx) * 4;
      data[idx] = fillColorRgb[0];
      data[idx + 1] = fillColorRgb[1];
      data[idx + 2] = fillColorRgb[2];
      data[idx + 3] = 255;

      if (cx + 1 < canvas.width) stack.push([cx + 1, cy]);
      if (cx - 1 >= 0) stack.push([cx - 1, cy]);
      if (cy + 1 < canvas.height) stack.push([cx, cy + 1]);
      if (cy - 1 >= 0) stack.push([cx, cy - 1]);
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

canvas.addEventListener('click', (e) => {
  if (modo !== 'bote') return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);

  floodFill(x, y, color);
});

canvas.addEventListener('mousedown', comenzarDibujo);
canvas.addEventListener('mouseup', terminarDibujo);
canvas.addEventListener('mouseout', terminarDibujo);
canvas.addEventListener('mousemove', dibujar);

document.getElementById('borrar').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('modo-pincel').addEventListener('click', () => {
  modo = 'pincel';
  canvas.style.cursor = 'crosshair';
});
document.getElementById('modo-bote').addEventListener('click', () => {
  modo = 'bote';
  canvas.style.cursor = 'pointer';
});

const botonesColor = document.querySelectorAll('.color-btn');
botonesColor.forEach(btn => {
  btn.addEventListener('click', () => {
    color = btn.dataset.color;
    ctx.strokeStyle = color;

    botonesColor.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

botonesColor[0].classList.add('selected');

const btnPincel = document.getElementById('modo-pincel');
const btnBote = document.getElementById('modo-bote');

btnPincel.addEventListener('click', () => {
  modo = 'pincel';
  canvas.style.cursor = 'crosshair';
  btnPincel.classList.add('active');
  btnBote.classList.remove('active');
});

btnBote.addEventListener('click', () => {
  modo = 'bote';
  canvas.style.cursor = 'pointer';
  btnBote.classList.add('active');
  btnPincel.classList.remove('active');
});

btnPincel.classList.add('active');

const btnGuardar = document.getElementById('guardar');
const galeria = document.getElementById('galeria');

btnGuardar.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre) {
    alert('Por favor, escribe un nombre antes de guardar.');
    return;
  }
  
  const contenedor = document.createElement('div');
  contenedor.style.display = 'flex';
  contenedor.style.flexDirection = 'column';
  contenedor.style.alignItems = 'center';
  contenedor.style.marginBottom = '15px';

  const imagen = new Image();
  imagen.src = canvas.toDataURL('image/png');
  imagen.alt = `Dibujo de ${nombre}`;
  imagen.style.cursor = 'pointer';
  imagen.style.width = '200px';
  imagen.style.border = '2px solid #002b36';
  imagen.style.borderRadius = '10px';
  imagen.style.marginBottom = '5px';

  const etiquetaNombre = document.createElement('span');
  etiquetaNombre.textContent = nombre;
  etiquetaNombre.style.fontWeight = 'bold';
  etiquetaNombre.style.color = '#002b36';

  contenedor.appendChild(imagen);
  contenedor.appendChild(etiquetaNombre);

  galeria.appendChild(contenedor);
});

/* REFLEXIÓN */
document.getElementById('form-palabras').addEventListener('submit', function(event) {
  event.preventDefault();

  const palabra1 = this.palabra1.value.trim();
  const palabra2 = this.palabra2.value.trim();
  const palabra3 = this.palabra3.value.trim();

  if (palabra1 && palabra2 && palabra3) {
    document.getElementById('mensaje-confirmacion').style.display = 'block';
    this.reset();
  } else {
    alert("Por favor, escribe las tres palabras.");
  }
});
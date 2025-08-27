/* ACTIVIDAD 2 */
const respuestasCorrectas = ["centenaria", "manjares", "atractivo", "desplaza", "raíces", "rincón", "recetas", "proximidad", "propuestas", "presenta"];

document.getElementById('verificar-respuestas').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas[i].toLowerCase()) {
      input.style = "2px solid green";
      input.style.backgroundColor = "#d0f0d0";
    } else {
      input.style = "2px solid red";
      input.style.backgroundColor = "#e63946";
      input.style.color = "#ffffff";
    }
  });
});

/* ACTIVIDAD 3 */
const items = document.querySelectorAll('#lista-desordenada li');
  const dropzone = document.getElementById('lista-ordenada');

items.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  });

  item.addEventListener('dragend', e => {
    e.target.classList.remove('dragging');
  });
});

dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  dropzone.classList.add('drag-over');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('drop', e => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const item = document.querySelector(`[data-id='${id}']`);
  dropzone.appendChild(item);
  dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('dragover', e => {
  e.preventDefault();
});

dropzone.addEventListener('drop', e => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');

  const afterElement = getDragAfterElement(dropzone, e.clientY);
  if (afterElement == null) {
      dropzone.appendChild(dragging);
  } else {
      dropzone.insertBefore(dragging, afterElement);
  }
  dropzone.classList.remove('drag-over');
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
      } else {
          return closest;
      }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const ordenCorrecto = ["1","2","3","4","5","6","7"];
const respuestasImperativos = {
  1: ["pon", "déjalas", "conserva"],
  2: ["coloque", "hornee", "pele"],
  3: ["triturad"],
  4: ["agrega", "incorpora"],
  5: ["añadan", "mezclen"],
  6: ["vierta"],
  7: ["servid", "disfrutad"]
};

document.getElementById('comprobar').addEventListener('click', () => {
  const pasos = dropzone.querySelectorAll('li');

  pasos.forEach((li, index) => {
    const id = li.dataset.id;
    const inputs = li.querySelectorAll('input');

    if (id === ordenCorrecto[index]) {
      li.classList.add('correcto-orden');
      li.classList.remove('incorrecto-orden');
    } else {
      li.classList.add('incorrecto-orden');
      li.classList.remove('correcto-orden');
    }

    inputs.forEach((input, i) => {
      const valor = input.value.trim().toLowerCase();
      if (respuestasImperativos[id][i] === valor) {
        input.classList.add('correcto-verbo');
        input.classList.remove('incorrecto-verbo');
      } else {
        input.classList.add('incorrecto-verbo');
        input.classList.remove('correcto-verbo');
      }
    });
  });
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

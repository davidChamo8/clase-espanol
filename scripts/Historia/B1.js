/* ACTIVIDAD 1*/
document.querySelectorAll(
  '.contenido-actividad-1, .contenido-actividad-2, .contenido-actividad-3'
).forEach(bloque => {
  const input = bloque.querySelector('.input-palabra');
  const boton = bloque.querySelector('.boton-verificar');
  const lista = bloque.querySelectorAll('.elementos-lista li');

  const contador = document.createElement('p');
  contador.classList.add('contador');
  contador.textContent = `Has encontrado 0/${lista.length}`;
  bloque.appendChild(contador);

  let aciertos = 0;

  function verificar() {
    const valor = input.value.trim().toLowerCase();
    let encontrado = false;

    lista.forEach(li => {
      if (valor === li.dataset.palabra.toLowerCase()) {
        const span = li.querySelector('span');
        if (span.classList.contains('oculto')) {
          span.classList.remove('oculto');
          span.style.color = "green";
          span.style.fontWeight = "bold";
          aciertos++;
          contador.textContent = `Has encontrado ${aciertos}/${lista.length}`;
        }
        encontrado = true;
      }
    });

    if (!encontrado) {
      input.classList.add('error');
      setTimeout(() => input.classList.remove('error'), 800);
    } else {
      input.value = '';
    }
  }

  boton.addEventListener('click', verificar);
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') verificar();
  });
});

/* ACTIVIDAD 2 */
const imagen = document.querySelector('.imagen-interiores');
const modal = document.getElementById('modal-qr');
const closeBtn = document.querySelector('.close-modal');

imagen.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

/* ACTIVIDAD 4 */
const zonaPegar = document.getElementById("zonaPegar");

document.addEventListener("paste", (event) => {
  const items = event.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") !== -1) {
      const file = items[i].getAsFile();
      const reader = new FileReader();
      reader.onload = function(event) {
        zonaPegar.innerHTML = "";
        const img = document.createElement("img");
        img.src = event.target.result;
        zonaPegar.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }
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
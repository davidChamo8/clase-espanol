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

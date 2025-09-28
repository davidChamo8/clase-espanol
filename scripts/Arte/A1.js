/* ACTIVIDAD 1 */
const palabras = document.querySelectorAll('.palabra');
const zonas = document.querySelectorAll('.drop-zone');

let palabraArrastrada = null;

palabras.forEach(p => {
  p.addEventListener('dragstart', e => {
    palabraArrastrada = p;
    p.classList.add('dragging');
  });
  p.addEventListener('dragend', e => {
    palabraArrastrada = null;
    p.classList.remove('dragging');
  });
});

zonas.forEach(z => {
  z.addEventListener('dragover', e => {
    e.preventDefault();
    z.style.background = '#7a91c6';
  });
  z.addEventListener('dragleave', e => {
    z.style.background = '';
  });
  z.addEventListener('drop', e => {
    e.preventDefault();
    if (palabraArrastrada) {
      z.innerHTML = '';
      z.appendChild(palabraArrastrada);
      z.style.background = '';
    }
  });
});

/* ACTIVIDAD 2 */
const respuestasCorrectas = ["está", "construye", "abre", "presenta", "inaugúran", "amplía", "visitar", "ofrece", "permiten", "explorar", "descubrir", "participar"];

document.getElementById('check-btn').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas[i].toLowerCase()) {
      input.style.backgroundColor = "#d0f0d0";
      input.style.border = "none";
      input.style.color = "black";
    } else {
      input.style.backgroundColor = "#e63946";
      input.style.color = "#ffff";
      input.style.border = "none";
    }
  });
});

/* ACTIVIDAD 3 */
const bloques = document.querySelectorAll(".foton");
const btnPrev = document.querySelector(".carrusel-btn.prev");
const btnNext = document.querySelector(".carrusel-btn.next");
let indice = 0;

let canvas, ctx;
let dibujando = false;
let ultimoX = 0;
let ultimoY = 0;

let modo = 'draw'; 

function crearCanvas() {
  const fotonActivo = bloques[indice];
  

  const viejoCanvas = fotonActivo.querySelector("canvas");
  if (viejoCanvas) viejoCanvas.remove();


  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

  const img = fotonActivo.querySelector("img");
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;
  canvas.style.position = "absolute";
  canvas.style.top = img.offsetTop + "px";
  canvas.style.left = img.offsetLeft + "px";
  canvas.style.zIndex = 5;

  fotonActivo.appendChild(canvas);

  canvas.addEventListener("mousedown", (e) => {
    dibujando = true;
    const rect = canvas.getBoundingClientRect();
    ultimoX = e.clientX - rect.left;
    ultimoY = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", () => dibujando = false);
  canvas.addEventListener("mouseleave", () => dibujando = false);
  canvas.addEventListener("mousemove", dibujar);
}

function dibujar(e) {
  if (!dibujando) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = "yellow"; 
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(ultimoX, ultimoY);
  ctx.lineTo(x, y);
  ctx.stroke();

  ultimoX = x;
  ultimoY = y;
}

document.getElementById("erase-btn").addEventListener("click", () => {
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); 
});

function mostrarBloque(i) {
  bloques.forEach((b, idx) => b.classList.toggle("activo", idx === i));
  setTimeout(crearCanvas, 0); 
}

btnPrev.addEventListener("click", () => {
  indice = (indice - 1 + bloques.length) % bloques.length;
  mostrarBloque(indice);
});

btnNext.addEventListener("click", () => {
  indice = (indice + 1) % bloques.length;
  mostrarBloque(indice);
});

mostrarBloque(indice);

/* ACTIVIDAD 4 */
document.querySelectorAll('.personaje').forEach(img => {
    img.addEventListener('click', () => {
      img.classList.toggle('tachado');
    });
  });

  const toggleBtn = document.getElementById('toggle-vision');
  const inputNombre = document.getElementById('nombre-secreto');

  toggleBtn.addEventListener('click', () => {
    if (inputNombre.type === "password") {
      inputNombre.type = "text";
      toggleBtn.textContent = "Ocultar";
    } else {
      inputNombre.type = "password";
      toggleBtn.textContent = "Mostrar";
    }
});
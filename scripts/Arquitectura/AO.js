/* ACTIVIDAD 1 */
document.addEventListener("DOMContentLoaded", () => {
  const gridSize = 15;
  const words = [
    "BASILICA",
    "CAMPANARIO",
    "VIDRIERA",
    "COLUMNA",
    "ARCO",
    "FACHADA",
    "ALTAR",
    "NAVE",
    "ESCALERA"
  ];

  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

  const modal = document.getElementById("imagen-modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "none";
  modalImg.src = "";

  const span = document.querySelector(".cerrar");

  function placeWord(word) {
    const dir = Math.random() < 0.5 ? "H" : "V";
    const len = word.length;
    let row, col, fits;

    for (let attempt = 0; attempt < 100; attempt++) {
      if (dir === "H") {
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * (gridSize - len));
        fits = true;
        for (let i = 0; i < len; i++) {
          const current = grid[row][col + i];
          if (current && current !== word[i]) {
            fits = false;
            break;
          }
        }
        if (fits) {
          for (let i = 0; i < len; i++) grid[row][col + i] = word[i];
          return true;
        }
      } else {
        row = Math.floor(Math.random() * (gridSize - len));
        col = Math.floor(Math.random() * gridSize);
        fits = true;
        for (let i = 0; i < len; i++) {
          const current = grid[row + i][col];
          if (current && current !== word[i]) {
            fits = false;
            break;
          }
        }
        if (fits) {
          for (let i = 0; i < len; i++) grid[row + i][col] = word[i];
          return true;
        }
      }
    }
    return false;
  }

  words.forEach(word => placeWord(word.toUpperCase()));

  const letters = "ABCDEFGHIJKLMNOPQRSTUV";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!grid[i][j]) grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
    }
  }

  const table = document.getElementById("buscar-grid");
  for (let row = 0; row < gridSize; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < gridSize; col++) {
      const td = document.createElement("td");
      td.textContent = grid[row][col];
      td.dataset.row = row;
      td.dataset.col = col;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  let isMouseDown = false;
  let selectedCells = [];

  table.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "TD") {
      isMouseDown = true;
      clearSelection();
      selectCell(e.target);
    }
  });

  table.addEventListener("mouseover", (e) => {
    if (isMouseDown && e.target.tagName === "TD") {
      const lastCell = selectedCells[selectedCells.length - 1];
      if (isAdjacent(lastCell, e.target)) selectCell(e.target);
    }
  });

  table.addEventListener("mouseup", () => {
    isMouseDown = false;
    const selectedWord = selectedCells.map(td => td.textContent).join("");
    const reversed = selectedWord.split("").reverse().join("");
    const found = words.includes(selectedWord) || words.includes(reversed);

    if (found) {
      selectedCells.forEach(td => td.classList.add("highlight"));
      markWordInList(selectedWord);
      selectedCells = [];
    } else {
      selectedCells.forEach(td => td.classList.add("wrong"));
      setTimeout(() => {
        selectedCells.forEach(td => {
          td.classList.remove("wrong");
          td.classList.remove("selected");
        });
        selectedCells = [];
      }, 500);
    }
  });

  function selectCell(cell) {
    if (!selectedCells.includes(cell)) {
      cell.classList.add("selected");
      selectedCells.push(cell);
    }
  }

  function clearSelection() {
    selectedCells.forEach(td => td.classList.remove("selected"));
    selectedCells = [];
  }

  function isAdjacent(a, b) {
    const r1 = parseInt(a.dataset.row);
    const c1 = parseInt(a.dataset.col);
    const r2 = parseInt(b.dataset.row);
    const c2 = parseInt(b.dataset.col);
    const sameRow = r1 === r2;
    const sameCol = c1 === c2;
    const straightLine = sameRow || sameCol;

    if (!straightLine) return false;
    if (selectedCells.length === 1) return true;

    const first = selectedCells[0];
    const fr = parseInt(first.dataset.row);
    const fc = parseInt(first.dataset.col);
    return (r2 === fr && c2 !== fc) || (c2 === fc && r2 !== fr);
  }

  function markWordInList(word) {
    const normalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const reversed = normalized.split("").reverse().join("");
    const wordDivs = document.querySelectorAll(".palabros div");

    wordDivs.forEach(div => {
      const term = div.dataset.term.toLowerCase();
      if (normalized === term || reversed === term) {
        div.classList.add("found"); 
        div.style.textDecoration = "line-through";
        div.style.color = "grey";
      }
    });
  }

  document.querySelectorAll(".palabros div").forEach(div => {
    div.addEventListener("click", () => {
      if (div.classList.contains("found")) {
        const term = div.dataset.term;
        const imgPath = "../../../images/sopa " + term + ".png";
        modal.style.display = "block";
        modalImg.src = imgPath;
      }
    });
  });

  span.onclick = function () { modal.style.display = "none"; };
  window.onclick = function (event) { if (event.target === modal) modal.style.display = "none"; };
});

/* ACTIVIDAD 2 */
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

/* ACTIVIDAD 3 */
 let selectedImage = null;

  document.querySelectorAll('.match-container #images .item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#images .item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedImage = item;
    });
  });

  document.querySelectorAll('.match-container #descriptions .item').forEach(desc => {
    desc.addEventListener('click', () => {
      if (!selectedImage) return;

      const imageId = selectedImage.getAttribute('data-id');
      const descId = desc.getAttribute('data-id');

      if (imageId === descId) {
        selectedImage.classList.add('matched');
        desc.classList.add('matched');
      } else {
        desc.classList.add('wrong');
        setTimeout(() => {
          desc.classList.remove('wrong');
        }, 1000);
      }

      selectedImage.classList.remove('selected');
      selectedImage = null;
    });
  });

/* ACTIVIDAD 4 */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("info-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");
  const closeButton = modal.querySelector(".close-button"); 

  document.querySelectorAll(".info-icon").forEach(infoBtn => {
    infoBtn.addEventListener("click", () => {
      modalTitle.textContent = infoBtn.getAttribute("data-title") || "";
      modalDescription.textContent = infoBtn.getAttribute("data-description") || "";
      modalImage.src = infoBtn.getAttribute("data-image") || "";
      modalImage.alt = `Imagen relacionada con ${infoBtn.getAttribute("data-title")}`;
      modal.classList.remove("hidden");
    });
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

/* ACTIVIDAD 5 */
const correctOrder = ["vicens", "guell2", "calvet", "guell1", "batllo", "mila"];

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
    imagenHombre.src = "../../../images/antonini.png";
    imagenHombre.alt = "Hombre feliz";
  } else {
    imagenHombre.src = "../../../images/antonino.png";
    imagenHombre.alt = "Hombre enfadado";
  }
}

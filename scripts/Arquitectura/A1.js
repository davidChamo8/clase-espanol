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

  const grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill("")
  );

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
          for (let i = 0; i < len; i++) {
            grid[row][col + i] = word[i];
          }
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
          for (let i = 0; i < len; i++) {
            grid[row + i][col] = word[i];
          }
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
      if (!grid[i][j]) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  const table = document.getElementById("word-search-grid");
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
      if (isAdjacent(lastCell, e.target)) {
        selectCell(e.target);
      }
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
    const wordDivs = document.querySelectorAll(".word-bank div");

    wordDivs.forEach(div => {
      const term = div.dataset.term.toLowerCase();
      if (normalized === term || reversed === term) {
        div.style.textDecoration = "line-through";
        div.style.color = "black";
      }
    });
  }
});

/* ACTIVIDAD 2 */
document.addEventListener("DOMContentLoaded", () => {
  const activatorImage = document.getElementById("imagen-activadora");
  const modal = document.getElementById("foto-modal");
  const modalImg = document.getElementById("modal-detalle");
  const closeButton = document.querySelector("#foto-modal .close-button");

  if (activatorImage) {
    activatorImage.addEventListener("click", () => {
      modalImg.src = "../../../images/abside_detalle_2.png";
      modal.classList.remove("hidden");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  const modal2 = document.getElementById("foto-modal");
  const imagenAmpliada = document.getElementById("modal-detalle");
  const cerrar2 = document.querySelector("#foto-modal .close-button");

  let scale = 1;
  let isDragging = false;
  let startX, startY;
  let translateX = 0, translateY = 0;

  const updateTransform = () => {
    imagenAmpliada.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  };

  document.getElementById("imagen-activadora").style.cursor = "zoom-in";

  document.getElementById("imagen-activadora").addEventListener("click", () => {
    modal2.classList.remove("hidden");
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  });

  cerrar2.addEventListener("click", () => {
    modal2.classList.add("hidden");
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  });

  modal2.addEventListener("click", (e) => {
    if (e.target === modal2) {
      modal2.classList.add("hidden");
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    }
  });

  imagenAmpliada.addEventListener("wheel", function (e) {
    e.preventDefault();
    const zoomSpeed = 0.1;

    if (e.deltaY < 0) {
      scale += zoomSpeed;
    } else if (e.deltaY > 0 && scale > zoomSpeed) {
      scale -= zoomSpeed;
    }

    updateTransform();
  });

  imagenAmpliada.addEventListener("mousedown", (e) => {
    if (scale <= 1) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    imagenAmpliada.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    imagenAmpliada.style.cursor = "grab";
  });
});

const respuestasCorrectas = ["hay", "está", "tiene", "está", "está", "tiene", "está", "hay", "tiene", "está", "hay"];

document.getElementById('check-btn').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas[i].toLowerCase()) {
      input.style.borderBottom = "2px solid green";
      input.style.backgroundColor = "#d0f0d0";
    } else {
      input.style.borderBottom = "2px solid red";
      input.style.backgroundColor = "#e63946";
    }
  });
});

/* ACTIVIDAD 3 */
const button = document.createElement("button");
button.id = "goToLinkButton";
button.innerText = "Visita virtual";
button.onclick = function () {
  window.open("https://sagradafamilia.org/es/visita-virtual", "_blank");
};

document.addEventListener("DOMContentLoaded", () => {
  const contentBlock = document.querySelector(".activity3-content");
  contentBlock.appendChild(button);
});

const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const closeButton = document.querySelector('.close-button');

document.querySelectorAll('.info-icon').forEach(button => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.getAttribute('data-title');
    modalDescription.textContent = button.getAttribute('data-description');
    modalImage.src = button.getAttribute('data-image');
    modalImage.alt = `Imagen relacionada con ${button.getAttribute('data-title')}`;
    modal.classList.remove('hidden');
  });
});

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

/* ACTIVIDAD 4 */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  let currentIndex = 0;

  const updateSlidePosition = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlidePosition();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlidePosition();
    }
  });

  window.addEventListener("resize", updateSlidePosition);
  updateSlidePosition(); 

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close-modal");

  slides.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

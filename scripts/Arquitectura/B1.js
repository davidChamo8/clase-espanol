/* ACTIVIDAD 1 */
document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".dropzone");
  const wordBank = document.querySelector(".banco-palabras-1");

  const termData = {
    columna: {
      image: "../../../images/columna.png",
      text: "En la fachada de la Pasión hay columnas de doble giro: columnas de base poligonal que giran a derecha e izquierda hasta transformarse en un círculo ascendentemente.",
    },
    pinaculo: {
      image: "../../../images/pinaculos.png",
      text: "Todas las torres, rematadas por unos pináculos recubiertos de diferentes materiales, se afilan hacia la parte superior para acentuar la sensación de elevación hacia Dios.",
    },
    arco: {
      image: "../../../images/arco.png",
      text: "El arco parabólico, similar al centenario.",
    },
    escultura: {
      image: "../../../images/esculturas.png",
      text: "La pasión de Cristo se presenta en la fachada en un recorrido cronológico por medio de diferentes grupos escultóricos.",
    },
    relieve: {
      image: "../../../images/relieve.png",
      text: "Detalle de las puertas del portal de la Caridad en la fachada del Nacimiento.",
    }
  };

  const termTitles = {
    columna: "Columna",
    pinaculo: "Pináculo",
    arco: "Arco",
    escultura: "Escultura",
    relieve: "Relieve"
  };

  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", draggable.dataset.term);
    });
  });

  dropZones.forEach(zone => {
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

      if (zone.hasChildNodes()) return;

      const droppedTerm = e.dataTransfer.getData("text/plain");
      const draggedElement = document.querySelector(`.draggable[data-term="${droppedTerm}"]`);

      if (draggedElement) {
        const clone = draggedElement.cloneNode(true);
        clone.setAttribute("draggable", false);
        clone.classList.add("dropped");
        clone.dataset.term = draggedElement.dataset.term;
        zone.appendChild(clone);
        draggedElement.remove();

        if (wordBank.children.length === 0) {
          wordBank.style.display = "none";
        }
      }
    });
  });

  const checkButton = document.getElementById("check-answers");
  if (checkButton) {
    checkButton.addEventListener("click", () => {
      dropZones.forEach(zone => {
        const expected = zone.dataset.answer;
        const dropped = zone.querySelector(".dropped");
        const parent = zone.parentElement;

        const esCorrecta = dropped && normalizarTexto(dropped.dataset.term) === normalizarTexto(expected);

        zone.style.border = esCorrecta ? "2px solid green" : "2px solid red";
        zone.style.backgroundColor = esCorrecta ? "#d0f0d0" : "#e63946";

        if (!parent.querySelector(".info-button")) {
          const infoBtn = document.createElement("button");
          infoBtn.textContent = "🛈";
          infoBtn.classList.add("info-button");
          infoBtn.setAttribute("data-term", expected.toLowerCase());
          parent.appendChild(infoBtn);
        }
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("info-button")) {
      const term = e.target.dataset.term;
      const info = termData[term];
      if (info) {
        document.getElementById("titulo-modal").textContent = termTitles[term] || term;
        document.getElementById("imagen-modal").src = info.image;
        document.getElementById("descripcion-modal").textContent = info.text;
        document.getElementById("info-modal").classList.remove("hidden");
      }
    }
  });

  const closeButton = document.querySelector("#info-modal .close-button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.getElementById("info-modal").classList.add("hidden");
    });
  }
});

/* ACTIVIDAD 2 */
const bloques = document.querySelectorAll(".bloque-imagen-glosario");
const btnPrev = document.querySelector(".carrusel-btn.prev");
const btnNext = document.querySelector(".carrusel-btn.next");
let indice = 0;

function mostrarBloque(i) {
  bloques.forEach((b, idx) => {
    b.classList.toggle("activo", idx === i);
  });
}

btnPrev.addEventListener("click", () => {
  indice = (indice - 1 + bloques.length) % bloques.length;
  mostrarBloque(indice);
});

btnNext.addEventListener("click", () => {
  indice = (indice + 1) % bloques.length;
  mostrarBloque(indice);
});

/* ACTIVIDAD 4 */
document.addEventListener("DOMContentLoaded", () => {
  const activatorImage = document.getElementById("imagen-activadora");
  const modal = document.getElementById("foto-modal");
  const modalImg = document.getElementById("detalle-modal");
  const closeButton = document.querySelector("#foto-modal .close-button");

  if (activatorImage) {
    activatorImage.addEventListener("click", () => {
      modalImg.src = "../../../images/abside_detalle.png";
      modal.classList.remove("hidden");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  const modal2 = document.getElementById("foto-modal");
  const imagenAmpliada = document.getElementById("detalle-modal");
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

const respuestasCorrectas = ["iglesia", "ábside", "cabecera", "cripta", "capillas", "escaleras"];

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

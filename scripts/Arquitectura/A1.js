/* ACTIVIDAD 1 */
const carouselData = [
  {
    image: '../../../images/puertas.png',
    options: ['puertas', 'ventanales', 'escaleras'],
    correct: 'puertas',
    text: 'En la imagen podemos ver las __ de la Caridad. En ellas hay flores, plantas y diferentes insectos.'
  },
  {
    image: '../../../images/fachada.png',
    options: ['decorado', 'fachada', 'casa'],
    correct: 'fachada',
    text: 'La __ de la Pasión cuenta la historia de la muerte y resurrección de Jesús.'
  },
  {
    image: '../../../images/ventanal.png',
    options: ['rosetones', 'ventanales', 'cristales'],
    correct: 'ventanales',
    text: 'Los __ de la basílica son muy grandes y gracias a su vidriera la luz pasa con muchos colores.'
  },
  {
    image: '../../../images/torres.png',
    options: ['torre', 'edificio', 'piso'],
    correct: 'torre',
    text: 'La __ es una estructura muy alta con muchos detalles al final.'
  },
  {
    image: '../../../images/columna.png',
    options: ['palo', 'pilar', 'columna'],
    correct: 'columna',
    text: 'La __ es un elemento vertical que soporta estructuras.'
  },
  {
    image: '../../../images/arco1.png',
    options: ['arco', 'puente', 'marco'],
    correct: 'arco',
    text: 'El __ es una estructura curva que soporta peso y permite el acceso.'
  },
  {
    image: '../../../images/planta.png',
    options: ['piso', 'planta', 'suelo'],
    correct: 'planta',
    text: 'La __ son líneas que marcan las divisiones interiores del edificio, sus límites y su diseño.'
  },
  {
    image: '../../../images/escultura0.png',
    options: ['piedras', 'moldes', 'esculturas'],
    correct: 'esculturas',
    text: 'Estas __ representan la escena de la captura de Jesús.'
  },
];

let currentIndex = 0;
const imageElement = document.getElementById('carousel-image');
const optionsContainer = document.getElementById('options-container');
const textContainer = document.getElementById('text-container');

function loadSlide(index) {
  const data = carouselData[index];
  imageElement.src = data.image;
  imageElement.alt = `Imagen relacionada con ${data.correct}`;
  optionsContainer.innerHTML = '';
  textContainer.innerText = data.text;

  data.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-button';
    btn.innerText = option;

    btn.onclick = () => {
      document.querySelectorAll('.option-button').forEach(b => b.disabled = true);

      if (option === data.correct) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('incorrect');
      }

      textContainer.innerHTML = data.text.replace('__', `<span class="highlight">${data.correct}</span>`);

      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-button';
      nextBtn.innerText = 'Siguiente';
      nextBtn.onclick = () => {
        currentIndex++;
        if (currentIndex < carouselData.length) {
          loadSlide(currentIndex);
        } else {
          optionsContainer.innerHTML = '<p><strong>¡Actividad completada!</strong></p>';
          textContainer.innerHTML = '';
        }
      };
      textContainer.appendChild(nextBtn); 
    };

    optionsContainer.appendChild(btn);
  });
}

loadSlide(currentIndex);

/* ACTIVIDAD 2 */
const respuestasCorrectas1 = ["escultura", "planta", "torres", "arcos", "fachada", "puerta", "ventanal", "columna"];

document.getElementById('check-btn-1').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap-1');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas1[i].toLowerCase()) {
      input.style.backgroundColor = "#d0f0d0";
      input.style.border = "2px solid transparent";
      input.style.color = "black";
    } else {
      input.style.backgroundColor = "#e63946";
      input.style.color = "#ffff";
      input.style.border = "2px solid transparent";
    }
  });
});

/* ACTIVIDAD 3 */
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

const respuestasCorrectas2 = ["hay", "está", "tiene", "está", "está", "tiene", "está", "hay", "tiene", "está", "hay"];

document.getElementById('check-btn-2').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap-2');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas2[i].toLowerCase()) {
      input.style.backgroundColor = "#d0f0d0";
      input.style.border = "2px solid transparent";
      input.style.color = "black";
    } else {
      input.style.backgroundColor = "#e63946";
      input.style.color = "#ffff";
      input.style.border = "2px solid transparent";
    }
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

  const modal = document.getElementById("image-modal-5");
  const modalImg = document.getElementById("modal-img-5");
  const closeModal = document.querySelector(".close-modal-5");

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

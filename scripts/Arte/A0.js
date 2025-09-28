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
const respuestasCorrectas1 = ["Cúpula Central", "Torres Laterales", "Fachada", "Jardines", "Columnas"];

document.getElementById('check-btn').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas1[i].toLowerCase()) {
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
const respuestasCorrectas2 = ["está", "construye", "abre", "presenta", "inaugúran", "visitar", "ofrece", "explorar", "descubrir", "participar"];

document.getElementById('check-btn').addEventListener('click', () => {
  const gaps = document.querySelectorAll('.gap');
  gaps.forEach((input, i) => {
    const userAnswer = input.value.trim().toLowerCase();
    if(userAnswer === respuestasCorrectas2[i].toLowerCase()) {
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

/* ACTIVIDAD 5 */
const carouselData = [
  {
    image: '../../../images/ciervo y jabali.png',
    options: ['Ciervo y Jabalí', 'Ciervo y Cerdo', 'Caballo y Jabalí'],
    correct: 'Ciervo y Jabalí',
  },
  {
    image: '../../../images/camello.jpg',
    options: ['Caballo', 'Cebra', 'Camello'],
    correct: 'Camello',
  },
  {
    image: '../../../images/mula y buey.jpg',
    options: ['Toro y Burro', 'Mula y Buey', 'Cabra y Burro'],
    correct: 'Mula y Buey',
  },
  {
    image: '../../../images/lobo.jpg',
    options: ['Lobo', 'Perro', 'Tigre'],
    correct: 'Lobo',
  },
  {
    image: '../../../images/leon.jpg',
    options: ['Rata', 'Pantera', 'León'],
    correct: 'León',
  },
  {
    image: '../../../images/cordero.png',
    options: ['Lobo', 'Cordero', 'Perro'],
    correct: 'Cordero',
  },
];

let currentIndex = 0;
const imageElement = document.getElementById('carousel-image');
const optionsContainer = document.getElementById('options-container');

function loadSlide(index) {
  const data = carouselData[index];
  imageElement.src = data.image;
  imageElement.alt = `Imagen relacionada con ${data.correct}`;
  optionsContainer.innerHTML = '';

  data.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-button';
    btn.innerText = option;

    btn.onclick = () => {
      if (option === data.correct) {
        btn.classList.add('correct');

        document.querySelectorAll('.option-button').forEach(b => b.disabled = true);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-button';
        nextBtn.innerText = 'Siguiente';
        nextBtn.onclick = () => {
          currentIndex++;
          if (currentIndex < carouselData.length) {
            loadSlide(currentIndex);
          } else {
            optionsContainer.innerHTML = '<p><strong>¡Actividad completada!</strong></p>';
            imageElement.src = '';
            imageElement.alt = ''; 
          }
        };

        optionsContainer.appendChild(nextBtn);
      } 
      else {
        btn.classList.add('incorrect');
        btn.disabled = true; 
      }
    };

    optionsContainer.appendChild(btn);
  });
}

loadSlide(currentIndex);

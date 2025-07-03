/* ACTIVIDAD 1 */
const carouselData = [
  {
    image: '../../../images/puertas.png',
    options: ['Puertas', 'Ventanales', 'Escaleras'],
    correct: 'Puertas',
    text: 'En la imagen podemos ver las __ de la Caridad. En ellas hay flores, plantas y diferentes insectos.'
  },
  {
    image: '../../../images/fachada.png',
    options: ['Decorado', 'Fachada', 'Casa'],
    correct: 'Fachada',
    text: 'La __ de la Pasión cuenta la historia de la muerte y resurección de Jesús.'
  },
  {
    image: '../../../images/ventanal.png',
    options: ['Rosetón', 'Ventanal', 'Cristal'],
    correct: 'Ventanal',
    text: 'Los __ de la basílica son muy grandes y gracias a su vidriera la luz pasa con muchos colores.'
  },
  {
    image: '../../../images/torres.png',
    options: ['Torre', 'Edificio', 'Piso'],
    correct: 'Torre',
    text: 'La __ es una estructura muy alta con muchos detalles al final.'
  },
  {
    image: '../../../images/columna.png',
    options: ['Palo', 'Pilar', 'Columna'],
    correct: 'Columna',
    text: '__ es un soporte vertical que soporta estructuras.'
  },
  {
    image: '../../../images/arco1.png',
    options: ['Arco', 'Puente', 'Marco'],
    correct: 'Arco',
    text: 'El __ es una estructura curva que soporta peso y permite el acceso.'
  },
  {
    image: '../../../images/planta.png',
    options: ['Piso', 'Planta', 'Suelo'],
    correct: 'Planta',
    text: '__ son líneas que marcan las divisiones interiores del edificio, sus límites y su diseño.'
  },
  {
    image: '../../../images/escultura0.png',
    options: ['Piedra', 'Molde', 'Escultura'],
    correct: 'Escultura',
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
      if (option === data.correct) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('incorrect');
      }
      document.querySelectorAll('.option-button').forEach(b => b.disabled = true);

      setTimeout(() => {
        currentIndex++;
        if (currentIndex < carouselData.length) {
          loadSlide(currentIndex);
        } else {
          optionsContainer.innerHTML = '<p><strong>Actividad completada 🎉</strong></p>';
          textContainer.innerHTML = '';
        }
      }, 2000);
    };
    optionsContainer.appendChild(btn);
  });
}

loadSlide(currentIndex);

/* ACTIVIDAD 2 */
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
const photos = document.querySelectorAll('.photo');
const dropZones = document.querySelectorAll('.drop-zone');

// Habilitar el arrastre de las fotos
photos.forEach(photo => {
  photo.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    photo.classList.add('dragging');
  });

  photo.addEventListener('dragend', () => {
    photo.classList.remove('dragging');
  });
});

// Habilitar la lógica de las zonas de soltado
dropZones.forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    // No se cambia color aquí, para no interferir con correct/incorrect
  });

  zone.addEventListener('dragleave', () => {
    // No se cambia color aquí, para no interferir con correct/incorrect
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const photoId = e.dataTransfer.getData('text/plain');
    const photo = document.getElementById(photoId);

    const correctPosition = photo.getAttribute('data-correct');
    const currentPosition = zone.getAttribute('data-position');

    // Eliminar imagen anterior si existe
    const existingImg = zone.querySelector('img');
    if (existingImg) {
      existingImg.remove();
    }

    // Colocar la nueva imagen
    zone.appendChild(photo);

    // Limpiar clases previas
    zone.classList.remove('correct', 'incorrect');

    // Comprobar si es la posición correcta
    if (correctPosition === currentPosition) {
      zone.classList.add('correct');
    } else {
      zone.classList.add('incorrect');
    }
  });
});

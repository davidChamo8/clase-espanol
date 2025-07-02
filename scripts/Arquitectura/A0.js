/* ACTIVIDAD 1 */
const carouselData = [
  {
    image: '../../../images/puertas.png',
    options: ['Puertas', 'Ventanales', 'Escaleras'],
    correct: 'Puertas',
    text: 'En la imagen podemos ver las X de la Caridad. En ellas hay flores, plantas y diferentes insectos.'
  },
  {
    image: '../../../images/fachada.png',
    options: ['Decorado', 'Fachada', 'Casa'],
    correct: 'Fachada',
    text: 'La X de la Pasión cuenta la historia de la muerte y resurección de Jesús.'
  },
  {
    image: '../../../images/ventanal.png',
    options: ['Rosetón', 'Ventanal', 'Cristal'],
    correct: 'Ventanal',
    text: 'Los X de la basílica son muy grandes y gracias a su vidriera la luz pasa con muchos colores.'
  },
  {
    image: '../../../images/torres.png',
    options: ['Torre', 'Edificio', 'Piso'],
    correct: 'Torre',
    text: 'La X es una estructura muy alta con muchos detalles al final.'
  },
  {
    image: '../../../images/columna.png',
    options: ['Palo', 'Pilar', 'Columna'],
    correct: 'Columna',
    text: 'X es un soporte vertical que soporta estructuras.'
  },
  {
    image: '../../../images/arco1.png',
    options: ['Arco', 'Puente', 'Marco'],
    correct: 'Arco',
    text: 'El X es una estructura curva que soporta peso y permite el acceso.'
  },
  {
    image: '../../../images/planta.png',
    options: ['Piso', 'Planta', 'Suelo'],
    correct: 'Planta',
    text: 'X son líneas que marcan las divisiones interiores del edificio, sus límites y su diseño.'
  },
  {
    image: '../../../images/escultura0.png',
    options: ['Piedra', 'Molde', 'Escultura'],
    correct: 'Escultura',
    text: 'Estas X representan la escena de la captura de Jesús.'
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

photos.forEach(photo => {
  photo.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    photo.classList.add('dragging');
  });

  photo.addEventListener('dragend', () => {
    photo.classList.remove('dragging');
  });
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.style.backgroundColor = '#d3f4ff';
  });

  zone.addEventListener('dragleave', () => {
    zone.style.backgroundColor = '#f0f0f0';
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const photoId = e.dataTransfer.getData('text/plain');
    const photo = document.getElementById(photoId);

    if (zone.firstChild && zone.firstChild !== zone.lastChild) {
      // Already has a photo
      return;
    }

    zone.innerHTML = ''; // Remove number
    zone.appendChild(photo);
    zone.style.backgroundColor = '#f0f0f0';
  });
});
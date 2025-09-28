/* ACTIVIDAD 2 */
document.getElementById('form-palabras').addEventListener('submit', function(event) {
  event.preventDefault();

  const palabra1 = this.palabra1.value.trim();
  const palabra2 = this.palabra2.value.trim();
  const palabra3 = this.palabra3.value.trim();

  if (palabra1 && palabra2 && palabra3) {
    document.getElementById('mensaje-confirmacion').style.display = 'block';
    this.reset();
  } else {
    alert("Por favor, escribe tus sentimientos.");
  }
});

/* ACTIVIDAD 3 */
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
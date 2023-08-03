// Arreglo para almacenar los personajes
let characters = [];

// Obtiene el elemento de la lista de personajes
const album = document.getElementById('album');

// Función para agregar un nuevo personaje al álbum
function addCharacter() {
  // Obtener los valores del formulario
  const code = document.getElementById('code').value;
  const name = document.getElementById('name').value;
  const faction = document.getElementById('faction').value;
  const type = document.getElementById('type').value;
  const hp = document.getElementById('hp').value;
  const attack = document.getElementById('attack').value;
  const defense = document.getElementById('defense').value;
  const image = document.getElementById('image').files[0];

  // Crear un objeto para el personaje
  const character = {
    code,
    name,
    faction,
    type,
    hp,
    attack,
    defense,
    image: URL.createObjectURL(image),
  };

  // Agregar el personaje al arreglo
  characters.push(character);

  // Actualizar la visualización del álbum
  updateAlbum();

  // Limpiar los campos del formulario después de agregar el personaje
  document.getElementById('characterForm').reset();
}

// Función para borrar todos los personajes del álbum
function clearAlbum() {
  characters = [];
  updateAlbum();
}

// Función para actualizar la visualización del álbum
function updateAlbum() {
  // Limpiar el contenido actual del álbum
  album.innerHTML = '';

  // Recorrer el arreglo de personajes y crear las tarjetas correspondientes
  characters.forEach(character => {
    const characterCard = createCharacterCard(character);
    album.appendChild(characterCard);
  });
}

// Función para crear la tarjeta de un personaje
function createCharacterCard(character) {
  // Crear una tarjeta para el personaje
  const characterCard = document.createElement('div');
  characterCard.classList.add('character-card');

  // Crear y mostrar la imagen del personaje
  const characterImg = document.createElement('img');
  characterImg.src = character.image;
  characterCard.appendChild(characterImg);

  // Crear y mostrar los detalles del personaje
  const characterDetails = document.createElement('div');
  characterDetails.innerHTML = `
    <p><strong>Code:</strong> ${character.code}</p>
    <p><strong>Name:</strong> ${character.name}</p>
    <p><strong>Faction:</strong> ${character.faction}</p>
    <p><strong>Type:</strong> ${character.type}</p>
    <p><strong>HP:</strong> ${character.hp}</p>
    <p><strong>Attack:</strong> ${character.attack}</p>
    <p><strong>Defense:</strong> ${character.defense}</p>
  `;
  characterCard.appendChild(characterDetails);

  return characterCard;
}

// Al cargar la página, actualizar la visualización del álbum con los personajes guardados previamente (si los hay)
window.onload = function () {
  const storedCharacters = JSON.parse(localStorage.getItem('barcodeBattleCharacters'));
  if (storedCharacters) {
    characters = storedCharacters;
  }
  updateAlbum();
};

// Al cerrar la página, guardar los personajes en el almacenamiento local
window.onbeforeunload = function () {
  localStorage.setItem('barcodeBattleCharacters', JSON.stringify(characters));
};
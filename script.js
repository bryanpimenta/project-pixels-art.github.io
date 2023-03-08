const palette = document.querySelector('#color-palette').children;
const pixelsColect = document.querySelector('#pixel-board');
let nodePixels = document.querySelectorAll('#pixel-board .pixel');

function firstColorPalette() {
  palette[0].style.backgroundColor = 'black';
  palette[0].classList.add('selected');
}

// ------------------------------Isso tudo cria pixels-------------------------------
function generatePixel(n) {
  for (let i = 0; i < n; i += 1) {
    const parentDiv = document.createElement('div');
    parentDiv.className = 'teste';
    pixelsColect.appendChild(parentDiv);
    for (let j = 0; j < n; j += 1) {
      const childDiv = document.createElement('div');
      childDiv.className = 'pixel';
      parentDiv.appendChild(childDiv);
    }
  }
  localStorage.setItem('boardSize', pixelsColect.childElementCount);
  nodePixels = document.querySelectorAll('#pixel-board .pixel');
}
// ------------------------------Isso tudo cria pixels-------------------------------

// Função para salvar a quantidade de pixel no LocalStorage
function loadPixels() {
  if (localStorage.getItem('boardSize') !== null) {
    generatePixel(localStorage.getItem('boardSize'));
  } else {
    generatePixel(5);
  }
}

// Valores do LocalStorage convetidos para Objeto
const convert = JSON.parse(localStorage.getItem('colorPalette'));
// Valores do LocalStorage convetidos para Objeto
const convert2 = JSON.parse(localStorage.getItem('pixelBoard'));

let r;
let g;
let b;

// Cores salvas em objeto
const saveColorsObjt = {};

// Cores em objeto
const colorObj = {
  2: '',
  3: '',
  4: '',
};

// Função add valores no objeto
function colorsAdd() {
  for (let l = 1; l <= 3; l += 1) {
    colorObj[l + 1] = palette[l].style.backgroundColor;
  }
}

// Valores das cores atuais armazenadas no LocalStorage
const newColorsUpDate = () => {
  colorsAdd();
  localStorage.setItem('pixelBoard', JSON.stringify(saveColorsObjt));
  localStorage.setItem('colorPalette', JSON.stringify(colorObj));
};

// Função seleção da cor
function selected(event) {
  for (let index = 0; index <= 3; index += 1) {
    palette[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

// Adicionando evento nos botões
for (let s = 0; s <= 4; s += 1) {
  document.getElementsByTagName('button')[s].addEventListener('click', selected);
}

// Função Load
const load = () => {
  palette[1].style.backgroundColor = `${convert['2']}`;
  palette[2].style.backgroundColor = `${convert['3']}`;
  palette[3].style.backgroundColor = `${convert['4']}`;
  for (let list = 0; list < nodePixels.length; list += 1) {
    nodePixels[list].style.backgroundColor = convert2[list];
  }
  colorsAdd();
};

// Gera números aleatórios entre 0 e 255
const randomColors = () => {
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
};

// Gera novas cores apartir do click no botton
function colors() {
  for (let n = 1; n <= 3; n += 1) {
    randomColors();
    palette[n].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
  newColorsUpDate();
}

// Salvar as cores dos pixels no localStorage
const saveColors = () => {
  for (let list = 0; list < nodePixels.length; list += 1) {
    const lol = nodePixels[list].style.backgroundColor;
    saveColorsObjt[list] = lol;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(saveColorsObjt));
};

// Função preencher cores
function putColor(event) {
  const evento = event;
  const domSelect = document.querySelector('.selected');
  evento.target.style.backgroundColor = `${domSelect.style.backgroundColor}`;
  saveColors();
}

function listening() {
  for (let m = 0; m < nodePixels.length; m += 1) {
    nodePixels[m].addEventListener('click', putColor);
  }
}

// Função de limpar pixels
const clear = () => {
  for (let k = 0; k < nodePixels.length; k += 1) {
    nodePixels[k].style.backgroundColor = 'white';
  }
  listening();
  saveColors();
};

// Evento click do botão
document.querySelector('#button-random-color').addEventListener('click', colors);
// Evento de limpar pixels
document.querySelector('#clear-board').addEventListener('click', clear);

// Função de dar load nas cores ou gerar novas cores
function open() {
  const localStorageSize = localStorage.length;
  if (localStorageSize >= 3) {
    load();
  } else {
    colors();
  }
}

// Função redirecionamento de tamanho
function sizeRedirection() {
  const boardSizeInput = document.querySelector('#board-size');
  if (boardSizeInput.value > 0) {
    if (boardSizeInput.value <= 5) {
      boardSizeInput.value = 5;
    } else if (boardSizeInput.value > 50) {
      boardSizeInput.value = 50;
    }
  } else {
    window.alert('Board inválido!');
  }
}

// função apagar todos as divs
function removePixels() {
  sizeRedirection();
  for (let i = 0; pixelsColect.childElementCount > 0; i += 1) {
    pixelsColect.removeChild(document.getElementById('pixel-board').children[0]);
  }
  if (pixelsColect.childElementCount === 0) {
    generatePixel(document.querySelector('#board-size').value);
    listening();
    clear();
  }
}

// Função do botão VQV >>> Gerar pixels
document.querySelector('#generate-board').addEventListener('click', removePixels);

// Load do localStorage
window.onload = () => {
  loadPixels();
  open();
  firstColorPalette();
  listening();
};

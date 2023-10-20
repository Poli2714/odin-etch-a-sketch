'use strict';

const gridContainer = document.querySelector('.grid-container');
const selectSizeBtn = document.querySelector('.select-size-btn');
const colorBtn = document.querySelector('.color-btn');
const resetBtn = document.querySelector('.reset-btn');
const eraseBtn = document.querySelector('.erase-btn');

const active = 'active-btn';

let colorMode = true;
let eraseMode = false;
let hoverEffect = false;

const createGrid = function (size, parentEl) {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.style.cssText = `height: ${size}px; width: ${size}px`;
  parentEl.appendChild(grid);
};

const renderGrids = function (n, createGrid) {
  const number = n * n;
  for (let i = 0; i < number; i++) {
    const size = 700 / n;
    createGrid(size, gridContainer);
  }
};

const generateRGBNumbers = function () {
  let RGBNumbers = [];
  for (let i = 0; i < 3; i++) {
    RGBNumbers.push(Math.trunc(Math.random() * (256 + 1)));
  }
  return RGBNumbers;
};

const makeMeColorful = function (target, generateRGBNumbers) {
  target.style.backgroundColor = `rgb(${generateRGBNumbers()})`;
};

const toggleClass = function (className, ...elements) {
  elements.forEach(element => element.classList.toggle(className));
};

renderGrids(16, createGrid);
colorBtn.classList.add(active);

selectSizeBtn.addEventListener('click', function () {
  hoverEffect = false;
  const numberOfGrids = prompt('Please enter between 1 and 100');
  if (isNaN(numberOfGrids)) {
    alert('You should enter a positive integer between 1 and 100');
    return;
  }
  gridContainer.innerHTML = '';
  renderGrids(+numberOfGrids, createGrid);

  if (colorMode) return;
  colorMode = true;
  eraseMode = false;
  toggleClass(active, colorBtn, eraseBtn);
});

colorBtn.addEventListener('click', function () {
  hoverEffect = false;
  if (colorMode) return;
  colorMode = true;
  eraseMode = false;
  toggleClass(active, this, eraseBtn);
});

resetBtn.addEventListener('click', function () {
  const grids = document.querySelectorAll('.grid');
  grids.forEach(grid => (grid.style.backgroundColor = 'inherit'));
  hoverEffect = false;

  if (colorMode) return;
  colorMode = true;
  eraseMode = false;
  toggleClass(active, colorBtn, eraseBtn);
});

eraseBtn.addEventListener('click', function () {
  hoverEffect = false;

  if (eraseMode) return;
  eraseMode = true;
  colorMode = false;
  toggleClass(active, this, colorBtn);
});

gridContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('grid')) return;

  if ((colorMode && hoverEffect) || (eraseMode && hoverEffect))
    hoverEffect = false;
  else if (colorMode && !hoverEffect) {
    makeMeColorful(target, generateRGBNumbers);
    hoverEffect = true;
  } else {
    target.style.backgroundColor = 'inherit';
    hoverEffect = true;
  }
});

gridContainer.addEventListener('mouseover', function (e) {
  if (!hoverEffect) return;

  const target = e.target;
  if (!target.classList.contains('grid')) return;

  if (colorMode) {
    makeMeColorful(target, generateRGBNumbers);
  } else target.style.backgroundColor = 'inherit';
});

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

const generateThreeNumbers = function () {
  let RGBNumbers = [];
  for (let i = 0; i < 3; i++) {
    RGBNumbers.push(Math.trunc(Math.random() * (256 + 1)));
  }
  return RGBNumbers;
};

const setRGBAColor = function (target, generateThreeNumbers) {
  target.style.backgroundColor = `rgba(${generateThreeNumbers()}, 10%)`;
};

const toggleClass = function (className, ...elements) {
  elements.forEach(element => element.classList.toggle(className));
};

const eraseColor = function (element) {
  element.style.backgroundColor = 'inherit';
  element.classList.remove('colorful');
};

const increaseOpacity = function (element) {
  const currentBgColor = element.style.backgroundColor;
  const lastCommaIndex = +currentBgColor.lastIndexOf(',');
  const opacity = +currentBgColor.slice(lastCommaIndex + 2, -1) + 0.1;
  if (opacity === 1) return;

  const newColor = currentBgColor.slice(0, lastCommaIndex + 2) + `${opacity})`;
  element.style.backgroundColor = newColor;
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
  grids.forEach(grid => {
    grid.style.backgroundColor = 'inherit';
    grid.classList.remove('colorful');
  });
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

  if ((colorMode && hoverEffect) || (eraseMode && hoverEffect)) {
    hoverEffect = false;
  } else if (
    colorMode &&
    !hoverEffect &&
    !target.classList.contains('colorful')
  ) {
    setRGBAColor(target, generateThreeNumbers);
    target.classList.add('colorful');
    hoverEffect = true;
  } else if (eraseMode && !hoverEffect) {
    eraseColor(target);
    hoverEffect = true;
  } else hoverEffect = true;
});

gridContainer.addEventListener('mouseover', function (e) {
  if (!hoverEffect) return;

  const target = e.target;
  const isColorful = target.classList.contains('colorful');
  if (!target.classList.contains('grid')) return;

  if (colorMode && !isColorful) {
    setRGBAColor(target, generateThreeNumbers);
    target.classList.add('colorful');
  } else if (colorMode && isColorful) {
    increaseOpacity(target);
  } else eraseColor(target);
});

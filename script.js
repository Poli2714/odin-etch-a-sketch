'use strict';

const gridContainer = document.querySelector('.grid-container');
const selectSizeBtn = document.querySelector('.select-size-btn');
const resetBtn = document.querySelector('.reset-btn');
const eraseBtn = document.querySelector('.erase-btn');

let isActive = false;

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

renderGrids(16, createGrid);

selectSizeBtn.addEventListener('click', function () {
  isActive = false;
  const numberOfGrids = prompt('Please enter between 1 and 100');
  if (isNaN(numberOfGrids)) {
    alert('You should enter a positive integer between 1 and 100');
    return;
  }
  gridContainer.innerHTML = '';
  renderGrids(+numberOfGrids, createGrid);
});

resetBtn.addEventListener('click', function () {
  const grids = document.querySelectorAll('.grid');
  grids.forEach(grid => (grid.style.backgroundColor = 'inherit'));
  isActive = false;
});

eraseBtn.addEventListener('click', function () {});

gridContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('grid')) return;
  if (!isActive) {
    makeMeColorful(target, generateRGBNumbers);
    isActive = true;
  } else isActive = false;
});

gridContainer.addEventListener('mouseover', function (e) {
  const target = e.target;
  if (!target.classList.contains('grid')) return;
  if (isActive) {
    makeMeColorful(target, generateRGBNumbers);
  }
});

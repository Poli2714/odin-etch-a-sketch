'use strict';

const squareContainer = document.querySelector('.square-container');

let isActive = false;

const createSquare = function (size, parentEl) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.cssText = `height: ${size}px; width: ${size}px`;
  parentEl.appendChild(square);
};

const renderGrids = function (n, createSquare) {
  const number = n * n;
  for (let i = 0; i < number; i++) {
    const size = 700 / n;
    createSquare(size, squareContainer);
  }
};

renderGrids(80, createSquare);

squareContainer.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.classList.contains('square')) return;
  if (!isActive) {
    target.classList.add('black');
    isActive = true;
  } else isActive = false;
});

squareContainer.addEventListener('mouseover', function (e) {
  const target = e.target;
  if (!target.classList.contains('square')) return;
  if (isActive) {
    target.classList.add('black');
  }
});

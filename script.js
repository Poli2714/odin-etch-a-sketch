'use strict';

const squareContainer = document.querySelector('.square-container');

const createSquare = function (size, container) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.cssText = `height: ${size}px; width: ${size}px`;
  container.appendChild(square);
};

const renderGrids = function (n) {
  const number = n * n;
  for (let i = 0; i < number; i++) {
    const size = 700 / n;
    createSquare(size, squareContainer);
  }
};

renderGrids(16);

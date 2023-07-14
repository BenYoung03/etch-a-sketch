let container = document.querySelector('.container');
let gridSize = 16;

function createGrid(gridSize) {
    for (i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.style.width = `${445 / gridSize}px`;
        square.style.height = `${445  / gridSize}px`;
        square.classList.add('square');
        container.appendChild(square);
    }
}

createGrid(gridSize);

const cells = document.querySelectorAll('.square');

cells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'black';
    });
});

let container = document.querySelector('.container');
let gridSize = 16;

function createGrid(gridSize) {
    for (i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.style.width = `${500 / gridSize}px`;
        square.style.height = `${500 / gridSize}px`;
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

const button = document.getElementById('change-grid');
button.addEventListener('click', () => {
    gridSize = prompt('Enter a number between 1 and 100');
    if (gridSize > 100 || gridSize < 1) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(gridSize);
    const cells = document.querySelectorAll('.square');
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'black';
        });
    });
});

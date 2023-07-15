let container = document.querySelector('.container');
let gridSize = 16;
let colour = "black";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


function createGrid(gridSize) {
    for (i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.style.width = `${500 / gridSize}px`;
        square.style.height = `${500 / gridSize}px`;
        square.style.backgroundColor = 'white';
        square.classList.add('square');
        square.addEventListener('mouseover', changeColour)
        square.addEventListener('mousedown', changeColour)
        container.appendChild(square);
    }
}

createGrid(gridSize);

const buttons = document.querySelectorAll('.button');

function changeColour(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (colour === 'black') {
        e.target.style.backgroundColor = 'black';
    } else if (colour === 'white') {
        e.target.style.backgroundColor = 'white';
    }
}

const changeBtn = document.getElementById('change-grid');
changeBtn.addEventListener('click', () => {
    gridSize = prompt('Enter a number between 1 and 100');
    if (gridSize > 100 || gridSize < 1) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(gridSize);
    
});

const clearBtn = document.getElementById('clear-grid');
clearBtn.addEventListener('click', () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(gridSize);
});

const eraser = document.getElementById('eraser');
eraser.addEventListener('click', () => {
    colour = 'white';
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    eraser.classList.add('active');
});

const pencil = document.getElementById('pencil');
pencil.addEventListener('click', () => {
    colour = 'black';
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    pencil.classList.add('active');
});

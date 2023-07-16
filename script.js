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

let slider = document.getElementById('slider');
let output = document.getElementById('size');

output.innerHTML = `${16} x ${16}`;

slider.oninput = function() {
    output.innerHTML = `${this.value} x ${this.value}`;
}

slider.addEventListener('mouseup', () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    gridSize = slider.value;
    createGrid(gridSize);
});


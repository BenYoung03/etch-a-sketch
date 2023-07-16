let container = document.querySelector('.container');
let gridSize = 16;
let colour = "black";
let shade = false;

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
    let opacity = Number(e.target.style.opacity);
    if (e.type === 'mouseover' && !mouseDown) return;
    if(!shade) {
        if (colour === 'black') {
            e.target.style.backgroundColor = 'black';
            e.target.style.opacity = 1;
        } else if (colour === 'white') {
            e.target.style.backgroundColor = 'white';
            e.target.style.opacity = 1;
        } else if (colour === 'rainbow'){
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            e.target.style.opacity = 1;
        }
    } else {
        if (colour === 'black') {
            e.target.style.backgroundColor = 'black';
            e.target.style.opacity = opacity + 0.1;
        } else if (colour === 'white') {
            e.target.style.backgroundColor = 'white';
            e.target.style.opacity = opacity + 0.1;
        } else if (colour === 'rainbow'){
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            e.target.style.opacity = opacity + 0.1;
        }
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
    shade = false;
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
    if(shade) shading.classList.add('active');
    pencil.classList.add('active');
});

const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('click', () => {
    colour = 'rainbow';
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    if(shade) shading.classList.add('active');
    rainbow.classList.add('active');
});

const shading = document.getElementById('shading');
shading.addEventListener('click', () => {
    if(colour === 'white') return;
    shade = !shade;
    if(shade) shading.classList.add('active');
    else shading.classList.remove('active');
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


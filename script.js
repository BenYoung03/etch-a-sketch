let container = document.querySelector('.container');
let gridSize = 16;
let colour = 'black';
let shade = false;

createGrid(gridSize);

function createGrid(gridSize) {
    let gridDimensions = container.clientWidth;
    for (i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.style.width = `${gridDimensions / gridSize}px`;
        square.style.height = `${gridDimensions / gridSize}px`;
        square.classList.add('square');
        square.style.backgroundColor = 'white';
        container.appendChild(square);
    }
}

let clicked = false;
let drawing = document.getElementById('drawing');
drawing.innerHTML = `Off`;

container.addEventListener("mousedown",  (_) => { clicked = true });
container.addEventListener("mouseup", (_) => { clicked = false });
container.addEventListener("mouseleave", (_) => { clicked = false });

document.addEventListener("mousemove", () => {
    if(clicked) {
        container.addEventListener("mousemove", changeColour);
        drawing.innerHTML = `On`;
        drawing.style.color = 'green';
    } else{
        container.removeEventListener("mousemove", changeColour);
        drawing.innerHTML = `Off`;   
        drawing.style.color = 'red';
    }

    
});


container.addEventListener("dblclick", changeColour);

const buttons = document.querySelectorAll('.button');

let colourPicker = document.getElementById('colorpicker');
colourPicker.addEventListener('input', function() {
    if(brush.classList.contains('active')) {
    colour = colourPicker.value;
    }
});
function changeColour(e) {
    let opacity = Number(e.target.style.opacity);
    if(!shade) {
        if (colour === 'white') {
            e.target.style.backgroundColor = 'white';
            e.target.style.opacity = 1;
        } else if (colour === 'rainbow'){
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            e.target.style.opacity = 1;
        } else {
            e.target.style.backgroundColor = colourPicker.value;
            e.target.style.opacity = 1;
        }
    } else {
        if (colour === 'white') {
            e.target.style.backgroundColor = 'white';
            e.target.style.opacity = opacity + 0.1;
        } else if (colour === 'rainbow'){
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            e.target.style.opacity = opacity + 0.1;
        } else {
            e.target.style.backgroundColor = colourPicker.value;
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

const brush = document.getElementById('brush');
brush.addEventListener('click', () => {
    colour = colourPicker.value;
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    if(shade) shading.classList.add('active');
    brush.classList.add('active');
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


// Select the container element and set the initial grid size, colour, shade, and grid dimensions
let container = document.querySelector('.container');
let gridSize = 16;
let colour = 'black';
let shade = false;
let gridDimensions = 450;

// Create the initial grid
createGrid(gridSize);

// Function to create the grid
function createGrid(gridSize) {
    // Remove any existing squares from the container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Create new squares and add them to the container
    for (i = 0; i < gridSize * gridSize; i++) {
        let square = document.createElement('div');
        square.style.width = `${gridDimensions / gridSize}px`;
        square.style.height = `${gridDimensions / gridSize}px`;
        square.classList.add('square');
        square.style.backgroundColor = 'white';
        container.appendChild(square);
    }
}

// Set initial values for clicked and drawing
let clicked = false;
let drawing = document.getElementById('drawing');
drawing.innerHTML = `Off`;

// Add event listeners for mouse actions on the container and the document that toggle clicked to track when user is attempting to draw
container.addEventListener("mousedown",  (_) => { clicked = true });
document.addEventListener("mouseup", (_) => { clicked = false });
document.addEventListener("mouseleave", (_) => { clicked = false });

// Add event listener for mouseover on the container that changes the colour of the square if clicked is true
container.addEventListener("mouseover", (e) => {
    if (clicked) {
        changeColour(e);
        drawing.innerHTML = `On`;
        drawing.style.color = 'green';
    } else {
        drawing.innerHTML = `Off`;
        drawing.style.color = 'red';
    }
});

// Add event listener for double-click on the container if you only want to draw one square at a time
container.addEventListener("dblclick", changeColour);

// Add event listener for colour picker input
let colourPicker = document.getElementById('colorpicker');
colourPicker.addEventListener('input', function() {
    if(brush.classList.contains('active')) {
    colour = colourPicker.value;
    }
});

// Function to change the colour of a square
function changeColour(e) {
    let opacity = Number(e.target.style.opacity);
    //Fills the square with the selected colour at 100% opacity if shading is not selected
    if(!shade) {
        if (colour === 'white') {
            e.target.style.backgroundColor = 'white';
            e.target.style.opacity = 1;
        } else if (colour === 'rainbow'){
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            e.target.style.opacity = 1;
        } else /*Else is this case is the colour picker*/{
            e.target.style.backgroundColor = colourPicker.value;
            e.target.style.opacity = 1;
        }
        //If shading is enabled increase opacity of square by 0.1
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

// Select all buttons and add event listeners for each
const buttons = document.querySelectorAll('.button');

// Add event listener for clear button that clears the grid when selected
const clearBtn = document.getElementById('clear-grid');
clearBtn.addEventListener('click', () => {
    createGrid(gridSize);
});

// Add event listener for eraser button that toggles a white brush that erases content
const eraser = document.getElementById('eraser');
eraser.addEventListener('click', () => {
    colour = 'white';
    shade = false;
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    eraser.classList.add('active');
});

// Add event listener for brush button that takes the colour from the colour picker and applies it to the canvas when drawn on
const brush = document.getElementById('brush');
brush.addEventListener('click', () => {
    colour = colourPicker.value;
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    if(shade) shading.classList.add('active');
    brush.classList.add('active');
});

// Add event listener for rainbow button which allows for rainbow colouring
const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('click', () => {
    colour = 'rainbow';
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    if(shade) shading.classList.add('active');
    rainbow.classList.add('active');
});

// Add event listener for shading button which toggles shading on and off
const shading = document.getElementById('shading');
shading.addEventListener('click', () => {
    if(colour === 'white') return;
    shade = !shade;
    if(shade) shading.classList.add('active');
    else shading.classList.remove('active');
});

// Add event listener for slider input which changes the text above slider
let slider = document.getElementById('slider');
let output = document.getElementById('size');
output.innerHTML = `${16} x ${16}`;
slider.oninput = function() {
    output.innerHTML = `${this.value} x ${this.value}`;
}

// Add event listener for slider mouseup which changes the grid size
slider.addEventListener('mouseup', () => {
    gridSize = slider.value;
    createGrid(gridSize);
});
const defaultPaint = 'black';
const defaultMode = 'color';
const defaultCells = 16;

let currentPaint = defaultPaint;
let currentMode = defaultMode;
let currentCells = defaultCells;

let isDrawing = false;

const cellContainer = document.querySelector('.cell-container');
const sizeDisplay = document.querySelector('.canvas-size-display');
const sizeInput = document.querySelector('#canvas-size-input');
const colorSelect = document.querySelector('#color-select');
const resetBtn = document.querySelector('#reset');
const eraserBtn = document.querySelector('#eraser');
const rainbowBtn = document.querySelector('#rainbow');

const helpBtn = document.querySelector('#help-button');

window.addEventListener('mousedown', (e) => {
    isDrawing = true;
})
window.addEventListener('mouseup', (e) => {
    isDrawing = false;
})

colorSelect.addEventListener('input', (e) => {
    currentPaint = e.target.value;
});

helpBtn.onclick = () => toggleHelp();
resetBtn.onclick = () => resetCanvas();
rainbowBtn.onclick = () => currentMode = 'rainbow';
eraserBtn.onclick = () => currentMode = 'erase';
colorSelect.onclick = () => currentMode = 'color';



sizeDisplay.textContent = `canvas size: ${sizeInput.value}x${sizeInput.value}`;
sizeInput.addEventListener('mousemove', (e) => {
    sizeDisplay.textContent = `canvas size: ${sizeInput.value}x${sizeInput.value}`;
});
sizeInput.addEventListener('change', (e) => {
    currentCells = sizeInput.value;
    resetCanvas();
    createCells(currentCells);
});

function paintCell(e) {
    let mode = currentMode;
    if (isDrawing) {
        if (mode === 'erase') {
            e.target.style.backgroundColor = 'white'; //this will effect later features (like being able to customise background color);
        } else if (mode === 'color') {
            e.target.style.backgroundColor = `${currentPaint}`;
        } else if (mode === 'rainbow') {
            e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
        }
    }
}


function createCells(currentCells) {
    cellContainer.style.gridTemplateColumns = `repeat(${currentCells}, 1fr)`;
    cellContainer.style.gridTemplateRows = `repeat(${currentCells}, 1fr)`;
    const cellNumber = currentCells * currentCells;

    for (let i = 0; i < cellNumber; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', paintCell);
        cellContainer.appendChild(cell);
    }
}

function resetCanvas() {
    cellContainer.innerHTML = '';
    createCells(currentCells);
}

createCells(currentCells);

function toggleHelp() {
    let info = document.querySelector('.help-info');
    info.classList.toggle('help-active');
}


let cells = document.querySelectorAll('.cell');
cells.forEach(cells => cells.addEventListener('mouseover', paintCell));
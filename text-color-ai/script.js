var netStructure = [3, 3, 1];
var net;

var data = [
    
];


// const diagramEl = document.getElementById('diagram');
// diagramEl.innerHTML = brain.utilities.toSVG(net);

const colorEl = document.getElementById('color');
const guessEl = document.getElementById('guess');
const whiteButton = document.getElementById('white-button');
const blackButton = document.getElementById('black-button');
const printButton = document.getElementById('print-button');
const trainButton = document.getElementById('train-button');
const testCaseNumDisplay = document.getElementById('test-cases-display');
const statusDisplay = document.getElementById('status-display');
let color;
let guess;
train();

whiteButton.addEventListener('click', () => {
    chooseColor(1);
});

blackButton.addEventListener('click', () => {
    chooseColor(0);
});

printButton.addEventListener('click', () => {
    print();
});

trainButton.addEventListener('click', () => {
    train();
});

function chooseColor(value) {
    data.push({
        input: color,
        output: [value]
    });

    if(value != guess) {
        train();
    }
    else {
        setRandomColor();
    }
    testCaseNumDisplay.innerText = data.length;
}

async function train() {
    colorEl.style.filter = 'brightness(0%)';
    updateStatus('training...')
    setTimeout(() => {
        net = trainNetwork(netStructure, 100, 1000, 0.2, data);
        setRandomColor();
        colorEl.style.filter = 'brightness(100%)';
        console.log("trained");
        updateStatus('none');
    }, 10);
}

function print() {
    console.log(JSON.stringify(data));
}

function setRandomColor() {
    color = [Math.random(), Math.random(), Math.random()];
    guess = NeuralNetwork.feedForward(color, net)[0];

    guessEl.style.color = guess > 0.5 ? '#FFF' : '#000';
    colorEl.style.background = `rgba(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`;
}

async function updateStatus(value, callback) {
    statusDisplay.innerText = value;
    if(callback && typeof callback === 'function') awaitcallback();
}
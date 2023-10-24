var netStructure = [3, 3, 1];
var net;

var data = [
    {
        input: [1, 1, 1],
        output: [0]
    }
];

net = trainNetwork(netStructure, 10, 10, 0.2, data);

// const diagramEl = document.getElementById('diagram');
// diagramEl.innerHTML = brain.utilities.toSVG(net);

const colorEl = document.getElementById('color');
const guessEl = document.getElementById('guess');
const whiteButton = document.getElementById('white-button');
const blackButton = document.getElementById('black-button');
const printButton = document.getElementById('print-button');
const trainButton = document.getElementById('train-button');
let color;
setRandomColor();

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
    net = trainNetwork(netStructure, 100, 1000, 0.2, data);
    setRandomColor();
    console.log("Re-trained!");
});

function chooseColor(value) {
    data.push({
        input: color,
        output: [value]
    });
    setRandomColor();
}

function print() {
    console.log(JSON.stringify(data));
}

function setRandomColor() {
    color = [Math.random(), Math.random(), Math.random()];
    const guess = NeuralNetwork.feedForward(color, net)[0];

    guessEl.style.color = guess > 0.5 ? '#FFF' : '#000';
    colorEl.style.background = `rgba(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`;
}


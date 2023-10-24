var net = new brain.NeuralNetwork();

const data = [
    {
        input: { r: 1, g: 1, b: 1 },
        output:[0]
    }
];

net.train(data);

const diagramEl = document.getElementById('diagram');
diagramEl.innerHTML = brain.utilities.toSVG(net);

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
    net = new brain.NeuralNetwork();
    net.train(data);
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
    color = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    }
    const guess = net.run(color)[0];

    guessEl.style.color = guess > 0.5 ? '#FFF' : '#000';
    colorEl.style.background = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`;
}


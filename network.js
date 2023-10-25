function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}

class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for(let i = 0; i < neuronCounts.length; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i+1]));
        }
    }// constructor(neuronCounts)

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for(let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }

        return outputs;
    }// static feedForward(givenInputs, network)

    static mutate(network, amount=1) {
        network.levels.forEach(level => {
            for(let i = 0; i < level.biases. length; i++) {
                level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
            }
            for(let i = 0; i < level.weights.length; i++) {
                for(let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
                }
            }
        })
    }// static mutate
}// class NeuralNetwork

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }
        
        Level.#randomize(this);
    }// constructor(inputCount, outputCount)

    static #randomize(level) {
        for(let i = 0; i < level.inputs.length; i++) {
            for(let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for(let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }// static #randomize(level)

    static feedForward(givenInputs, level) {
        for(let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for(let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j]*level.weights[j][i];
            }

            if(sum > level.biases[i]) {
                level.outputs[i] = 1;
            }
            else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }// static feedForward(givenInputs, level)
}// class Level

function trainNetwork(neuronCounts, batchSize = 10, batchAmount = 10, mutationAmount=0.2, trainingData) {

    if(trainingData.length < 1) {
        return new NeuralNetwork(neuronCounts);
    }

    let networks = Array(batchSize);

    for(let i = 0; i < batchSize; i++) {
        networks[i] = new NeuralNetwork(neuronCounts);
    }
    let bestNetwork = 0;
    let bestFitness = trainingData[0].output.length;

    for(let batch = 0; batch < batchAmount; batch++) {
        bestNetwork = 0;
        bestFitness = trainingData[0].output.length;
        for(let i = 0; i < batchSize; i++) {
            let fitness = 0;
            for(let d = 0; d < trainingData.length; d++) {
                let outputs = NeuralNetwork.feedForward(trainingData[d].input, networks[i]);

                for(let j = 0; j < outputs.length; j++) {
                    fitness += Math.abs(trainingData[d].output[j] - outputs[j]);
                }

                fitness /= outputs.length;

            }

            fitness /= trainingData.length;

            if(fitness < bestFitness) {
                bestNetwork = i;
                bestFitness = fitness;
            }
        }

        for(let i = 0; i < batchSize; i++) {
            if(i != bestNetwork) {
                NeuralNetwork.mutate(networks[i], mutationAmount);
            }
        }
    }

    return networks[bestNetwork];
}// trainNetwork
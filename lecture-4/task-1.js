import readline from "readline";

function isInputValid(input) {
    const inputRegex = /^(\d*)$/;  
    if (String(input).trim().match(inputRegex) === null) {
        return false;
    }

    if (Number(String(input).trim()) < 1 || Number(String(input).trim()) > 1000) {
        return false;
    }

    return true;
};

function multiply(numOne, numTwo) {
    return numOne * numTwo;  
};

const perimeter = function (sideLength) {
    return multiply(sideLength, 4);
};

const area = function (sideLength) {
    return multiply(sideLength, sideLength);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Write one side length number between 1 and 1000: ', oneSideLength => {
    if (isInputValid(oneSideLength) === false) {
        console.log("Wrong input, should be a one side length number between 1 and 1000.");
    } else {
        console.log(`Perimeter: ${perimeter(oneSideLength)}`);
        console.log(`Area: ${area(oneSideLength)}`);
    }

    rl.close();
});

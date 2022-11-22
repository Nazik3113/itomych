import readline from readline;

function isInputValid(input) {
    const strInput = String(input).trim();
    const inputRegex = /^(\d{2})$/;
    
    if (strInput.match(inputRegex) === null) {
        return false;
    }
    return true;
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Write your number between 10 and 99: ', number => {
    if (isInputValid(number) === false) {
        console.log("Wrong input, should be a number between 10 and 99.");
    } else {
        console.log(String(number).trim().split("").join(" "));
    }

    rl.close();
});
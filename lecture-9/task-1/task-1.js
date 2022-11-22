import readline from "readline";
import calculator from "./calculator.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const expressionRegex = /^[\d|\s+\-*\/()]*$/;

rl.question('Write the expression you need to calculate: \n', calcString => {
    if (calcString.match(expressionRegex)) {
        console.log(`${calcString} = ${calculator(calcString)}`);
    } else {
        console.log("Wrong expression(.");
    }
    rl.close();
});

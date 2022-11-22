import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let points = 0;
let randomNum = 0;

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
};

async function startGame() {
    randomNum = randomInt(1, 6);
   
    const wantsToPlay = await new Promise(resolve => {
        rl.question('Continue to pay? yes(1) no(0)', input => resolve(input))
    });
   
    if (wantsToPlay !== "1") {
        rl.close();
    }

    const guessNum = await new Promise(resolve => {
        rl.question('Try to guess the number between 1 and 6: ', input => resolve(input))
    });

    if (Number(guessNum) === randomNum) {
        points += 2;
        
        console.log("Heeeey, you got 2 points, nice guess.");
        return startGame();
    }

    if (Number(guessNum) - 1 === randomNum || Number(guessNum) + 1 === randomNum) {
        points += 1;

        console.log("Heeeey, you got 1 points, almost got it.");
        return startGame();
    };


    if (Number(guessNum) - 1 === randomNum || Number(guessNum) + 1 === randomNum) {
        points += 1;

        console.log("Heeeey, you got 1 points, almost got it.");
        return startGame();
    };


    console.log("Sorry, no points for that round(.");
    return startGame();
};
startGame();

rl.on('close', function () {
    console.log(`\nYour total points is: ${points}.`);
    process.exit(0);
});
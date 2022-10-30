function isInputValid(input) {
    const inputRegex = /^([MDCLXVI]*)(\s{0,1}\+\s{0,1})([MDCLXVI]*)$/;
    if (input.trim().match(inputRegex) === null) {
        return false;
    }
    return true;
}

function parseInput(input) {
    const inputRegex = /^([MDCLXVI]*)(\s{0,1}\+\s{0,1})([MDCLXVI]*)$/;
    return input.trim().match(inputRegex);
};

const romanToArabicMap = new Map([
    ["M", 1000],
    ["D", 500],
    ["C", 100],
    ["L", 50],
    ["X", 10],
    ["V", 5],
    ["I", 1]
]);

const arabicToRomanMap = new Map([
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
]);

function arabicSplitedToNativeArabic(arabic) {
    return arabic.reduce((prevArabic, arabicNumber, index, arabicArr) => {
        if (index === 0) {
            return prevArabic + arabicNumber;
        }

        if (
            typeof arabicArr[index + 1] === "number" &&
            arabicNumber < arabicArr[index + 1]
        ) {
            return prevArabic - arabicNumber;
        }

        return prevArabic + arabicNumber;
    }, 0);
}

function romanToArabic(roman) {
    const romanSplitted = roman.trim().split("");
    let arabicSplitted = romanSplitted.map((romanNum) =>
        romanToArabicMap.get(romanNum)
    );
    return arabicSplitedToNativeArabic(arabicSplitted);
}

function arabicToRoman(arabic) {
    if (typeof arabic !== "number") {
        return "";
    }

    let roman = "";

    const iterator = arabicToRomanMap.keys();
    let value = iterator.next().value;

    while (value !== undefined) {
        let repeatCount = Math.floor(arabic / arabicToRomanMap.get(value));
        arabic -= repeatCount * arabicToRomanMap.get(value);
        roman += value.repeat(repeatCount);
        value = iterator.next().value;
    }

    return roman;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('Add two roman numbers: \n', input => {
    if (isInputValid(input) === false) {
        console.log("Wrong input, should be two roman numbers and a plus between them.");
    } else {
        const parsedInput = parseInput(input);
        const romanOne = parsedInput[1];
        const romanTwo = parsedInput[3];
        const arabicOne = romanToArabic(romanOne);
        const arabicTwo = romanToArabic(romanTwo);
        console.log(arabicToRoman(arabicOne + arabicTwo));
    }

    readline.close();
});
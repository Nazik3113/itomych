function createBase(number) {
    return function (secondNumber) {
        return number + secondNumber;
    };
};

const addSix = createBase(6);

console.log(addSix(10));
console.log(addSix(21));
function reduce(array, callback, initialValue) {
    let accumulator = initialValue;
    for (const value of array) {
      accumulator = callback(accumulator, value);
    }
    return accumulator;
};

console.log(reduce(
    [1, 2, 3], 
    (prevValue, currentValue) => {
        return prevValue + currentValue;
    }, 
    0
));
function matrixMultiplication(matrixOne, matrixTwo) {
    const matrixOneRowsCount = matrixOne.length;
    const matrixOneColsCount = matrixOne[0].length;
    const matrixTwoRowsCount = matrixTwo.length;
    const matrixTwoColsCount = matrixTwo[0].length;
    const multipliedMatrix = new Array(matrixOneRowsCount);

    if (matrixOneColsCount !== matrixTwoRowsCount) {
        return "Matrices cannot be multiplied."
    }

    for (let rowIndex = 0; rowIndex < matrixOneRowsCount; ++rowIndex) {
        multipliedMatrix[rowIndex] = new Array(matrixTwoColsCount);
        for (let colsIndex = 0; colsIndex < matrixTwoColsCount; ++colsIndex) {
            multipliedMatrix[rowIndex][colsIndex] = 0;
            for (let matrixOneColsIndex = 0; matrixOneColsIndex < matrixOneColsCount; ++matrixOneColsIndex) {
                multipliedMatrix[rowIndex][colsIndex] += matrixOne[rowIndex][matrixOneColsIndex] * matrixTwo[matrixOneColsIndex][colsIndex];
            }
        }
    }
    return multipliedMatrix;
}

console.log(matrixMultiplication(
    [ [ 1, 2 ], [ 1, 2 ], [ 1, 2 ] ], 
    [ [ 1, 2, 3 ], [ 1, 2, 3 ] ]
));


console.log(matrixMultiplication(
    [ [ 1, 2 ], [ 1, 2 ], [ 1, 2 ] ], 
    [ [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 2, 3 ] ]
));
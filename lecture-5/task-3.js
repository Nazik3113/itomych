function isPointInCircle(pointX, pointY, circleCenterX, circleCenterY, circleRadius) {
    return Math.pow(pointX - circleCenterX, 2) + Math.pow(pointY - circleCenterY, 2) <= Math.pow(circleRadius, 2);  
};

console.log(isPointInCircle(3, 3, 0, 0, 3));
console.log(isPointInCircle(3, 3, 0, 0, 4));
console.log(isPointInCircle(3, 3, 0, 0, 5));
console.log(isPointInCircle(3, 3, 0, 0, 6));
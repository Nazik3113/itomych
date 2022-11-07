const Circle = {
    x: 0,
    y: 0,
    r: 0,
    area: function() {
        return Number((Math.PI * Math.pow(this.r, 2)).toFixed(2));
    },
    perimeter: function() {
        return Number(((Math.PI * this.r) * 2).toFixed(2));
    }
};

function areaOfIntersectionOfCircles(circle1, circle2) { // площа перетину двох кіл
    const distance = Math.sqrt((circle1.x - circle2.x) * (circle1.x - circle2.x) + (circle1.y - circle2.y) * (circle1.y - circle2.y));

    if (distance >= circle1.r + circle2.r) {
        return 0;
    } else if (distance <= circle1 + circle2) {
        return 0;
    } else {
        const f1 = 2 * Math.acos((Math.pow(circle1.r, 2) - Math.pow(circle2.r, 2) + Math.pow(distance, 2)) / (2 * circle1.r * distance));
        const f2 = 2 * Math.acos((Math.pow(circle2.r, 2) - Math.pow(circle1.r, 2) + Math.pow(distance, 2)) / (2 * circle2.r * distance));
        const s1 = (Math.pow(circle1.r, 2) * (f1 - Math.sin(f1))) / 2;
        const s2 = (Math.pow(circle2.r, 2) * (f2 - Math.sin(f2))) / 2;

        return Number((s1 + s2).toFixed(2));
    }
    return 0;
}; 

const circle = Object.create(Circle);
circle.x = 0;
circle.y = 0;
circle.r = 2;
const circle1 = Object.create(Circle);
circle1.x = 3;
circle1.y = 0;
circle1.r = 4;
console.log(areaOfIntersectionOfCircles(circle, circle1)); // 9.57 результат на цих значеннях
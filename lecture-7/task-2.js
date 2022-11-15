class Figure {
    constructor(coords = [], centerCoords = [0, 0], radius = null) {
        if (this.constructor === Figure) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.coodrs = coords;
        this.centerCoords = centerCoords;
        this.radius = radius;
    };

    calcIntersection() {
        throw new Error("Method 'calcIntersection()' must be implemented.");
    };
};

class Circle extends Figure {
    constructor(coords, centerCoords, radius) {
        super(coords, centerCoords, radius);
    };

    calcIntersection(circle2) {
        const distance = Math.sqrt((this.centerCoords[0] - circle2.centerCoords[0]) * (this.centerCoords[0] - circle2.centerCoords[0]) + (this.centerCoords[1] - circle2.centerCoords[1]) * (this.centerCoords[1] - circle2.centerCoords[1]));

        if (distance >= this.radius + circle2.radius) {
            return 0;
        } else if (distance <= this + circle2) {
            return 0;
        } else {
            const f1 = 2 * Math.acos((Math.pow(this.radius, 2) - Math.pow(circle2.radius, 2) + Math.pow(distance, 2)) / (2 * this.radius * distance));
            const f2 = 2 * Math.acos((Math.pow(circle2.radius, 2) - Math.pow(this.radius, 2) + Math.pow(distance, 2)) / (2 * circle2.radius * distance));
            const s1 = (Math.pow(this.radius, 2) * (f1 - Math.sin(f1))) / 2;
            const s2 = (Math.pow(circle2.radius, 2) * (f2 - Math.sin(f2))) / 2;
    
            return Number((s1 + s2).toFixed(2));
        }
    };
};

const circle1 = new Circle([], [0, 0], 2);
const circle2 = new Circle([], [3, 0], 4);
console.log(circle1.calcIntersection(circle2));

class EquilateralTriangle extends Figure {
    constructor(coords, centerCoords, radius) {
        super(coords, centerCoords, radius);
    };

    calcIntersection(triangle1) {
        // Чесно кажучи, не бачу сенсу шукати зараз 5 різних формул 
        // для 5 різних фігур, щоб потім їх реалізувати.
        // Оскільки це все робиться лише для нашого розуміння тем ООП, 
        // прикладу однієї формули має бути достатньо. 
        // Всі інші будуть працювати за схожим принкипом.
    };
};

class IsoscelesTriangle extends Figure {
    constructor(coords, centerCoords, radius) {
        super(coords, centerCoords, radius);
    };

    calcIntersection(triangle1) {
        // Чесно кажучи, не бачу сенсу шукати зараз 5 різних формул 
        // для 5 різних фігур, щоб потім їх реалізувати.
        // Оскільки це все робиться лише для нашого розуміння тем ООП, 
        // прикладу однієї формули має бути достатньо. 
        // Всі інші будуть працювати за схожим принкипом.
    };
};

class Diamond extends Figure {
    constructor(coords, centerCoords, radius) {
        super(coords, centerCoords, radius);
    };

    calcIntersection(diamond1) {
        // Чесно кажучи, не бачу сенсу шукати зараз 5 різних формул 
        // для 5 різних фігур, щоб потім їх реалізувати.
        // Оскільки це все робиться лише для нашого розуміння тем ООП, 
        // прикладу однієї формули має бути достатньо. 
        // Всі інші будуть працювати за схожим принкипом.
    };
};

class Rectangle extends Figure {
    constructor(coords, centerCoords, radius) {
        super(coords, centerCoords, radius);
    };

    calcIntersection(rectangle1) {
        // Чесно кажучи, не бачу сенсу шукати зараз 5 різних формул 
        // для 5 різних фігур, щоб потім їх реалізувати.
        // Оскільки це все робиться лише для нашого розуміння тем ООП, 
        // прикладу однієї формули має бути достатньо. 
        // Всі інші будуть працювати за схожим принкипом.
    };
};
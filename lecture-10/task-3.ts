interface Coords {
    x: number,
    y: number
};

function sideLen(x1: number, y1: number, x2: number, y2: number) {
    return Number(
        Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    );  
};

function triangleArea(AChoords: Coords, BChoords: Coords, CChoords: Coords) {
    const a = sideLen(AChoords.x, AChoords.y, BChoords.x, BChoords.y);  
    const b = sideLen(AChoords.x, AChoords.y, CChoords.x, CChoords.y);  
    const c = sideLen(CChoords.x, CChoords.y, BChoords.x, BChoords.y);
    
    const p = (a + b + c) / 2;

    return Number(Math.sqrt(p * (p - a) * (p - b) * (p - c)));
};

function isDotInTriangle(AChoords: Coords, BChoords: Coords, CChoords: Coords, OChoords: Coords) {
    const AOB = triangleArea(AChoords, OChoords, BChoords);
    const COB = triangleArea(CChoords, OChoords, BChoords);
    const AOC = triangleArea(AChoords, OChoords, CChoords);
    const ABC = triangleArea(AChoords, BChoords, CChoords);

    if (AOB + COB + AOC - ABC <= 0.001) {
        return 1;
    };

    return 0;
};

console.log(
    isDotInTriangle(
        { x: -6, y: -2 },
        { x: 0, y: 5 },
        { x: 5, y: -3 },
        { x: 0, y: 5 }
    )
);
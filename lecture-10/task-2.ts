const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const polynomialRegex = /([\d\S]{1,4})(\s*)(\+|-)(\s*)([\d\S]{1,4})/;

const digitRegex = /^\d/;

function sortPoly(poly: string): string {
  return poly
    .split(" + ")
    .map((arg) => {
      return {
        coeff: calculateCoeff(arg),
        arg: arg
      };
    })
    .sort((argObj1, argObj2) => {
      if (argObj1.coeff > argObj2.coeff) {
        return -1;
      }
      return 1;
    })
    .map((argObj) => {
      return argObj.arg;
    })
    .join(" + ");
};

function parsePolynomia(poly: string): Array<string> {
  const matchArr: Array<string> = poly.match(polynomialRegex);
  return [matchArr[1], matchArr[5]];
};

function calculateCoeff(arg: string): number {
  const coeff: string = arg.split("")[0];

  if (coeff.match(digitRegex)) {
    return Number(coeff);
  } else {
    return 1;
  }
};

function calcucaleCoeffs(poly: string): Array<number> {
  const [arg1, arg2]: Array<string> = parsePolynomia(poly);
  return [calculateCoeff(arg1), calculateCoeff(arg2)];
}; 

function multiplyPoly(poly1: Array<number>, poly2: Array<number>): Array<number> {
  let result: Array<number> = [];

  poly1.forEach(function (coeff1P1: number, coeff2P1: number) {
    poly2.forEach(function (coeff1P2, coeff2P2) {
      result[coeff2P1 + coeff2P2] = (result[coeff2P1 + coeff2P2] || 0) + coeff1P1 * coeff1P2;
    });
  });

  return result;
};

function polyToString(poly: Array<number>, n: number): string {
  let ans: string = "";
  for (let i = 0; i < n; i++) {
    ans += poly[i];
    if (i != 0) ans += "x^" + i;
    if (i != n - 1) ans += " + ";
  }
  return ans;
};

rl.question('Write the first polynomial: ', (firstPoly: string) => {
  rl.question('Write the second polynomial: ', (secondPoly: string) => {    
    const resPoly: Array<number> = multiplyPoly(calcucaleCoeffs(firstPoly), calcucaleCoeffs(secondPoly));
    const poly: string = polyToString(resPoly, resPoly.length);
    console.log(sortPoly(poly));
    rl.close();
  });
});
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const polynomialPlusRegex = /([-\d\S]{1,8})(\s*)(\+)(\s*)([-\d\S]{1,8})/;
const polynomialMinusRegex = /([-\d\S]{1,8})(\s*)(-)(\s*)([-\d\S]{1,8})/;

const digitMinusRegex = /^(-?\d{0,3})/;
const digitRegex = /^(\d{0,3})/;

const powerRegex = /\^(\d{0,2})/;

const xRegex = /x/;

const minusRegex = /^-(.*)/;

function parseBase(arg: string): string {
  const x: Array<string> = arg.match(xRegex);

  if (!x || x[0] === "") {
    return "";
  }

  return "x";
}

function parsePolynomia(poly: string): Array<string> {
  const matchPlusArr: Array<string> = poly.match(polynomialPlusRegex);
  const matchMinusArr: Array<string> = poly.match(polynomialMinusRegex);

  if (matchPlusArr) {
    return [matchPlusArr[1], matchPlusArr[5]];
  } else {
    return [matchMinusArr[1], String(-matchMinusArr[5])];
  }
}

function parseCoeff(arg: string): number {
  const coeff: Array<string> = arg.match(digitMinusRegex);

  if (!coeff || coeff[0] === "") {
    return 1;
  }

  return Number(coeff[0]);
}

function parseCoeffWithoutMinus(arg: string): number {
  const coeff: Array<string> = arg.match(digitRegex);

  if (!coeff || coeff[0] === "") {
    return 1;
  }

  return Number(coeff[0]);
}

function buildResArgs(arg1: string, arg2: string): string {
  const arg1Coeff: number = parseCoeff(arg1);
  const arg2Coeff: number = parseCoeff(arg2);
  const arg1Power: number = parsePower(arg1);
  const arg2Power: number = parsePower(arg2);
  const arg1Base: string = parseBase(arg1);
  const arg2Base: string = parseBase(arg2);

  if (arg1Base === "" && arg2Base === "") {
    if (arg1Power === 0 && arg2Power === 0) {
      if (arg1Coeff * arg2Coeff === 0) {
        return "";
      } else {
        return String(arg1Coeff * arg2Coeff);
      }
    } else {
      if (arg1Coeff * arg2Coeff === 0) {
        return "";
      } else {
        return (
          String(arg1Coeff * arg2Coeff) + "^" + String(arg1Power + arg2Power)
        );
      }
    }
  }

  if (arg1Power === 0 && arg2Power === 0) {
    if (arg1Coeff * arg2Coeff === 1) {
      if (arg1Base === "x" && arg2Base === "x") {
        return "x^2";
      } else {
        return "x";
      }
    } else if (arg1Coeff * arg2Coeff === -1) {
      if (arg1Base === "x" && arg2Base === "x") {
        return "-x^2";
      } else {
        return "-x";
      }
    } else if (arg1Coeff * arg2Coeff === 0) {
      return "";
    } else {
      return String(arg1Coeff * arg2Coeff) + "x";
    }
  } else {
    if (arg1Coeff * arg2Coeff === 1) {
      return "x^" + String(arg1Power + arg2Power);
    } else if (arg1Coeff * arg2Coeff === -1) {
      return "-x^" + String(arg1Power + arg2Power);
    } else if (arg1Coeff * arg2Coeff === 0) {
      return "";
    } else {
      return (
        String(arg1Coeff * arg2Coeff) + "x^" + String(arg1Power + arg2Power)
      );
    }
  }
}

function parsePower(arg: string): number {
  const power: Array<string> = arg.match(powerRegex);

  if (!power || power[0] === "") {
    return 0;
  }

  return Number(power[1]);
}

function buildPoly(arg1: string, arg2: string, arg3: string, arg4: string) {
  const arg1Coeff: number = parseCoeffWithoutMinus(arg1);
  const arg2Coeff: number = parseCoeffWithoutMinus(arg2);
  const arg3Coeff: number = parseCoeffWithoutMinus(arg3);
  const arg4Coeff: number = parseCoeffWithoutMinus(arg4);

  const sortedPoly = [
    { coeff: arg1Coeff, poly: arg1 },
    { coeff: arg2Coeff, poly: arg2 },
    { coeff: arg3Coeff, poly: arg3 },
    { coeff: arg4Coeff, poly: arg4 }
  ]
    .sort((argObj1, argObj2) => {
      if (argObj1.coeff > argObj2.coeff) {
        return -1;
      }
      return 1;
    })
    .map((argObj) => {
      return argObj.poly;
    });

  let res: string = "";

  sortedPoly.forEach((el, index) => {
    if (index === 0) {
      res += el;
      return;
    }

    const elNegative = el.match(minusRegex);

    if (elNegative) {
      res += " - " + elNegative[1];
    } else {
      res += " + " + el;
    }
  });

  return res;
}

function multiplyPoly(poly1: string, poly2: string): string {
  const [arg1, arg2]: Array<string> = parsePolynomia(poly1);
  const [arg3, arg4]: Array<string> = parsePolynomia(poly2);

  const arg1Res: string = buildResArgs(arg1, arg3);
  const arg2Res: string = buildResArgs(arg1, arg4);
  const arg3Res: string = buildResArgs(arg2, arg3);
  const arg4Res: string = buildResArgs(arg2, arg4);

  return buildPoly(arg1Res, arg2Res, arg3Res, arg4Res);
}

rl.question('Write the first polynomial: ', (firstPoly: string) => {
  rl.question('Write the second polynomial: ', (secondPoly: string) => {    
    console.log(multiplyPoly(firstPoly, secondPoly));
    rl.close();
  });
});
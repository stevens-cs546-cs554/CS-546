const calculator = require("./calculator");

let addTenAndTwelve = calculator.addTwoNumbers(10, 12);
console.log(`the result is ${addTenAndTwelve}`);

if (addTenAndTwelve !== 22) {
  throw "ADD TWO NUMBERS IS PROBABLY BROKEN";
} else {
  console.log("Add two numbers works when given 2 numbers");
}

try {
  let addTenAndUndef = calculator.addTwoNumbers(10, undefined);
} catch (e) {
  console.log("Add two numbers works when given 1 number and 1 not");
}

let division = calculator.divideTwoNumbers(420, 12);
console.log(`the result is ${division}`);

let subtraction = calculator.subtractTwoNumbers(18, 12);
console.log(`the result is ${subtraction}`);

let multiplication = calculator.multiplyTwoNumbers(5, 20);
console.log(`the result is ${multiplication}`);

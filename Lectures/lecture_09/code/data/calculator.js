let exportedMethods = {
  add(num1, num2) {
    if (typeof num1 !== "number") throw "Must provide a number";
    if (isNaN(num1)) throw "Must provide a number";
    if (typeof num2 !== "number") throw "Must provide a number";
    if (isNaN(num2)) throw "Must provide a number";

    return num1 + num2;
  },
  subtract(num1, num2) {
    if (typeof num1 !== "number") throw "Must provide a number";
    if (isNaN(num1)) throw "Must provide a number";
    if (typeof num2 !== "number") throw "Must provide a number";
    if (isNaN(num2)) throw "Must provide a number";

    return num1 - num2;
  },
  multiply(num1, num2) {
    if (typeof num1 !== "number") throw "Must provide a number";
    if (isNaN(num1)) throw "Must provide a number";
    if (typeof num2 !== "number") throw "Must provide a number";
    if (isNaN(num2)) throw "Must provide a number";

    return num1 * num2;
  },
  divide(num1, num2) {
    if (typeof num1 !== "number") throw "Must provide a number";
    if (isNaN(num1)) throw "Must provide a number";
    if (typeof num2 !== "number") throw "Must provide a number";
    if (isNaN(num2)) throw "Must provide a number";
    if (num2 <= 0) throw "Cannot divide by 0!";

    return num1 / num2;
  }
};

module.exports = exportedMethods;

let description = 'This is a calculator for CS-546';
//This is an internal function that is not exported so it can only be called within this module
function checkIsProperNumber(val, variableName) {
  if (typeof val !== 'number') {
    throw `${variableName || 'provided variable'} is not a number`;
  }

  if (isNaN(val)) {
    throw `${variableName || 'provided variable'} is NaN`;
  }
}
//These are the functions we will export.
function divideTwoNumbers(numerator, denominator) {
  checkIsProperNumber(numerator, 'numerator');
  checkIsProperNumber(denominator, 'denominator');

  if (denominator === 0) {
    throw 'denominator cannot be 0';
  }

  return numerator / denominator;
}

function addTwoNumbers(num1, num2) {
  checkIsProperNumber(num1, 'first number');
  checkIsProperNumber(num2, 'second number');

  return num1 + num2;
}

function subtractTwoNumbers(num1, num2) {
  checkIsProperNumber(num1, 'first number');
  checkIsProperNumber(num2, 'second number');

  return num1 - num2;
}

function multiplyTwoNumbers(num1, num2) {
  checkIsProperNumber(num1, 'first number');
  checkIsProperNumber(num2, 'second number');

  return num1 * num2;
}

module.exports = {
  description,
  divideTwoNumbers,
  addTwoNumbers,
  subtractTwoNumbers,
  multiplyTwoNumbers
};

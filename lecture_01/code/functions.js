function myGlobalFunction() {
  console.log("I'm a global function");
}

function printThisMessage(message) {
  console.log("We've received a message!");
  console.log(message);
}

let doubleUpAnonymous = function(x) {
  return x * 2;
};

let doubleUp = x => {
  return x * 2;
};

let addToTheNumber = num => {
  let numToAdd = num;

  return addThisMuch => {
    return numToAdd + addThisMuch;
  };
};

myGlobalFunction();
printThisMessage("Hello, CS-546");
console.log(doubleUp(16));

let addToTwelve = addToTheNumber(12);
console.log(addToTwelve);
console.log(addToTwelve(8));

function printSquaresUntil(num) {
  for (let i = 2; i < num; i++) {
    let num = i * i;
    console.log(`the square of ${i} is ${num}`);
  }
}

function haveAnInnerFunction() {
  function myInnerFunction() {
    return "Hello, I'm an inner function!";
  }

  if (true) {
    console.log(myInnerFunction());
  }
}

haveAnInnerFunction();
//myInnerFunction();

// printSquaresUntil(12);

function demonstrateVarVersusLet() {
  // Say you want to do some basic counts, like count the number of odds and then
  // the number of event numbers from 0 to 12

  // Change this between "odd", "even", and "both";
  const whatDoICount = "both";
  const howManyToCount = 12;

  if (whatDoICount === "odd" || whatDoICount === "both") {
    // CHANGE THIS BETWEEN `var` and `let` to see difference!
    var count;

    for (let i = 0; i < howManyToCount; i++) {
      if (i % 2 === 1) {
        if (count === undefined) {
          count = 0;
        }

        count = count + 1;
      }

      console.log(`at index ${i} there are ${count} odd numbers`);
    }
  }

  if (whatDoICount === "even" || whatDoICount === "both") {
    // CHANGE THIS BETWEEN `var` and `let` to see difference!
    var count;

    for (let i = 0; i < howManyToCount; i++) {
      if (i % 2 === 0) {
        if (count === undefined) {
          count = 0;
        }

        count = count + 1;
      }

      console.log(`at index ${i} there are ${count} even numbers`);
    }
  }
}

demonstrateVarVersusLet();

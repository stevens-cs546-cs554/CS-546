let myStringArray = ['hello', 'world', 'my', 'name', 'is', 'Patrick'];
let myNumArray = [1, 2, 3, 4, 5];

let mixedArray = [
  1,
  'Hello',
  undefined,
  true,
  (message) => {
    console.log(message);
  }
];

mixedArray[4]('Hello world!');

myStringArray.forEach((value) => {
  console.log(value);
});

let myNumArraySquared = myNumArray.map((x) => {
  return x * x;
});

console.log(myNumArray);
console.log(myNumArraySquared);
// console.log(myNumArray);

let oddNumbers = myNumArray.filter((num) => {
  return num % 2 === 1;
});

// // // console.log(myNumArray);
console.log(oddNumbers);

let sumOfOdds = oddNumbers.reduce((currentTotal, newValue) => {
  const newTotal = currentTotal + newValue;
  return newTotal;
}, 0);

console.log(sumOfOdds);

// console.log(myNumArray);
myNumArray.push(6);
console.log(myNumArray);
myNumArray.push('Patrick');
console.log(myNumArray);
console.log(myNumArray.pop());
console.log(myNumArray);

// console.log(myNumArray.join('&&'));

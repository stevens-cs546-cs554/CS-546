let myStringArray = ["hello", "world", "my", "name", "is", "Phil"];
let myNumArray = [1, 2, 3, 4, 5];

myStringArray.forEach(value => {
  console.log(value);
});

let myNumArraySquared = myNumArray.map(x => {
  return x * x;
});

console.log(myNumArray);
console.log(myNumArraySquared);

let oddNumbers = myNumArray.filter(num => {
  return num % 2 === 1;
});

console.log(myNumArray);
console.log(oddNumbers);

let sumOfOdds = oddNumbers.reduce((currentTotal, newValue) => {
  const newTotal = currentTotal + newValue;
  return newTotal;
}, 0);

console.log(sumOfOdds);

myNumArray.push(6);
console.log(myNumArray.join(" "));

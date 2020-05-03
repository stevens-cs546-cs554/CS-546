const constString = "I am a constant, I cannot be changed, I'm free as a bird";
console.log(constString);
//constString = 'I am not allowed';

let letString = "I'm a string, and I am block scoped using let";
console.log(letString);

letString = "I'm the new value of letString";
console.log(letString);

console.log(letString.length);

console.log(letString.toUpperCase());

console.log(letString.toLowerCase());

console.log(letString.indexOf('n'));

console.log(letString.charAt(9));

var varString = "I'm a string, and I am function scoped";

let myConcatString = letString + ' ' + varString;
console.log(myConcatString);

let myConcatString2 = `I am letstring: ${letString} I am varString, after a few new lines 
 
 
 
 
 
 ${varString}`;
console.log(myConcatString2);

console.log(
  letString.concat(' ' + varString + ' some text added after varString')
);

let myString1 = 'Hello there, How are you? My name is Patrick Hill';

console.log(myString1.split('?'));

let myBlankObj = {};

let myObj = {
  hello: 'World',
  num: 1,
  bool: true,
  myFn: (message) => {
    return message;
  }
};

console.log(myObj);

myObj['new-Key1'] = 'I am a new key!';
console.log(myObj);

myObj.directlyAddedKey = "I've been added!";
console.log(myObj);

let keyName = 'myStrKey';
myObj[keyName] = 'This was made dynamically';
console.log(myObj);

myObj.hello = 'Hello, world!';
console.log(myObj);

console.log(myObj.myFn('Hey Patrick'));

const myConstObj = { a: 1, b: 2, c: 3 };
console.log(myConstObj);
myConstObj.c = 4;
console.log(myConstObj);
myConstObj.d = 6;
console.log(myConstObj);
// myConstObj = {};
// console.log(myConstObj);

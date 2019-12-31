# CS-546 Lab 3

The purpose of this lab is to familiarize yourself with asynchronous programming in JavaScript, as well as using modules from the Node.js Package Manager ([npm](https://www.npmjs.com/)).  

For this lab, you **must** use the `async/await` keywords (not Promises). You will also be using [`axios`](https://github.com/axios/axios), which is a HTTP client for Node.js. After you run `npm init` with to create your `package.json`, you can install and save axios to it with `npm i axios`. You should check your `package.json` dependencies to ensure that `axios` is present:


```json
{
   "name": "cs-546-lab-3",
   "version": "1.0.0",
   "description": "CS-546 Lab 3",
   "main": "index.js",
   "scripts": {
      "start": "node index.js"
   },
   "author": "John Smith 12345678",
   "license": "ISC",
   "dependencies": {
      "axios": "^0.18.0"
   }
}
```

In addition, you must have error checking for the arguments of all your functions. If an argument fails error checking, you should throw a string describing which argument was wrong, and what went wrong. 

# Network JSON Data
You will be downloading JSON files from the following GitHub Gists:

- [people.json](https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json)
- [weather.json](https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json)
- [work.json](https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json)

For every function you write, you will download the necessary JSONs with `axios`. Here is an example of how to do so:

```javascript
async function getPeople(){
  const { data } = await axios.get('https://.../people.json')
  return data // this will be the array of people
}
```

# Functions
## getPersonById(index)
This will return the person at a specified index within the `people.json` array.

You must check:

- That the `index` exists as is of proper type
- The `index` is within bounds

```javascript
await getPersonById(42) \\ Returns: "Brew Peat"
await getPersonById(-1) \\ Throws Error
await getPersonById(1000) \\ Throws Error
await getPersonById() \\ Throws Error
```

## lexIndex(index)
For this function, you must get the sorted lexographic (aka alphabetical order) of all the people (in `people.json`) by their last name. Then, return the person's full name at the index specified by the argument `index`.

You must check:

- That the `index` exists as is of proper type
- The `index` is within bounds

```javascript
await lexIndex(2) \\ Returns: "Dermot Abberley"
await lexIndex(-1) \\ Throws Error
await lexIndex(1000) \\ Throws Error
await lexIndex() \\ Throws Error
```

## firstNameMetrics()
Using just the first names of all the people in `people.json`, collect and return the following metrics:

```json
{
  "totalLetters": 0, //sum of all the letters in all the firstNames
  "totalVowels": 0, //sum of all the vowels in all the firstNames
  "totalConsonants": 0, //sum of all the consonants in all the firstNames
  "longestName": "", // the longest firstName in the list,
  "shortestName": "", //the shortest firstName in the list
}
```

This function does not take any arguments.

The above values for those keys are provided simply to show what data type each entry should be.

## shouldTheyGoOutside(firstName, lastName)
Given a first and last name, find the person in the `people.json` array, then, if they are found, get their zip code and find the temperature for their location in `weather.json`. If the temperature is greater than or equal to 34 degrees, the person will go outside. You can assume that the weather data for the zip codes exist.

Make sure to follow the example string below exactly.

You must check:

- That both parameters exist and are of the proper type.
- That the person specified exists in the `people.json` array.

```javascript
await shouldTheyGoOutside("Scotty", "Barajaz") // Returns "Yes, Scotty should go outside."
await shouldTheyGoOutside("Calli", "Ondrasek") // Returns "No, Calli should not go outside."
await shouldTheyGoOutside() // Throws Error
await shouldTheyGoOutside("Bob") // Throws Error
await shouldTheyGoOutside("Bob", "Smith") // Throws Error
```

## whereDoTheyWork(firstName, lastName)
Given a first and last name, find the person in the `people.json` array, then, if they are found, get their SSN and find out where they work from `work.json`. Then, print their full name, company, job title and if they will be fired. You can assume that the data corresponding to a person's SSN always exists in `work.json`.

Make sure to follow the example string below exactly.

You must check:

- That both parameters exist and are of the proper type.
- That the person specified exists in the `people.json` array.

```javascript
whereDoTheyWork("Demetra", "Durrand") // Returns: "Demetra Durrand - Nuclear Power Engineer at Buzzshare. They will be fired."
whereDoTheyWork("Hank", "Tarling") // Returns: "Hank Tarling - Technical Writer at Babbleblab. They will not be fired."
whereDoTheyWork() // Throws Error
whereDoTheyWork("Bob") // Throws Error
whereDoTheyWork("Bob", "Smith") // Throws Error
```

## findTheHacker(ip)
Someone is hacking company records, and your boss found their IP Address. Use your async JS skills with `people.json` and `work.json` to find the hacker!

You must check:

- That the `ip` address is provided and is of proper type.
- That the `ip` address is listed as an IP in `people.json` 

```javascript
findTheHacker("79.222.167.180") // Returns: "Robert Herley is the hacker!"
findTheHacker("foobar") // Throws Error
findTheHacker() // Throws Error
```

# Requirements

1. Write each function in the specified file and export the function so that it may be used in other files.
2. Ensure to properly error check for different cases such as arguments existing and of the proper type as well as [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) if anything is out of bounds such as invalid array index or negative numbers for different operations. 
3. Submit all files (including `package.json`) in a zip with your name in the following format: `LastName_FirstName.zip`.
4. Make sure to save any npm packages you use to you `package.json` 
5. **DO NOT** submit a zip containing your `node_modules` folder.


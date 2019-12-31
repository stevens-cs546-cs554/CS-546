# Welcome to the first week!

## Introduction

In this course, you will be taken through building a simple web app part-by-part in a beginner friendly, Node.js environment.

The _Course Introduction_ PDF gives more details on how we will approach this.

## Course Format

We will be hosting this course online only. As such, we will us a combination of weekly discussion threads, online hosted code, and routine office hours (optional to attend) to learn the material.

You'll notice that some video files are provided, but they are growing outdated. They are to be used as a secondary reference guide; **the primary source of material is the codebase, the lecture slides, and the discussion thread**.

There are (almost) weekly assignments (labs) that cover the topic of the week.

There will be some reading for this course; I will often point you to documentation pages for you to scan through to find relevant information related to the material or assignments.

## Grading

### Grade Breakdown

| Material                    | Percent | Comments                                                                                                                                                       |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Labs                        | 40%     | Labs will be weighted equally. Labs will be given most weeks and cover the content learned that week.                                                          |
| Final Project Proposal      | 5%      | Students will form groups and propose a final project to work on throughout the semester.                                                                      |
| Database Proposal           | 5%      | Each group will submit a proposal for their database collections and schema                                                                                    |
| Final Project Presentation  | 10%     | You will give a technical presentation showcasing your project’s features and technological decisions.                                                         |
| Final Project Result & Code | 40%     | Each group will submit their project code, a readme, and a database dump to be reviewed and graded based on what was promised in their proposal and delivered. |

### Other Notes

Late assignments are graded with a **_15 point penalty per day_**. Furthermore, **_failure to submit a portion of the final project on time will result in an automatic 0 for that portion of the project_**.

Obviously, "life happens"; if you require additional time to complete an assignment or a life situation happens, let me know and I will consider an extension. The more time in advance you let me know about your extension request, the more likely I am to grant the extension.

### Assignment Instructions Are Very Explicit

Your assignments come with very explicit instructions. Things that may seem trivial to you (wording in print statements, for example) are most definitely important to the grading drivers that assist in generating your grades. If you have any questions about ambiguous instructions, please post in the discussion thread and I will clarify it and re-adjust the assignment to clarify those instructions for all students.

### Misc.

If you are having a group issue during the final project period, you must reach out to me as soon as possible; it is much easier for everyone to resolve issues early and amicably than let them destroy a group as the deadline approaches.

### Getting the Code

In our "Syllabus & Welcome" section, you will find a link to our "Course Codebase"; we will be storing our code online for easy distribution.

This link takes you to the online version of our Git repository; we'll learn more about that later, but just for a sneak peak -- a repository is a place that code is stored in that can be easily shared across many people. You can learn more about Git and get ahead using a [Git Tutorial](https://www.atlassian.com/git/tutorials) and an [interactive explanation of Git](https://try.github.io/).

This week, we'll focus on basic JavaScript syntax.

### Getting Node

The first order of business is installing [Node.js](https://nodejs.org/en/); this will be used to run all of your code this semester.

Node is a command line program; we will point it at text files we write and it will interpret the file and run the commands.

### Getting an IDE

In my heavily biased opinion, [Visual Studio Code](https://code.visualstudio.com/) is the best editor to use for this course due to its amazing [node debugger](https://code.visualstudio.com/docs/nodejs/nodejs-debugging); this allows you to step through your code line-by-line and watch the state of your variables.

## Let's Learn About JavaScript

The slides go into further information, such as what Node.js specifically is / why we use it. You will want to read through those slides and then refer back to this readme to see if there are any additional explanations.

### Running `hello.js`

After you download the course codebase, you will need to open a terminal and navigate to the course

```bash
lecture_01 > master $ ls
arrays.js    booleans.js  functions.js hello.js     numbers.js   objects.js   strings.js

lecture_01 > master $  node hello.js
Hello, world
```

The `> master` is something git specific that you need not worry about for now; the `ls` is the command to list the directory contents.

As you can see, when we run `node hello.js`, our `hello.js` file is interpreted and run, and it echoes `Hello, world` to our console; we have just made our first program!

### `let` vs. `const` vs `var`

In general, there are very few times you should be using the `var` keyword; by default, as many of your variable as possible should be `const`; sometimes, you will need to overwrite variables, where you will use `let`. There's some more details on the differences between `let` and `var` [in this article](https://philbarresi.com/understanding-functional-scope/).

### strings

In the `strings.js` file, we see many ways of making strings. We can use single and double quotes interchangeably; we can also use backticks (\` characters) characters to make template strings.

Template strings allow you to automatically add newlines to your string, and inject variables into the string.

```javascript
let string4 = `string1 is: 




${string1} after some newlines`;
```

That string will inject the contents of `string` into `string4`.

There are many string methods; you can see a list of [everything on the string prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) by default.

### booleans and equality

JavaScript has a concept of `true` and `false` that's a little different for newcomers; it practices `truthiness`.

`truthiness` is the concept of something being "basically true" or "basically false". That means that things like `true` are `true`, but also any non-zero number, or any non-empty string. That means that certain things are `false`, like `false` and `null` and `undefined`.

There are two ways of checking for equality in JavaScript; `==` and `===`. We more commonly use `===`. The `===` operator checks that both the type and value match. Getting into the habit of using `===` will help with some truthy logical mixups later on.

### numbers

Numbers in JavaScript are fairly standard; there are no `int` vs `float` numerical type issues, as they are all simply `number` typed. There is a Global Math object that will give you many arithmetic methods.

### functions

There are several ways to write functions in JavaScript:

#### Named functions

Named functions are accessible anywhere in the scope that defines them.

```javascript
function myGlobalFunction() {
  console.log("I'm a global function");
}
```

#### Anonymous functions

Anonymous functions have no function name, and are often stored as variables or passed as callbacks.

```javascript
let doubleUpAnonymous = function(x) {
  return x * 2;
};
```

#### Arrow functions

[Low level details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) on the MDN; basically, you'll simply want to use these over normal anonymous functions.

```javascript
let doubleUp = x => {
  return x * 2;
};
```

In JavaScript, most things are objects; functions are no exception. This means that we can store references to functions in variables, and that functions can return functions.

As such, many functions in JavaScript expect _callbacks_ as parameters. A _callback_ is simply a function that another function runs. For example, in `arrays.js`, you will see:

```javascript
myStringArray.forEach(value => {
  console.log(value);
});
```

The portion:

```javascript
value => {
  console.log(value);
};
```

Is an anonymous (unnamed) function that is run on each element in the array.

JavaScript also has a concept known as _closures_, which are when an 'inner function' can access variables from an 'outer' function. You can find an in depth explanation in [this article](https://philbarresi.com/closing-in-on-closure/).

### arrays

JavaScript has many "functional programming" style array methods that do not mutate the original array. Many of the most common array methods can be seen in the `arrays.js` file:

* You can traverse arrays with `forEach`
* You can transform entries into a new array of results with `map`
* You can select a subset of elements from an array based on a condition using `filter`
* You can accumulate each array entry for a final result using `reduce`

There are [many more array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) available.

## Supplementary Reading

### Fundamentals of JavaScript

I highly recommend reading the MDN (Mozilla Developer Network) page on [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) which will have additional reinforcement of this week's topics.

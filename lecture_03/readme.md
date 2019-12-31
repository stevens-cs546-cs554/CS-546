# Welcome to the Lecture 3!

## Introduction

This week, we're going to learn about asynchronous code. Asynchronous code is code that is written in a different order than it is run.

## Callbacks

Our [first folder](https://github.com/Stevens-CS546/CS-546/tree/master/Lecture%20Code/lecture_03/callbacks) shows us asynchronous code in callback form, the most raw form of asynchronous programming.

Let's focus on the [app.js](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_03/callbacks/app.js) `fs.readFile` line (around line 25).

Here, we see a great example of asynchronous code -- we pass arguments to the `fs.readFile` function, and then pass a callback to it: `function(fileReadError, data) { /* code here */ }`.

The next line of code you may think that runs is:

```
if (fileReadError) {
    throw fileReadError;
}
```

However, `fs.readFile` is asynchronous -- that means that it starts logic, and then passes the result when completed to a callback function. Rather than block an entire node process doing expensive tasks like file I/O, it accomplishes the file I/O a little bit at a time so other code can execute in the mean while. The entire callback is run after the file is fully read.

## Promises

Callback based code is hard, and so promises were popularized as an abstraction on top of asynchronous operations to make handling them easier.

[The second folder](https://github.com/Stevens-CS546/CS-546/tree/master/Lecture%20Code/lecture_03/promises) demonstrates these promises. Promises are structures that represent asynchronous operations, including their state (resolved, pending, or rejected) and what should happen when that state changes.

In [app.js](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_03/promises/app.js) you'll see that we start using function names that end with `Async`; how we generate those `Async` methods is covered a little below, but just know that traditionally when a method name ends with `Async` it returns a promise.

Promises have a method named `then` on them, that take callbacks that represent what happens after the operation completes. So when we call `prompt.getAsync([getFileOperation])` we get a promise that will either resolve (complete successfully after an unknown amount of time), reject (fail after an unknown amount of time), or stay pending (for a time, or potentially forever; we don't have the [halting problem](https://en.wikipedia.org/wiki/Halting_problem) figured out just yet).

When `then` is called on a promise, it returns a new promise that is the result of the callback returned to `then`. For example:

```
const promiseThatReturnsTen = Promise.resolve(10);

const promiseThatReturnsTwenty = promiseThatReturnsTen.then(function(result) {
    // result is 10
    return result * 2;
});

const promiseThatReturnsFifty = promiseThatReturnsTwenty.then(function(result) {
    return result * 2.5;
});

// Logs 50
promiseThatReturnsFifty.then(console.log)
```

There are more details covered in the lecture slides.

### Turning Callback Code into Promise Based Code

We can use the node module [bluebird](http://bluebirdjs.com) to take async operations that take callbacks and create promise based versions.

To promisify one method, you would use the [bluebird.promisify](http://bluebirdjs.com/docs/api/promise.promisify.html) method; to promisify all methods on an object and create clones of the methods that are suffixed with the word `Async`. This method is the [promisifyAll](http://bluebirdjs.com/docs/api/promise.promisifyall.html) method, and returns a new object.

## Async / Await

Recent versions of Node have added two very important convenience keywords that allow you to unravel promises automatically: `async function` notation, which makes a function **always** return a promise, and `await` which can be used inside of async functions.

Inside of async functions, we can call `await` on a promise; this will pause the function's evaluation until the promise is fulfilled. If the promise is rejected, the function will throw instead (meaning we can use try/catch blocks around awaited promises).

Let's take a look at [the async/await folder](https://github.com/Stevens-CS546/CS-546/tree/master/Lecture%20Code/lecture_03/async-await) this week. You'll see we mark that function `main` as an `async` function so we can use the `await` keyword inside it. From there we can unwrap those promises automatically, such as using `const thisIsAPromise = fs.readFileAsync(fileName, "utf-8");`

## Assignment Help

* The lecture slides explains how to throw errors properly, and check for bounds
* The lecture slides and code demonstrate how to handle error checking in `async/await` situations
* Essentially all promise based functions in the course should use `async/await`
* You should make sure to name your files and their exported function **precisely** as specified

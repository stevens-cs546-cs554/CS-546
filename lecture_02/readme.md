# Welcome to the Lecture 2!

## Introduction

This week, we will cover the fundamental structure of a node application.

## What is a Node Application?

In Node, applications are just files that are linked together through use of `require`. When you run `node` on a file, such as `node index.js` then the node process opens the `index.js` file; each file that is referenced via the `require` command is then run; these files could require other files, in turn.

## Dependencies

Many weeks, we will use dependencies; these will be series of files published online through [npm](http://npmjs.com/) that we use so that we don't have to reconstruct every aspect of a project.

# This Week's Code

## Our First Module

This week we have a few folders, one of which is primarily about [using modules](https://github.com/Stevens-CS546/CS-546/tree/master/Lecture%20Code/lecture_02/calculator_module_example).

[Modules](https://nodejs.org/api/modules.html#modules_modules) are files, and these files can export data from them. This exported data can be any data in JavaScript.

Modules are used to create self-contained portions of logic. In this folder, we have a file that contains its own logic for calculator methods, and another (`app.js`) that utilizes those methods. Modules are designed to be used across any number of files.

We have one file acting as a module, [calculator.js](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_02/calculator_module_example/calculator.js). This file exports an object, which contains the logic needed to make calculations.

Another file, [app.js](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_02/calculator_module_example/app.js) utilizes the methods exported in `calculator.js`.

## Our first 'app'

Our second folder focuses on the concept of an '_app_', which is only [slightly different](https://github.com/Stevens-CS546/CS-546/tree/master/Lecture%20Code/lecture_02/calculator_app_example) than our module example. In this case, we're using an _app_ to mean a piece of software that uses multiple different packages together to create something non-trivial.

In our case, we use the [app.js](https://github.com/Stevens-CS546/CS-546/blob/master/Lecture%20Code/lecture_02/calculator_app_example/app.js) file to utilize the [prompt](https://www.npmjs.com/package/prompt) package to query the user for input.

Prompt contains a lot of asynchronous code, which is something we're seeing for the first time.

## Asynchronous Code

When we see the [`prompt.get`](https://github.com/Stevens-CS546/CS-546/blob/e5a75bf6190920126e9ce6a484f292e15698e285/Lecture%20Code/lecture_02/calculator_app_example/app.js#L51) line, you'll notice that we pass a `callback` to the `prompt.get` method.

This callback, from line 55 to 108, runs after line `111`. This is because it relies on a fundamentally asynchronous operation; waiting on user input. User input, file input, etc. takes a very long time. We will learn more about asynchronous code next lecture.

## Assignment Help

* The lecture slide explains how to throw errors properly, and check for bounds.
* You should make sure to name your files and their exported function **precisely** as specified

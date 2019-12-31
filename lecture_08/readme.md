# Welcome to the Lecture 5!

## Introduction

This week, we're going to diverge a little bit from backend development, and make our first web pages! We're also going to learn a little bit about how we can successfully develop in a collaborative environment.

## Collaborative Programming

Coding with other people is hard, but we've got some tools and some strategies that make it a little easier. Oftentimes, we want to use a version control software such as Git and a website such as Github to manage our code, and some team strategies to distribute our workload.

### Git Commands

Our lecture slides this week cover Git conceptually, so we're going to just list off some commands here.

#### Initialize a git repository with `git init .`

When you are starting a project of some sort (one HW, a personal project, etc.) you will navigate in your terminal to the folder of the project and initialize an empty git repository using `git init .`; this adds a hidden folder, `.git`, in that folder and sets up repository information.

#### Stage changes using `git add {filename}`

When you make changes to a file and you want those included in the next commit (think, snapshot of the code at a point in time) then you would stage that file. To stage, you issue the command `git add {filename}`.

#### Unstage changes using `git remove {filename}`

If you want to exclude a changed file from the commit, simply using `git remote {filename}`.

#### Perform a commit using `git commit -m "{Message}"`

When it comes time to make that commit (the snapshot of the code at a point in time), you'll want to make a commit using `git commit -m "Message Goes Here"`. This makes a commit with the supplied message; you can then go back to the codebase at this commit later on.

#### Undo changes to a file from the last commit using `git checkout {filename}`

Say you've made a commit, change a file, and realize that your strategy for these changes is wrong and you want to start over; you would wipe out changes to that file using `git checkout {filename}` to wipe out the changes to that file.

#### Start a new branch using `git checkout -b {my_new_branch_name}`

Our git repository can have many branches, which are sequences of commits in a particular order. Branches are often used when you want to start developing a new feature and dont want to interfere with your existing code. To make a new branch off the current branch (for example, when on the `master` branch), you would issue the command `git checkout -b new_branch_name`, and automatically be placed on the new branch.

#### Change branches using `git checkout {branch_name}`

If you need to go from your current branch to an existing branch, you would simply issue the command `git checkout {branch_name}`

#### Pull down changes from the original repository online using `git pull origin {branch_to_pull_from}`

Say you are on a branch, `development` locally and want changes from the online repository's `master` branch; you would type `git pull origin master` and pull in those changes.

#### Push up changes using `git push origin {branch}`

Say you are working on your feature branch, `feature/css` to add CSS to your website; you would want to store that code on the online repository as well using `git push origin feature/css` to push that code online.

## Intro to HTML

HTML is a way of describing content in a way that makes semantical sense. For now, we ignore how ugly it will look and focus on making the markup describe the content precisely and meaningfully.

### A Basic HTML Skeleton

We will always start HTML documents with the following:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Page Title Goes Here</title>
  </head>
  <body>
    <!-- page content -->
  </body>
</html>
```

### Adding Meaningful Content

Our lecture slides give many tags and examples of how to use them properly, so for now we're going to just provide a simple example of an HTML document that acts as an `about the professor` page.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>About Phil</title>
  </head>
  <body>
    <h1>I am Phil</h1>
    <header>
      <nav>
        <ul>
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
          <li>
            <a href="store.html">Store</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <article>
        <h2>I am an adjunct instructor at Stevens</h2>
        <p>I really enjoy teaching. It is my favorite thing to do for a living.</p>
      </article>
    </main>
  </body>
</html>
```

### Validating our HTML

[The HTML Validator](https://validator.w3.org/#validate_by_input) is **extremely** important to use on all of our HTML in this course. You will want to get in the habit of taking the source from the browser's rendering, since our server will start generating our HTML in the coming weeks.

In most browsers, to view the source of the current page, you simply have to hit `ctrl+u` or `cmd+u` in order to have a window open up with the source code of the current web page. From there, you simply need to copy and paste the entire source code into the validator and check for any errors, and fix them accordingly.

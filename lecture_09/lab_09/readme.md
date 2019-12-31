# CS-546 Lab 9

## Prime Numbers

For this lab, you will be using HTML, CSS, and JavaScript on the user's browser to make a simple Prime Number checker!

You will create an express server with a single page at the location `/` that will provide the user with a web page to allow them to check if a number is a prime number. **The entire checking operation will be done using client-side JavaScript**.

## The Server

**Your server this week should not check for prime numbers! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the prime number checking page.**

### `/` The Whole Prime Number Checker

Your page should have a few basic user interface elements:

- A header tag, with an h1 naming your site, with a title for your page
- A footer with your name, student ID, and any other info about yourself you wish to include
- A single ordered list with an id of `attempts`. All attempted to numbers with all the numbers you have checked so far (until you refresh the page) will appear in this list as list items. Numbers that are prime will be colored in _green_, while numbers that are not will be colored in _red_. You must use the CSS classes below to color these items.
- An example that would be displayed in LI of the list:
  - "<span style="color: #00e676;">**2 is a prime number**</span>"
  - "**<span style="color: #ff3d00;">4 is NOT a prime number</span>**"

Your page will have a form with the following:

- A label with a `for` attribute referencing your input
- A input with a `name` and `type` of `number`
- A button to submit the form

Using JavaScript in your browser only, you will listen for the form's `submit` event; when the form is submitted, you will:

- Get the value of the input text element
- Determine whether or not the number is a prime number
- Add a list item to the `#attempts` list of numbers you have checked. This list item should have a class of `is-prime` if it is a prime number, or `not-prime` it is not.

If the user does not have a value for the input when they submit, you should not continue the prime number checking and instead should inform them of an error somehow.

## The style

You will style your page using at least 10 CSS selectors for general CSS styling. You will place the CSS in its own file.

You _must_ style the `is-prime` class to make text have a `color` of `<span>#00E676</span>` and `not-prime` class to make text have a color of `<span>#FF3D00</span>`.

## References and Packages

Basic CSS info can easily be referenced in the [MDN CSS tutorial](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started).

## Requirements

1.  All previous requirements still apply.
2.  You **must remember** to update your package.json file to set `app.js` as your starting script!
3.  [Your HTML must be valid](https://validator.w3.org/#validate_by_input) or you will lose points on the assignment.
4.  Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as `i`, `b`, `font`, `center`, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
5.  **You can be as creative as you'd like to fulfill front-end requirements**; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
6.  **Your client side JavaScript must be in its own file and referenced from the HTML accordingly**.
7.  All inputs must be properly labeled!

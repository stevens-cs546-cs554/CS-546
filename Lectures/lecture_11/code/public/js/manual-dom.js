// Remember, we're in a browser: prevent global variables from happening
(function() {
  // Let's store a reference to our h1#the-heading
  var heading = document.getElementById("the-heading");

  // We can VERY safetly and efficiently change the text content by making new nodes and assigning them like so:
  heading.textContent = document.createTextNode(
    "The DOM Demonstration"
  ).textContent;

  // We could have set InnerHTML, but that requires parsing and then updating!

  var listOfItems = document.getElementById("my-list");

  // We can log these DOM elements to see them in our console
  console.log(listOfItems);

  // listOfItems.children is NOT an array, but has a .length property
  for (var i = 0; i < listOfItems.children.length; i++) {
    var child = listOfItems.children.item(i);

    // We can make groups in a console easily
    console.group(child.textContent);

    // get width and height:
    console.log(child.offsetWidth);
    console.log(child.offsetHeight);

    console.groupEnd();
  }

  var mainElement = document.getElementsByTagName("main").item(0);

  var newForm = document.createElement("form");

  console.group("Form Creation");
  var numericalInput = document.createElement("input");

  // As an input element, we have access to some input-specific attributes such as `value` and `type` and `required`
  numericalInput.type = "number";
  numericalInput.required = true;

  // Now that we set the type to number, we can set numerical input specific attribetus like max and min
  numericalInput.max = 25;
  numericalInput.min = -20;

  // now we an set a value
  numericalInput.value = 12;

  // Unfortunately, this will still be a string
  // console.log(numericalInput.value);

  // Now we can add it to the new form
  newForm.appendChild(numericalInput);

  var submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit this form!";

  newForm.appendChild(submitButton);

  newForm.addEventListener("submit", function(event) {
    console.log("form is being submitted");
    event.preventDefault();
    alert("You submitted a value of " + numericalInput.value);
  });

  mainElement.appendChild(newForm);

  console.groupEnd();

  // Let's set something document related, too
  document.title = "Manipulating a form in plain DOM API";
})();

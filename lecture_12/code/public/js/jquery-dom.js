var hiClass = "Hello Instructor";

// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function($) {
  // Let's store a reference to our h1#the-heading
  var heading = $("#the-heading"),
    resultAlert = $("#result-alert");

  heading.text("The DOM Demonstration");

  // We could have set InnerHTML, but that requires parsing and then updating!

  var listOfItems = $("#my-list");
  var itemsInList = listOfItems.children();

  // We can log these jQuery elements to see them in our console
  console.log(listOfItems);
  console.log(itemsInList);

  itemsInList.each(function(index, child) {
    // child will be a normal DOM element; but since we have it's reference,
    // we can easily wrap it into a jQuery element
    var jqChild = $(child);
    console.log("========");

    // We can make groups in a console easily
    console.group(jqChild.text());

    // get width and height:
    console.log(jqChild.width());
    console.log(jqChild.height());

    console.groupEnd();
  });

  var mainElement = $("main");

  // We can just write HTML to make new elements
  var newForm = $("<form></form>");

  console.group("Form Creation");

  // We can easily setup our new element with just strings
  var numericalInput = $(
    "<input type='number' required='' max='25' min='-20' value='12' />"
  );

  // Still a string :(
  console.log(numericalInput.val());

  numericalInput.on("change", function() {
    resultAlert.hide();
  });

  var submitButton = $("<input type='submit' />");
  submitButton.val("Submit this form!");

  // Now we can add it to the new form
  newForm.append(numericalInput, submitButton);

  newForm.submit(function(event) {
    resultAlert.text("Computing your input squared");
    resultAlert.show();

    var val = parseInt(numericalInput.val());

    event.preventDefault();

    setTimeout(function() {
      resultAlert.text("You submitted a value of " + val * val);
    }, 250);
  });

  mainElement.append(newForm);

  console.groupEnd();

  // Let's set something document related, too
  document.title = "Manipulating a form in jQuery API";
})(jQuery); // jQuery is exported as $ and jQuery

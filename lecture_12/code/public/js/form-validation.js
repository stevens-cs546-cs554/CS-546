// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function($) {
  var firstInput = $("#number-one");
  var secondInput = $("#number-two");
  var errorAlert = $("#calculator-error");
  var resultAlert = $("#calculator-result");
  var bothAlerts = errorAlert.add(resultAlert);
  var addButton = $("#add");
  var subtractButton = $("#subtract");
  var multiplyButton = $("#multiply");
  var divideButton = $("#divide");

  function extractInputs() {
    // first, we check if there are values
    var firstValue = firstInput.val();
    if (firstValue === undefined || firstValue === "" || firstValue === null) {
      throw "No first value provided";
    }

    var secondValue = secondInput.val();
    if (
      secondValue === undefined ||
      secondValue === "" ||
      secondValue === null
    ) {
      throw "No second value provided";
    }

    var firstNumber = parseInt(firstValue);
    var secondNumber = parseInt(secondValue);

    if (isNaN(firstNumber)) {
      throw "First value is not a number";
    }

    if (isNaN(secondNumber)) {
      throw "Second value is not a number";
    }

    // then, we check if they are numbers
    // we cannot check for things like dividing by 0 because we don't know which operation to do

    return { firstNumber: firstNumber, secondNumber: secondNumber };
  }

  addButton.click(function() {
    bothAlerts.addClass("hidden");
    bothAlerts.text("");

    try {
      var numbers = extractInputs();
      var result = numbers.firstNumber + numbers.secondNumber;

      resultAlert.text("Adding these numbers gives you " + result);
      resultAlert.removeClass("hidden");
    } catch (error) {
      errorAlert.text(error);
      errorAlert.removeClass("hidden");
    }
  });

  subtractButton.click(function() {
    bothAlerts.addClass("hidden");
    bothAlerts.text("");

    try {
      var numbers = extractInputs();
      var result = numbers.firstNumber - numbers.secondNumber;

      resultAlert.text("Subtracting these numbers gives you " + result);
      resultAlert.removeClass("hidden");
    } catch (error) {
      errorAlert.text(error);
      errorAlert.removeClass("hidden");
    }
  });

  multiplyButton.click(function() {
    bothAlerts.addClass("hidden");
    bothAlerts.text("");

    try {
      var numbers = extractInputs();
      var result = numbers.firstNumber * numbers.secondNumber;

      resultAlert.text("Multiplying these numbers gives you " + result);
      resultAlert.removeClass("hidden");
    } catch (error) {
      errorAlert.text(error);
      errorAlert.removeClass("hidden");
    }
  });

  divideButton.click(function() {
    bothAlerts.addClass("hidden");
    bothAlerts.text("");

    try {
      var numbers = extractInputs();
      if (numbers.secondNumber === 0) throw "You cannot divide by 0";

      var result = numbers.firstNumber / numbers.secondNumber;

      resultAlert.text("Adding these numbers gives you " + result);
      resultAlert.removeClass("hidden");
    } catch (error) {
      errorAlert.text(error);
      errorAlert.removeClass("hidden");
    }
  });
})(jQuery);
// jQuery is exported as $ and jQuery

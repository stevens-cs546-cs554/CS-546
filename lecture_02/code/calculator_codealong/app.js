const calculator = require("./calculator");
const prompt = require("prompt");

function getInfo() {
  prompt.start();

  const operation = {
    name: "operation",
    description: "Which operation do you want to do?",
    type: "string", // Specify the type of input to expect.
    default: "add", // Default value to use if no value is entered.
    required: true // If true, value entered must be non-empty.
  };

  const num1Prompt = {
    name: "num1",
    description: "What is the first number?",
    type: "number",
    required: true
  };

  const num2Prompt = {
    name: "num2",
    description: "What is the second number?",
    type: "number",
    required: true
  };

  const quitPrompt = {
    name: "quit",
    description: "Do you want to quit after this operation?",
    type: "boolean",
    required: true
  };

  function stringToOperation(str) {
    if (!str) return "add";

    if (str === "*" || str === "multiply") return "multiply";

    if (str === "/" || str === "divide") return "divide";

    if (str === "-" || str === "subtract") return "subtract";

    return "add";
  }

  //
  // Get two properties from the user: username and email
  //
  prompt.get([operation, num1Prompt, num2Prompt, quitPrompt], function(
    err,
    result
  ) {
    if (result) {
      let num1 = result.num1;

      if (isNaN(num1)) {
        console.log("First number is not a number");
        getInfo();
        return;
      }

      let num2 = result.num2;
      if (isNaN(num2)) {
        console.log("Second number is not a number");
        getInfo();
        return;
      }

      let quit = result.quit;
      let operation = stringToOperation(result.operation);

      let operationFunction = undefined;

      switch (operation) {
        case "multiply":
          operationFunction = calculator.multiplyTwoNumbers;
          break;
        case "subtract":
          operationFunction = calculator.subtractTwoNumbers;
          break;
        case "divide":
          operationFunction = calculator.divideTwoNumbers;
          break;
        case "add":
          operationFunction = calculator.addTwoNumbers;
          break;
      }

      let numericalResult = operationFunction(num1, num2);

      console.log(
        `when you ${operation} ${num1} with ${num2} you get ${numericalResult}`
      );

      if (!quit) {
        getInfo();
      }
    } else if (err) {
      console.error(err);
    }
  });
}

getInfo();

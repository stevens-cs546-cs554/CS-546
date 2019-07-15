// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function($) {
  var closeButton = $("#close-window").hide();

  $("#open-new-window").click(function() {
    // The first parameter is the URL to open
    // the second is the target. _blank will open in a new tab / window
    // If not provided, it will just open in the current tab.
    var newWindow = window.open("http://google.com", "_blank");

    closeButton.click(function() {
      // We can only close windows we opened
      newWindow.close();
      closeButton.hide();
    });

    closeButton.show();
  });

  var timeoutResult = $("#the-timeout .result");

  // Timeouts are based on MS; they return an ID so that we can cancel these things
  var timeoutId = undefined;

  var startButton = $("#start-timeout");
  var cancelButton = $("#cancel-timeout");

  startButton.click(function() {
    startButton.hide();
    cancelButton.show();

    timeoutId = window.setTimeout(function() {
      timeoutResult.text("Five seconds have passed");
      cancelButton.hide();
    }, 5000);
  });

  cancelButton.click(function() {
    if (timeoutId === undefined) return;
    startButton.show();
    cancelButton.hide();

    // let's cancel that timeout
    window.clearTimeout(timeoutId);
    timeoutResult.text("We canceled the timeout");
  });

  var currentIterations = 0;
  var intervalResult = $("#the-interval .result");

  var intervalId = window.setInterval(function() {
    var iteration = ++currentIterations;
    var message =
      iteration === 1
        ? iteration + " interval has now occurred"
        : iteration + " intervals have occurred";

    intervalResult.text(message);

    if (iteration === 5) {
      window.clearInterval(intervalId);
    }
  }, 1500);

  // Let's set something document related, too
  document.title = "Some small window things";
})(jQuery); // jQuery is exported as $ and jQuery

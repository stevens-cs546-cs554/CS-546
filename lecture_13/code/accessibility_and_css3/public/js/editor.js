(function($) {
  var editor = $(".editor"),
    editorEle = editor[0];

  editor.keydown(function(event) {
    if (event.ctrlKey) {
      // We've hit the control key, let's see if we're also pressing on b, u, or i
      var element = $(
        getSelection().getRangeAt(0).commonAncestorContainer.parentElement
      );
      if (event.which === 66) {
        // this means the user hit ctrl+b
        element.toggleClass("strong");
      } else if (event.which === 85) {
        // user hit ctrl + u
        element.toggleClass("underlined");
      } else if (event.which === 73) {
        element.toggleClass("emphasized");
        // user hit ctrl + i
      }

      // If they hit anything else, just ignore it!
    }
  });
})(window.jQuery);

window.createMathSubtractNode = (function() {
  "use strict";

  function createMathSubtractNode(context, a, b) {
    var c = context.createGain();

    b.connect(c);

    c.gain.value = -1;

    return createMathAddNode(context, a, c);
  }

  return createMathSubtractNode;
})();

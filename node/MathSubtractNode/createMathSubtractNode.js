window.createMathSubtractNode = (function() {
  "use strict";

  function createMathSubtractNode(context, a, b) {
    var c = createMathInvertNode(context, b);

    return createMathAddNode(context, a, c);
  }

  return createMathSubtractNode;
})();

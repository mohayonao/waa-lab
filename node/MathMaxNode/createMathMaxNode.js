window.createMathMaxNode = (function() {
  "use strict";

  function createMathMaxNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);
    var a0 = createIsPositiveNode(context, c);
    var a1 = createMathMultiplyNode(context, a, a0);
    var b0 = createIsNegativeNode(context, c);
    var b1 = createMathMultiplyNode(context, b, b0);

    return createMathAddNode(context, a1, b1);
  }

  return createMathMaxNode;
})();

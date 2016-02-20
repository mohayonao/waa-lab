window.createMathAbsNode = (function() {
  "use strict";

  function createMathAbsNode(context, a) {
    var b = createMathSignNode(context, a);

    return createMathMultiplyNode(context, a, b);
  }

  return createMathAbsNode;
})();

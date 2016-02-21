window.createCompareGreaterThanNode = (function() {
  "use strict";

  function createCompareGreaterThanNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);

    return createIsPositiveNode(context, c);
  }

  return createCompareGreaterThanNode;
})();

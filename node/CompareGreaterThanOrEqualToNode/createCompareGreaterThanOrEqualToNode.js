window.createCompareGreaterThanOrEqualToNode = (function() {
  "use strict";

  function createCompareGreaterThanOrEqualToNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);

    return createIsPositiveOrZeroNode(context, c);
  }

  return createCompareGreaterThanOrEqualToNode;
})();

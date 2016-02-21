window.createCompareLessThanNode = (function() {
  "use strict";

  function createCompareLessThanNode(context, a, b) {
    var c = createMathSubtractNode(context, b, a);

    return createIsPositiveNode(context, c);
  }

  return createCompareLessThanNode;
})();

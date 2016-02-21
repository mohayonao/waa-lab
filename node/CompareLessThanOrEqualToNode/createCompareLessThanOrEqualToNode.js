window.createCompareLessThanOrEqualToNode = (function() {
  "use strict";

  function createCompareLessThanOrEqualToNode(context, a, b) {
    var c = createMathSubtractNode(context, b, a);

    return createIsPositiveOrZeroNode(context, c);
  }

  return createCompareLessThanOrEqualToNode;
})();

window.createCompareEqualToNode = (function() {
  "use strict";

  function createCompareEqualToNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);

    return createIsZeroNode(context, c);
  }

  return createCompareEqualToNode;
})();

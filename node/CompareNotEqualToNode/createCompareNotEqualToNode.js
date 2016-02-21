window.createCompareNotEqualToNode = (function() {
  "use strict";

  function createCompareNotEqualToNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);

    return createIsNotZeroNode(context, c);
  }

  return createCompareNotEqualToNode;
})();

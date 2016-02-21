window.createMathEqualToNode = (function() {
  "use strict";

  function createMathEqualToNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);

    return createIsZeroNode(context, c);
  }

  return createMathEqualToNode;
})();

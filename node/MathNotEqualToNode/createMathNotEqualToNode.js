window.createMathNotEqualToNode = (function() {
  "use strict";

  function createMathNotEqualToNode(context, a, b) {
    var c = createMathSubtractNode(context, a, b);

    return createIsNotZeroNode(context, c);
  }

  return createMathNotEqualToNode;
})();

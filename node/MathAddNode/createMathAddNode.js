window.createMathAddNode = (function() {
  "use strict";

  function createMathAddNode(context, a, b) {
    var x = context.createGain();

    a.connect(x);
    b.connect(x);

    return x;
  }

  return createMathAddNode;
})();

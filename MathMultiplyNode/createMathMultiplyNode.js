window.createMathMultiplyNode = (function() {
  "use strict";

  function createMathMultiplyNode(context, a, b) {
    var c = context.createGain();

    a.connect(c);
    b.connect(c.gain);

    c.gain.value = 0;

    return c;
  }

  return createMathMultiplyNode;
})();

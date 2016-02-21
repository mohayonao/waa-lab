window.createMathInvertNode = (function() {
  "use strict";

  function createMathInvertNode(context, a) {
    var b = context.createGain();

    b.gain.value = -1;

    a.connect(b);

    return b;
  }

  return createMathInvertNode;
})();

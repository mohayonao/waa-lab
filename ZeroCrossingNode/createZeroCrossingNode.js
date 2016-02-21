window.createZeroCrossingNode = (function() {
  "use strict";


  function createZeroCrossingNode(context, a) {
    var b = createMathSignNode(context, a);
    var c = createDelay1Node(context, b);
    var d = createMathSignNode(context, c);
    var e = createMathSubtractNode(context, b, d);

    return createIsNotZeroNode(context, e);
  }

  function createDelay1Node(context, a) {
    var delayTime = 1 / context.sampleRate;
    var b = context.createDelay(delayTime);

    a.connect(b);

    b.delayTime.value = delayTime;

    return b;
  }

  return createZeroCrossingNode;
})();

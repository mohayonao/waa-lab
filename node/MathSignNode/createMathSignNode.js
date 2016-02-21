window.createMathSignNode = (function() {
  "use strict";

  var EPSILON = 1e-4;
  var ws = createMathSignShaperCurve(65536);

  function createMathSignNode(context, a) {
    return createWaveShaperNode(context, ws, a);
  }

  function createMathSignShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = Math.abs(x) < EPSILON ? 0 : x < 0 ? -1 : +1;
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  return createMathSignNode;
})();

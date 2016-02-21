window.createIsPositiveNode = (function() {
  "use strict";

  var EPSILON = 1e-4;
  var ws = createIsPositiveShaperCurve(65536);

  function createIsPositiveNode(context, a) {
    return createWaveShaperNode(context, ws, a);
  }

  function createIsPositiveShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = x > EPSILON ? 1 : 0;
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  return createIsPositiveNode;
})();

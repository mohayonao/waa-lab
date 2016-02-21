window.createIsZeroNode = (function() {
  "use strict";

  var EPSILON = 1e-4;
  var ws1 = createIsZeroShaperCurve(65536);
  var ws2 = createFixedCurve(2048);

  function createIsZeroNode(context, a) {
    var b = createWaveShaperNode(context, ws1, a);

    return createWaveShaperNode(context, ws2, b);
  }

  function createIsZeroShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = Math.abs(x) <= EPSILON ? 1 : 0;
    }

    return curve;
  }

  function createFixedCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = x > 0.99 ? +1 : 0;
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  return createIsZeroNode;
})();

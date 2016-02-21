window.createIsNotZeroNode = (function() {
  "use strict";

  var EPSILON = 1e-4;
  var ws1 = createIsNotZeroShaperCurve(65536);
  var ws2 = createFixedCurve(2048);

  function createIsNotZeroNode(context, a) {
    var b = createWaveShaperNode(context, ws1, a);

    return createWaveShaperNode(context, ws2, b);
  }

  function createIsNotZeroShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = Math.abs(x) <= EPSILON ? 0 : 1;
    }

    return curve;
  }

  function createFixedCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = x > 0.01 ? +1 : 0;
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  return createIsNotZeroNode;
})();

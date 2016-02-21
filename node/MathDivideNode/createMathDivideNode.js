window.createMathDivideNode = (function() {
  "use strict";

  var MAX_VALUE = 5000;
  var ws = createInverseShaperCurve(65536);

  function createMathDivideNode(context, a, b) {
    var c = createScaleGainNode(context, b, 1 / MAX_VALUE);
    var d = createWaveShaperNode(context, ws, c);

    return createMathMultiplyNode(context, a, d);
  }

  function shapeFn(value) {
    if (Math.fround(value) === 0) {
      return 1;
    }
    return 1 / (value * MAX_VALUE);
  }

  function createInverseShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = shapeFn(x);
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  function createScaleGainNode(context, a, amp) {
    var b = context.createGain();

    b.gain.value = amp;

    a.connect(b);

    return b;
  }

  return createMathDivideNode;
})();

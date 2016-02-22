window.createSwitchNode = (function() {
  "use strict";

  var ws1 = createSelectAShaperCurve(8192);
  var ws2 = createSelectBShaperCurve(8192);

  function createSwitchNode(context, a, b, c) {
    var a0 = createWaveShaperNode(context, ws1, c);
    var b0 = createWaveShaperNode(context, ws2, c);
    var a1 = createMathMultiplyNode(context, a, a0);
    var b1 = createMathMultiplyNode(context, b, b0);

    return createMathAddNode(context, a1, b1);
  }

  function createSelectAShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = x > 0 ? 1 : 0;
    }

    return curve;
  }

  function createSelectBShaperCurve(length) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      var x = (i / length) * 2 - 1;

      curve[i] = x < 0 ? 1 : 0;
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  return createSwitchNode;
})();

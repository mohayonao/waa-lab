window.createMathMaxNode = (function() {
  "use strict";

  var ws1 = createMathMaxShaperCurve(8192, 0, 1);
  var ws2 = createMathMaxShaperCurve(8192, 1, 0);

  function createMathMaxNode(context, a, b) {
    var expr = {};

    expr["a-b"] = createMathSubtractNode(context, a, b);

    expr["ws1(a-b)"] = createWaveShaperNode(context, ws1, expr["a-b"]);
    expr["a*ws1(a-b)"] = createMathMultiplyNode(context, a, expr["ws1(a-b)"]);

    expr["ws2(a-b)"] = createWaveShaperNode(context, ws2, expr["a-b"]);
    expr["b*ws2(a-b)"] = createMathMultiplyNode(context, b, expr["ws2(a-b)"]);

    expr["a*ws1(a-b)+b*ws2(a-b)"] = createMathAddNode(context, expr["a*ws1(a-b)"], expr["b*ws2(a-b)"]);

    return expr["a*ws1(a-b)+b*ws2(a-b)"];
  }

  function createMathMaxShaperCurve(length, a, b) {
    var curve = new Float32Array(length);

    for (var i = 0; i < length; i++) {
      curve[i] = i < (length * 0.5) ? a : b;
    }

    return curve;
  }

  function createWaveShaperNode(context, curve, a) {
    var b = context.createWaveShaper();

    b.curve = curve;

    a.connect(b);

    return b;
  }

  return createMathMaxNode;
})();

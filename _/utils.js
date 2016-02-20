window.utils = (function() {
  "use strict";

  var utils = {};

  function SignalPlotter(context, opts) {
    opts = opts || {};

    this.context = context;
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.ylim = opts.ylim || [ -1, +1 ];
    this.yticks = opts.yticks || [ -1, -0.5, 0, +0.5, +1 ];

    this._drawScale();
  }

  SignalPlotter.prototype._drawScale = function() {
    var context = this.context;
    var x1 = 40, x2 = this.width;
    var y1 = 10, y2 = this.height - 10;
    var ylim = this.ylim;
    var hasDot = this.yticks.some(function(x) {
      return Math.floor(x) !== x;
    });

    context.save();

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, this.width, this.height);

    context.fillStyle = "#fafafa";
    context.fillRect(40, 10, this.width, this.height - 20);

    context.fillStyle = "#7f8c8d";
    context.strokeStyle = "#e0e0e0"
    context.font = "12px monospace";

    this.yticks.forEach(function(value) {
      var text = value.toFixed(hasDot ? 1 : 0);
      var m = context.measureText(text).width;
      var y = Math.floor(linlin(value, ylim[1], ylim[0], y1, y2)) + 0.5;

      context.beginPath();
      context.moveTo(x1, y);
      context.lineTo(x2, y);
      context.stroke();

      context.fillText(value.toFixed(1), x1 - 5 - m, y + 4)
    });

    context.restore();
  };

  SignalPlotter.prototype.plot = function(signal, opts) {
    var context = this.context;
    var x1 = 40, x2 = this.width;
    var y1 = 10, y2 = this.height - 10;
    var ylim = this.ylim;

    context.save();

    Object.keys(opts).forEach(function(key) {
      context[key] = opts[key];
    })

    context.beginPath();

    for (var i = 0; i < signal.length; i++) {
      var x = linlin(i, 0, signal.length, x1, x2);
      var y = linlin(signal[i], ylim[1], ylim[0], y1, y2);

      context.lineTo(x, y);
    }

    context.stroke();

    context.restore();
  };

  function linlin(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
  }

  function captureSignal(fn, duration, callback) {
    var sampleRate = 44100;
    var length = Math.floor(duration * sampleRate);
    var context = new OfflineAudioContext(1, length, sampleRate);

    fn(context).connect(context.destination);

    context.oncomplete = function(e) {
      callback(e.renderedBuffer.getChannelData(0));
    };

    context.startRendering();
  }

  utils.SignalPlotter = SignalPlotter;
  utils.linlin = linlin;
  utils.captureSignal = captureSignal;

  return utils;
})();

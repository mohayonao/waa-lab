(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var PseudoAudioParam = require("pseudo-audio-param");

function TimeStretchBufferNode(context, buffer, opts) {
  opts = opts || {};

  this.context = context;
  this.buffer = buffer;
  this.rate = new PseudoAudioParam(1);
  this.loop = false;
  this.loopStart = 0;
  this.loopEnd = buffer.duration;

  this._windowTime = opts.windowSize || 0.1;
  this._windowTime = Math.max(0.05, Math.min(+this._windowTime || 0, 0.2));
  this._windowCurve = createWindowCurve(1024);
  this._output = context.createGain();
  this._startTime = -Infinity;
  this._stopTime = Infinity;
  this._remainTime = Infinity;
  this._playbackTime = 0;
  this._offsetTime = 0;
  this._chunks = [];
}

TimeStretchBufferNode.prototype.start = function(when, offsetTime, duration) {
  if (typeof duration === "undefined") {
    duration = Infinity;
  }

  when = Math.max(0, +when || 0);
  offsetTime = Math.max(0, +offsetTime || 0);
  offsetTime = Math.min(offsetTime, this.buffer.duration);
  duration = Math.max(0, +duration || 0);

  if (this._startTime === -Infinity) {
    this._startTime = when;
    this._stopTime = this._startTime + duration;
    this._playbackTime = when;
    this._offsetTime = offsetTime;
    this._output.gain.setValueAtTime(1, when);
    this._process();
  }
};

TimeStretchBufferNode.prototype.stop = function(when) {
  when = Math.max(0, +when || 0);

  if (this._startTime !== -Infinity && this._stopTime === Infinity) {
    this._stopTime = when;
    this._output.gain.setValueAtTime(0, when);
  }
};

TimeStretchBufferNode.prototype.connect = function() {
  if (this._output !== null) {
    this._output.connect.apply(this._output, arguments);
  }
};

TimeStretchBufferNode.prototype.disconnect = function() {
  if (this._output !== null) {
    this._output.disconnect();
  }
};

TimeStretchBufferNode.prototype.dispose = function() {
  this.disconnect();
  this._output = null;
};

TimeStretchBufferNode.prototype._process = function() {
  if (this.loop) {
    if (this.loopEnd <= this._offsetTime) {
      this._offsetTime = this.loopStart + (this._offsetTime - this.loopEnd);
    }
  } else if (this.buffer.duration <= this._offsetTime) {
    this._stopTime = this._playbackTime;
  }

  if (this._stopTime <= this._playbackTime) {
    if (this._output) {
      this._output.gain.setValueAtTime(0, this._stopTime);
    }
    if (typeof this.onended === "function") {
      this.onended();
    }
    return;
  }

  this._createChunk().connect(this._output);

  if (this._playbackTime <= this.context.currentTime + this._windowTime * 2) {
    this._process();
  }
};

TimeStretchBufferNode.prototype._createChunk = function() {
  var _this = this;
  var rate;
  var s0, s1, s2, s3;
  var r0, r1;
  var bufSrc, winFunc;

  rate = this.rate.getValueAtTime(this.context.currentTime);
  rate = Math.max(0.01, Math.min(rate, 100));

  s0 = this._playbackTime;
  s1 = s0 + this._windowTime * 0.5;
  s2 = s1 + this._windowTime * 0.5;
  this._playbackTime = s1;

  r0 = this._offsetTime;
  r1 = r0 + ((this._windowTime * 0.5) / rate);
  this._offsetTime = r1;

  bufSrc = this.context.createBufferSource();
  winFunc = this.context.createGain();

  bufSrc.buffer = this.buffer;
  bufSrc.loop = this.loop;
  bufSrc.loopStart = this.loopStart;
  bufSrc.loopEnd = this.loopEnd;
  bufSrc.start(s0, r0);
  bufSrc.stop(s2);
  bufSrc.connect(winFunc);
  bufSrc.onended = function() {
    bufSrc.disconnect();
    winFunc.disconnect();
    _this._chunks.shift();
    _this._process();
  };
  this._chunks.push(bufSrc);

  winFunc.gain.setValueCurveAtTime(this._windowCurve, s0, s2 - s0);

  return winFunc;
};

function createWindowCurve(length) {
  var curve = new Float32Array(length + 1);

  for (var i = 0; i < curve.length; i++) {
    curve[i] = Math.sin(Math.PI * (i / length));
  }
  curve[length] = 0;

  return curve;
}

module.exports = TimeStretchBufferNode;

},{"pseudo-audio-param":3}],2:[function(require,module,exports){
"use strict";

var TimeStretchBufferNode = require("./TimeStretchBufferNode");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

function main() {
  var vue;
  var audioContext = new AudioContext();
  var node = null;

  loadBinary("../../_/sounds/amen.wav", function(audioData) {
    audioContext.decodeAudioData(audioData, function(audioBuffer) {
      vue.changeAudioBuffer(audioBuffer, "amen.wav");
    });
  });

  vue = new Vue({
    el: "#app",
    data: {
      isPlaying: false,
      audioBuffer: null,
      name: "amen.wav",
      duration: 0,
      rate: 1,
      windowSize: 0.1,
    },
    methods: {
      play: function() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
          node = new TimeStretchBufferNode(audioContext, this.audioBuffer, {
            windowSize: this.windowSize,
          });
          node.loop = true;
          node.rate.setValueAtTime(this.rate);
          node.start(audioContext.currentTime);
          node.connect(audioContext.destination);
        } else {
          node.stop(audioContext.currentTime);
          node.dispose();
          node = null;
        }
      },
      changeRate() {
        if (node) {
          node.rate.setTargetAtTime(this.rate, audioContext.currentTime, 1);
        }
      },
      changeAudioBuffer(audioBuffer, name) {
        this.audioBuffer = audioBuffer;
        this.name = name;
        this.duration = audioBuffer.duration;
      }
    }
  });

  function loadBinary(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      callback(xhr.response);
    };
    xhr.send();
  }

  window.addEventListener("dragover", function(e) {
    e.preventDefault();
  }, false);

  window.addEventListener("drop", function(e) {
    e.preventDefault();

    var file = e.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onload = function() {
      audioContext.decodeAudioData(reader.result, function(audioBuffer) {
        vue.changeAudioBuffer(audioBuffer, file.name);
      });
    };

    reader.readAsArrayBuffer(file);
  }, false);
}

window.addEventListener("DOMContentLoaded", main);

},{"./TimeStretchBufferNode":1}],3:[function(require,module,exports){
module.exports = require("./lib");

},{"./lib":6}],4:[function(require,module,exports){
"use strict";

var expr = require("./expr");

var getLinearRampToValueAtTime = expr.getLinearRampToValueAtTime;
var getExponentialRampToValueAtTime = expr.getExponentialRampToValueAtTime;
var getTargetValueAtTime = expr.getTargetValueAtTime;
var getValueCurveAtTime = expr.getValueCurveAtTime;

function PseudoAudioParam(defaultValue) {
  this._defaultValue = defaultValue || 0;
  this.events = [];
}

PseudoAudioParam.prototype.setValueAtTime = function(value, time) {
  this._insertEvent({
    type: "setValueAtTime",
    time: time,
    args: [ value, time ]
  });
  return this;
};

PseudoAudioParam.prototype.linearRampToValueAtTime = function(value, time) {
  this._insertEvent({
    type: "linearRampToValueAtTime",
    time: time,
    args: [ value, time ]
  });
  return this;
};

PseudoAudioParam.prototype.exponentialRampToValueAtTime = function(value, time) {
  this._insertEvent({
    type: "exponentialRampToValueAtTime",
    time: time,
    args: [ value, time ]
  });
  return this;
};

PseudoAudioParam.prototype.setTargetAtTime = function(value, time, timeConstant) {
  this._insertEvent({
    type: "setTargetAtTime",
    time: time,
    args: [ value, time, timeConstant ]
  });
  return this;
};

PseudoAudioParam.prototype.setValueCurveAtTime = function(curve, time, duration) {
  this._insertEvent({
    type: "setValueCurveAtTime",
    time: time,
    args: [ curve, time, duration ]
  });
  return this;
};

PseudoAudioParam.prototype.cancelScheduledValues = function(time) {
  this.events = this.events.filter(function(eventItem) {
    return eventItem.time < time;
  });
  return this;
};

PseudoAudioParam.prototype.getValueAtTime = function(time) {
  var events = this.events;
  var value = this._defaultValue;
  var i, imax;
  var e0, e1, t0;

  for (i = 0, imax = events.length; i < imax; i++) {
    e0 = events[i];
    e1 = events[i + 1];
    t0 = Math.min(time, e1 ? e1.time : time);

    if (time < e0.time) {
      break;
    }

    switch (e0.type) {
    case "setValueAtTime":
    case "linearRampToValueAtTime":
    case "exponentialRampToValueAtTime":
      value = e0.args[0];
      break;
    case "setTargetAtTime":
      value = getTargetValueAtTime(t0, value, e0.args[0], e0.args[1], e0.args[2]);
      break;
    case "setValueCurveAtTime":
      value = getValueCurveAtTime(t0, e0.args[0], e0.args[1], e0.args[2]);
      break;
    }
    if (e1) {
      switch (e1.type) {
      case "linearRampToValueAtTime":
        value = getLinearRampToValueAtTime(t0, value, e1.args[0], e0.time, e1.args[1]);
        break;
      case "exponentialRampToValueAtTime":
        value = getExponentialRampToValueAtTime(t0, value, e1.args[0], e0.time, e1.args[1]);
        break;
      }
    }
  }

  return value;
};

PseudoAudioParam.prototype.applyTo = function(audioParam) {
  this.events.forEach(function(eventItem) {
    audioParam[eventItem.type].apply(audioParam, eventItem.args);
  });
  return this;
};

PseudoAudioParam.prototype._insertEvent = function(eventItem) {
  var time = eventItem.time;
  var events = this.events;
  var replace = 0;
  var i, imax;

  if (events.length === 0 || events[events.length - 1].time < time) {
    events.push(eventItem);
  } else {
    for (i = 0, imax = events.length; i < imax; i++) {
      if (events[i].time === time && events[i].type === eventItem.type) {
        replace = 1;
        break;
      }
      if (time < events[i].time) {
        break;
      }
    }
    events.splice(i, replace, eventItem);
  }
};

module.exports = PseudoAudioParam;

},{"./expr":5}],5:[function(require,module,exports){
"use strict";

function getLinearRampToValueAtTime(t, v0, v1, t0, t1) {
  var a;

  if (t <= t0) {
    return v0;
  }
  if (t1 <= t) {
    return v1;
  }

  a = (t - t0) / (t1 - t0);

  return v0 + a * (v1 - v0);
}

function getExponentialRampToValueAtTime(t, v0, v1, t0, t1) {
  var a;

  if (t <= t0) {
    return v0;
  }
  if (t1 <= t) {
    return v1;
  }
  if (v0 === v1) {
    return v0;
  }

  a = (t - t0) / (t1 - t0);

  if ((0 < v0 && 0 < v1) || (v0 < 0 && v1 < 0)) {
    return v0 * Math.pow(v1 / v0, a);
  }

  return 0;
}

function getTargetValueAtTime(t, v0, v1, t0, timeConstant) {
  if (t <= t0) {
    return v0;
  }
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function getValueCurveAtTime(t, curve, t0, duration) {
  var x, ix, i0, i1;
  var y0, y1, a;

  if (curve.length === 0) {
    return 0;
  }

  x = (t - t0) / duration;
  ix = x * (curve.length - 1);
  i0 = ix|0;
  i1 = i0 + 1;

  if (curve.length <= i1) {
    return curve[curve.length - 1];
  }

  y0 = curve[i0];
  y1 = curve[i1];
  a = ix % 1;

  return y0 + a * (y1 - y0);
}

module.exports = {
  getLinearRampToValueAtTime,
  getExponentialRampToValueAtTime,
  getTargetValueAtTime,
  getValueCurveAtTime
};

},{}],6:[function(require,module,exports){
module.exports = require("./PseudoAudioParam");

},{"./PseudoAudioParam":4}]},{},[2]);

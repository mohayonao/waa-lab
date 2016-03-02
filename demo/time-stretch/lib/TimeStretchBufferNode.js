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

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

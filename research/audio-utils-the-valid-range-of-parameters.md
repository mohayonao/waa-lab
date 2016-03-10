# AudioUtils - The Valid Range of Parameters

> :bow: Please PR to fill the MS Edge data!!

## AudioBuffer

#### sampleRate

| browser | min    | max    | ref |
|---------|-------:|-------:|------|
| _spec_  |   8192 |  96000 | [2.1.2 The BaseAudioContext Interface methods](https://www.w3.org/TR/webaudio/#methods) |
| blink   |   3000 | 192000 | [AudioBuffer.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AudioBuffer.cpp#46) -> [AudioUtilities.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/platform/audio/AudioUtilities.cpp#65) |
| gecko   |   8000 | 192000 | [AudioBuffer.cpp](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioBuffer.cpp#l79) -> [WebAudioUtils.h](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l38) |
| webkit  |  22050 |  96000 | [AudioBuffer.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioBuffer.cpp#L48) |

#### numberOfChannels

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |      1 |     32 | [2.1.2 The BaseAudioContext Interface methods](https://www.w3.org/TR/webaudio/#methods) |
| blink   |      1 |     32 | [AudioBuffer.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AudioBuffer.cpp#46) -> [AbstractAudioContext.h](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AbstractAudioContext.h#321) |
| gecko   |      1 |     32 | [AudioBuffer.cpp](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioBuffer.cpp#l81) -> [WebAudioUtils.h](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l35)
| webkit  |      1 |     32 | [AudioBuffer.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioBuffer.cpp#L48) -> [AudioContext.h](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.h#L391) |

## OfflineAudioContext

#### sampleRate

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |   8192 |  96000 | [2.3 The OfflineAudioContext Interface](https://www.w3.org/TR/webaudio/#OfflineAudioContext) |
| blink   |   3000 | 192000 | [OfflineAudioContext.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/OfflineAudioContext.cpp#69) -> [AudioUtilities.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/platform/audio/AudioUtilities.cpp#65) |
| gecko   |   8000 | 192000 | [AudioContext.cpp](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioContext.cpp#l207) -> [WebAudioUtils.h](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l38) |
| webkit  |  44100 |  96000 | [OfflineAudioContext.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/OfflineAudioContext.cpp#L47) -> [AudioContext.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.cpp#L106) |

#### numberOfChannels

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |      1 |     32 | [2.3 The OfflineAudioContext Interface](https://www.w3.org/TR/webaudio/#OfflineAudioContext) |
| blink   |      1 |     32 | [OfflineAudioContext.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/OfflineAudioContext.cpp#56) -> [AbstractAudioContext.h](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AbstractAudioContext.h#321) |
| gecko   |      1 |     32 | [AudioContext.cpp](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioContext.cpp#l205) -> [WebAudioUtils.h](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l35) |
| webkit  |      1 |     10 | [OfflineAudioContext.cpp#](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/OfflineAudioContext.cpp#L47) |

## AnalyserNode

#### fftSize

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |     32 |  32768 | [2.23 The AnalyserNode Interface](https://www.w3.org/TR/webaudio/#the-analysernode-interface) |
| blink   |     32 |  32768 | [AnalyserNode](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AnalyserNode.cpp#75) -> [RealtimeAnalyser.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/RealtimeAnalyser.cpp#46) |
| gecko   |     32 |  32768 | [AnalyserNode.cpp](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AnalyserNode.cpp#l152) -> [AnalyserNode.cpp](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AnalyserNode.cpp#l16) |
| webkit  |     32 |   2048 | [AnalyserNode.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AnalyserNode.cpp#L75) -> [RealtimeAnalyser.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/RealtimeAnalyser.cpp#L49) |

## PeriodicWave

#### length

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |      1 |     -  |      |
| blink   |      1 |     -  |      |
| gecko   |      1 |   4096 |    ? |
| webkit  |      1 |   4096 | [AudioContext.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.cpp#L657) -> [AudioContext.cpp](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.cpp#L102) |

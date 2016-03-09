# AudioUtils - The Valid Range of Parameters

> :bow: Please PR to fill the MS Edge data!!

## AudioBuffer

#### sampleRate

| browser | min    | max    | ref |
|---------|-------:|-------:|------|
| _spec_  |   8192 |  96000 | [2.1.2 The BaseAudioContext Interface methods](https://www.w3.org/TR/webaudio/#methods) |
| blink   |   3000 | 192000 | [AudioBuffer.cpp#46](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AudioBuffer.cpp#46) -> [AudioUtilities.cpp#65](https://chromium.googlesource.com/chromium/blink/+/master/Source/platform/audio/AudioUtilities.cpp#65) |
| mozilla |   8000 | 192000 | [AudioBuffer.cpp#l79](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioBuffer.cpp#l79) -> [WebAudioUtils.h#l38](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l38) |
| webkit  |  22050 |  96000 | [AudioBuffer.cpp#L48](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioBuffer.cpp#L48) |

#### numberOfChannels

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |      1 |     32 | [2.1.2 The BaseAudioContext Interface methods](https://www.w3.org/TR/webaudio/#methods) |
| blink   |      1 |     32 | [AudioBuffer.cpp](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AudioBuffer.cpp#46) -> [AbstractAudioContext.h](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AbstractAudioContext.h#321) |
| mozilla |      1 |     32 | [AudioBuffer.cpp#l81](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioBuffer.cpp#l81) -> [WebAudioUtils.h#35](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l35)
| webkit  |      1 |     32 | [AudioBuffer.cpp#L48](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioBuffer.cpp#L48) -> [AudioContext.h#L391](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.h#L391) |

## OfflineAudioContext

#### sampleRate

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |   8192 |  96000 | [2.3 The OfflineAudioContext Interface](https://www.w3.org/TR/webaudio/#OfflineAudioContext) |
| blink   |   3000 | 192000 | [OfflineAudioContext.cpp#69](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/OfflineAudioContext.cpp#69) -> [AudioUtilities.cpp#65](https://chromium.googlesource.com/chromium/blink/+/master/Source/platform/audio/AudioUtilities.cpp#65) |
| mozilla |   8000 | 192000 | [AudioContext.cpp#l207](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioContext.cpp#l207) -> [WebAudioUtils.h#l38](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l38) |
| webkit  |  44100 |  96000 | [OfflineAudioContext.cpp#L47](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/OfflineAudioContext.cpp#L47) -> [AudioContext.cpp#L106](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.cpp#L106) |

#### numberOfChannels

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_   |      1 |     32 | [2.3 The OfflineAudioContext Interface](https://www.w3.org/TR/webaudio/#OfflineAudioContext) |
| blink   |      1 |     32 | [OfflineAudioContext.cpp#56](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/OfflineAudioContext.cpp#56) -> [AbstractAudioContext.h#321](https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/webaudio/AbstractAudioContext.h#321) |
| mozilla |      1 |     32 | [AudioContext.cpp#l205](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/AudioContext.cpp#l205) -> [WebAudioUtils.h#l35](https://hg.mozilla.org/mozilla-central/file/tip/dom/media/webaudio/WebAudioUtils.h#l35) |
| webkit  |      1 |     10 | [OfflineAudioContext.cpp#L47](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/OfflineAudioContext.cpp#L47) |

## PeriodicWave

#### length

| browser | min    | max    | ref  |
|---------|-------:|-------:|------|
| _spec_  |      2 |     -  |      |
| blink   |      2 |     -  |      |
| mozilla |      2 |   4096 |    ? |
| webkit  |      2 |   4096 | [AudioContext.cpp#L657](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.cpp#L657) -> [AudioContext.cpp#L102](https://trac.webkit.org/browser/trunk/Source/WebCore/Modules/webaudio/AudioContext.cpp#L102) |

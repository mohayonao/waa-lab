# AudioNode - Default Channel Configuration

| name | inputs | outputs | channel count | count mode | interpretation |
|------|--------|---------|---------------|------------|----------------|
| AudioDestinationNode            | 1 | 0 | 2 | explicit    | speakers |
| GainNode                        | 1 | 1 | - | max         | speakers |
| DelayNode                       | 1 | 1 | - | max         | speakers |
| AudioBufferSourceNode           | 0 | 1 | - | -           | -        |
| MediaElementAudioSourceNode     | 0 | 1 | - | -           | -        |
| AudioWorkerNode                 |var|var|var| explicit    | speakers |
| ScriptProcessorNode             | 1 | 1 |_N_| explicit    | speakers |
| PannerNode                      | 1 | 1 | 2 | clamped-max | speakers |
| SpatialPannerNode               | 1 | 1 | 2 | clamped-max | speakers |
| StereoPannerNode                | 1 | 1 | 2 | clamped-max | speakers |
| ConvolverNode                   | 1 | 1 | 2 | clamped-max | speakers |
| AnalyserNode                    | 1 | 1 | 1 | max         | speakers |
| ChannelSplitterNode             | 1 |_N_| - | max         | speakers |
| ChannelMergerNode               |_N_| 1 | 1 | explicit    | speakers |
| DynamicsCompressorNode          | 1 | 1 | 2 | explicit    | speakers |
| BiquadFilterNode                | 1 | 1 | - | max         | speakers |
| IIRFilterNode                   | 1 | 1 | - | max         | speakers |
| WaveShaperNode                  | 1 | 1 | - | max         | speakers |
| OscillatorNode                  | 0 | 1 | - | -           | -        |
| MediaStreamAudioSourceNode      | 0 | 1 | - | -           | -        |
| MediaStreamAudioDestinationNode | 1 | 0 | 2 | explicit    | speakers |

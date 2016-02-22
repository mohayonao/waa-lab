# SwitchNode

### Expression

`x = a * ((c > 0) ? 1 : 0) + b * ((c < 0) ? 1 : 0)`

### Code

`x = a * ws1(c) + b * ws2(c)`

```js
function createSwitchNode(context, a, b, c) {
  var a0 = createWaveShaperNode(context, ws1, c);
  var b0 = createWaveShaperNode(context, ws2, c);
  var a1 = createMathMultiplyNode(context, a, a0);
  var b1 = createMathMultiplyNode(context, b, b0);

  return createMathAddNode(context, a1, b1);
}
```

### AudioGraph

![](SwitchNode.png)

### WaveShape

- `ws1 = (x) -> (x > 0) ? 1 : 0`
- `ws2 = (x) -> (x < 0) ? 1 : 0`

![](SwitchNodeWaveShape.png)

### Plot

![](SwitchNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/SwitchNode/

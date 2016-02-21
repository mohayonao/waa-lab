# IsPositiveOrZeroNode

### Expression

`x = (a >= 0) ? 1 : 0`

### Code

`x = ws(a)`

```js
function createIsPositiveOrZeroNode(context, a) {
  return createWaveShaperNode(context, ws, a);
}
```

### AudioGraph

![](IsPositiveOrZeroNode.png)

### WaveShape

`ws = (x) -> (x >= 0) ? 1 : 0`

![](IsPositiveOrZeroNodeWaveShape.png)

### Plot

![](IsPositiveOrZeroNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/IsPositiveOrZeroNode/

# IsNotZeroNode

### Expression

`x = (a != 0) ? 1 : 0`

### Code

`x = ws2(ws1(a))`

```js
function createIsNotZeroNode(context, a) {
  var b = createWaveShaperNode(context, ws1, a);

  return createWaveShaperNode(context, ws2, b);
}
```

### AudioGraph

![](IsNotZeroNode.png)

### WaveShape

`ws1 = (x) -> (x != 0) ? 1 : 0`

_ws2 is used to provide stability the output._

![](IsNotZeroNodeWaveShape.png)

### Plot

![](IsNotZeroNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/IsNotZeroNode/

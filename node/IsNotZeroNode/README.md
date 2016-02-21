# IsNotZeroNode

### Expression

- `x = (a != 0) ? +1 : 0`

### Code

`x = ws2(ws1(a))`

```js
function createIsNotZeroNode(context, a) {
  var b = createWaveShaperNode(context, ws1, a);

  return createWaveShaperNode(context, ws2, b);
}
```

### AudioGraph

![](is-not-zero-node.png)

### WaveShape

`ws1 = (x) -> (x != 0) ? +1 : 0`

![](is-not-zero-wave-shape.png)

### Plot

![](is-not-zero-node-plot.png)

### Note

- The length of waveshape table affects accuracy of detecting zero.

### Demo

http://mohayonao.github.io/waa-lab/node/IsNotZeroNode/

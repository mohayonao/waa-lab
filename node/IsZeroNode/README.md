# IsZeroNode

### Expression

- `x = (a == 0) ? +1 : 0`

### Code

`x = isPositive(ws(a))`

```js
function createIsZeroNode(context, a) {
  var b = createWaveShaperNode(context, ws, a);

  return createIsPositiveNode(context, b);
}
```

### AudioGraph

![](is-zero-node.png)

### WaveShape

`ws = (x) -> (x == 0) ? +1 : 0`

![](is-zero-wave-shape.png)

### Plot

![](is-zero-node-plot.png)

### Note

- The length of waveshape table affects accuracy of detecting zero.

### Demo

http://mohayonao.github.io/waa-lab/node/IsZeroNode/

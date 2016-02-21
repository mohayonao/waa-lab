# IsPositiveNode

### Expression

- `x = (a > 0) ? +1 : 0`

### Code

`x = ws(a)`

```js
function createIsPositiveNode(context, a) {
  return createWaveShaperNode(context, ws, a);
}
```

### AudioGraph

![](is-positive-node.png)

### WaveShape

`ws = (x) -> (x > 0) ? +1 : 0`

![](is-positive-wave-shape.png)

### Plot

![](is-positive-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/IsPositiveNode/

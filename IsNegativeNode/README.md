# IsNegativeNode

### Expression

- `x = (a < 0) ? +1 : 0`

### Code

`x = ws(a)`

```js
function createIsNegativeNode(context, a) {
  return createWaveShaperNode(context, ws, a);
}
```

### AudioGraph

![](is-negative-node.png)

### WaveShape

`ws = (x) -> (x < 0) ? +1 : 0`

![](is-negative-wave-shape.png)

### Plot

![](is-negative-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/IsNegativeNode/

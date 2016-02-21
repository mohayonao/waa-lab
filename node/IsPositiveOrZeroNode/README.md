# IsPositiveOrZeroNode

### Expression

- `x = (a >= 0) ? +1 : 0`

### Code

`x = ws(a)`

```js
function createIsPositiveOrZeroNode(context, a) {
  return createWaveShaperNode(context, ws, a);
}
```

### AudioGraph

![](is-positive-or-zero-node.png)

### WaveShape

`ws = (x) -> (x >= 0) ? +1 : 0`

![](is-positive-or-zero-wave-shape.png)

### Plot

![](is-positive-or-zero-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/IsPositiveOrZeroNode/

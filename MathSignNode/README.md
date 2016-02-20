# MathSignNode

### Expression

- `x = (a == 0) ? 0 : (a < 0) ? -1 : +1`

### Code

`x = ws(a)`

```js
function createMathSignNode(context, a) {
  return createWaveShaperNode(context, ws, a);
}
```

### AudioGraph

![](math-sign-node.png)

### WaveShape

`ws = (x) -> (x == 0) ? 0 : (x < 0) ? -1 : +1`

![](math-sign-wave-shape.png)

### Plot

![](math-sign-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/MathSignNode/

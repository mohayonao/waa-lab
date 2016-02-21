# MathSubtractNode

### Expression

`x = a - b`

### Code

```js
function createMathSubtractNode(context, a, b) {
  var c = context.createGain();

  b.connect(c);

  c.gain.value = -1;

  return createMathAddNode(context, a, c);
}
```

### AudioGraph

![](math-subtract-node.png)

### Plot

![](math-subtract-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathSubtractNode/

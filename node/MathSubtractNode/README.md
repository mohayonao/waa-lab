# MathSubtractNode

### Expression

`x = a - b`

### Code

```js
function createMathSubtractNode(context, a, b) {
  var c = createMathInvertNode(context, b);

  return createMathAddNode(context, a, c);
}
```

### AudioGraph

![](math-subtract-node.png)

### Plot

![](math-subtract-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathSubtractNode/

# MathSubtractNode

### Expression

`x = a - b`

### Code

`x = a + -b`

```js
function createMathSubtractNode(context, a, b) {
  var c = createMathInvertNode(context, b);

  return createMathAddNode(context, a, c);
}
```

### AudioGraph

![](MathSubtractNode.png)

### Plot

![](MathSubtractNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathSubtractNode/

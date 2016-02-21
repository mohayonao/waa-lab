# MathEqualToNode

### Expression

- `x = (a == b) ? +1 : 0`

### Code

`x = (a - b) == 0`

```js
function createMathEqualToNode(context, a, b) {
  var c = createMathSubtractNode(context, a, b);

  return createIsZeroNode(context, c);
}
```

### AudioGraph

![](math-equal-to-node.png)

### Plot

![](math-equal-to-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathEqualToNode/

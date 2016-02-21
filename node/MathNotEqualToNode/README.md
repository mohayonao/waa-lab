# MathNotEqualToNode

### Expression

- `x = (a != b) ? +1 : 0`

### Code

`x = (a - b) != 0`

```js
function createMathNotEqualToNode(context, a, b) {
  var c = createMathSubtractNode(context, a, b);

  return createIsNotZeroNode(context, c);
}
```

### AudioGraph

![](math-not-equal-to-node.png)

### Plot

![](math-not-equal-to-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathNotEqualToNode/

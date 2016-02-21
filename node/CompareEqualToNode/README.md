# CompareEqualToNode

### Expression

- `x = (a == b) ? +1 : 0`

### Code

`x = (a - b) == 0`

```js
function createCompareEqualToNode(context, a, b) {
  var c = createMathSubtractNode(context, a, b);

  return createIsZeroNode(context, c);
}
```

### AudioGraph

![](compare-equal-to-node.png)

### Plot

![](compare-equal-to-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/CompareEqualToNode/

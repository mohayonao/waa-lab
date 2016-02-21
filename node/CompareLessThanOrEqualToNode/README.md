# CompareLessThanOrEqualToNode

### Expression

`x = (a <= b) ? 1 : 0`

### Code

`x = ((b - a) >= 0) ? 1 : 0`

```js
function createCompareLessThanOrEqualToNode(context, a, b) {
  var c = createMathSubtractNode(context, b, a);

  return createIsPositiveNode(context, c);
}
```

### AudioGraph

![](CompareLessThanOrEqualToNode.png)

### Plot

![](CompareLessThanOrEqualToNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/CompareLessThanOrEqualToNode/

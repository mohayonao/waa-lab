# CompareGreaterThanNode

### Expression

- `x = (a > b) ? +1 : 0`

### Code

`x = (a - b) > 0`

```js
function createCompareGreaterThanNode(context, a, b) {
  var c = createMathSubtractNode(context, a, b);

  return createIsPositiveNode(context, c);
}
```

### AudioGraph

![](compare-greater-than-node.png)

### Plot

![](compare-greater-than-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/CompareGreaterThanNode/

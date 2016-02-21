# CompareGreaterThanNode

### Expression

`x = (a > b) ? 1 : 0`

### Code

`x = ((a - b) > 0) ? 1 : 0`

```js
function createCompareGreaterThanNode(context, a, b) {
  var c = createMathSubtractNode(context, a, b);

  return createIsPositiveNode(context, c);
}
```

### AudioGraph

![](CompareGreaterThanNode.png)

### Plot

![](CompareGreaterThanNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/CompareGreaterThanNode/

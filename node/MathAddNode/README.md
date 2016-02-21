# MathAddNode

### Expression

`x = a + b`

### Code

`x = a + b`

```js
function createMathAddNode(context, a, b) {
  var x = context.createGain();

  a.connect(x);
  b.connect(x);

  return x;
}
```

### AudioGraph

![](MathAddNode.png)

### Plot

![](MathAddNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathAddNode/

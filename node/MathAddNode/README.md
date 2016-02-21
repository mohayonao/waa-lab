# MathAddNode

### Expression

`x = a + b`

### Code

```js
function createMathAddNode(context, a, b) {
  var x = context.createGain();

  a.connect(x);
  b.connect(x);

  return x;
}
```

### AudioGraph

![](math-add-node.png)

### Plot

![](math-add-node-plot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathAddNode/

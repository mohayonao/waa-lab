# MathMultiplyNode

### Expression

`x = a * b`

### Code

`x = a * b`

```js
function createMathMultiplyNode(context, a, b) {
  var x = context.createGain();

  a.connect(x);
  b.connect(x.gain);

  x.gain.value = 0;

  return x;
}
```

### AudioGraph

![](MathMultiplyNode.png)

### Plot

![](MathMultiplyNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathMultiplyNode/

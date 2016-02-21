# MathInvertNode

### Expression

`x = -a`

### Code

`x = -a`

```js
function createMathInvertNode(context, a) {
  var b = context.createGain();

  b.gain.value = -1;

  a.connect(b);

  return b;
}
```

### AudioGraph

![](MathInvertNode.png)

### Plot

![](MathInvertNodePlot.png)

### Demo

http://mohayonao.github.io/waa-lab/node/MathInvertNode/

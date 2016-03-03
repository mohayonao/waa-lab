import os
import numpy as np
import matplotlib.pyplot as plt

def spec(x, curve):
    x = max(-1, min(x, 1))
    x = (x + 1) * 0.5

    ix = x * (len(curve) - 1)
    i0 = int(ix)
    i1 = i0 + 1

    if len(curve) <= i1:
        return curve[-1]

    y0, y1 = curve[i0:i1+1]
    a = ix % 1.0

    return y0 + a * (y1 - y0)

def firefox(x, curve):
    x = max(-1, min(x, 1))
    x = (x + 1) * 0.5

    i = int(x * len(curve))
    i = min(i, len(curve) - 1)

    return curve[i]

def safari(x, curve):
    x = max(-1, min(x, 1))
    x = (x + 1) * 0.5
    x = x + (0.5 / len(curve))

    i = int(x * len(curve))
    i = min(i, len(curve) - 1)

    return curve[i]

def ws(wsfunc, curve):
    def pyfunc(x):
        return wsfunc(x, curve)
    return pyfunc

def calc_difference(y1, y2):
    return np.sqrt(np.mean((y1 - y2) ** 2)) * 0.5

curve = np.array([ -1, -0.5, 0, 0.5, 1 ])

x = np.linspace(-1, 1, 10000, endpoint=True)

plt.title("AudioParam#setValueCurveAtTime interpolation")
plt.xlim(-1, 1)
plt.ylim(-1.1, 1.1)

y1 = np.vectorize(ws(spec, curve))(x)
plt.plot(x, y1, label="Chrome 48 (latest spec)", lw=2)

y2 = np.vectorize(ws(firefox, curve))(x)
plt.plot(x, y2, label="Firefox 44")

y3 = np.vectorize(ws(safari, curve))(x)
plt.plot(x, y3, label="Safari 9/iOS9 Mobile Safari")

plt.legend(loc="lower right")
plt.grid()
plt.savefig("%s/img/comparison.png" % os.path.dirname(__file__))

print "length: %d" % len(curve)
print "safari: %f" % calc_difference(y1, y2)

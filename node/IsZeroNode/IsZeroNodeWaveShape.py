import os
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1.0, 1.0, 10000, endpoint=True)

ws1 = np.zeros_like(x)
ws2 = np.zeros_like(x)

ws1[np.abs(x) <= 1e-4] = 1
ws2[x > 0.99] = 1

plt.subplot(211)
plt.title("ws1")
plt.grid()
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws1)

plt.subplot(212)
plt.title("ws2")
plt.grid()
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws2)

plt.savefig("%s/img/IsZeroNodeWaveShape.png" % os.path.dirname(__file__))

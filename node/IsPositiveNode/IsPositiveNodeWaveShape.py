import os
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-1.0, 1.0, 10000, endpoint=True)

ws = np.zeros_like(x)
ws[x > 0] = 1

plt.subplot(111)
plt.title("ws")
plt.grid()
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws)

plt.savefig("%s/img/IsPositiveNodeWaveShape.png" % os.path.dirname(__file__))

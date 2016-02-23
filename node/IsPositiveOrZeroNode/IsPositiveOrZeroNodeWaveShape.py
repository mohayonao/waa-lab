import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-1.0, 1.0, 0.0001)

ws = np.zeros_like(x)
ws[x >= 0] = 1

plt.subplot(111)
plt.title("ws")
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws)

plt.show()

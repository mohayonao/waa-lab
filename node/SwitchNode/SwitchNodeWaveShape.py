import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-1.0, 1.0, 0.0001)

ws1 = np.zeros_like(x)
ws1[x > 0] = 1

ws2 = np.zeros_like(x)
ws2[x < 0] = 1

plt.subplot(211)
plt.title("ws1")
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws1)

plt.subplot(212)
plt.title("ws2")
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws2)

plt.show()

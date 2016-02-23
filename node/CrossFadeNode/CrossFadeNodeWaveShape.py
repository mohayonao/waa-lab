import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-1.0, 1.0, 0.001)

ws1 = (x + 1) * 0.5
ws2 = 1 - ws1

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

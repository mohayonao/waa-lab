import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-1.0, 1.0, 0.01)

ws = np.sign(x)

plt.subplot(111)
plt.title("ws")
plt.xlim(-1, 1)
plt.ylim(-1.2, +1.2)
plt.plot(x, ws)

plt.show()

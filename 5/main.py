import sys
from collections import defaultdict

L = open(sys.argv[1]).read().strip().split('\n\n')
S = L[0]
L.pop(0)

for l in L:
    left,rest = l.split(':\n')
    lines = rest.split('\n')
    values = []
    for line in lines:
        values.append([int(i) for i in line.split(" ")])

    m = 

    print(left + '\n', values)
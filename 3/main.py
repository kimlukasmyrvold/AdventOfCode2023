import sys
from collections import defaultdict

F = open(sys.argv[1]).read().strip().split('\n')
L = [[c for c in line] for line in F]
R = len(L)
C = len(L[0])

ans1 = 0
ans2 = 0

nums = defaultdict(list)
for r in range(len(L)):
    gears = set()
    n = 0
    has_part = False
    for c in range(len(L[r]) + 1):
        if c < C and L[r][c].isdigit():
            n = n * 10 + int(L[r][c])
            for rr in [-1, 0, 1]:
                for cc in [-1, 0, 1]:
                    if 0 <= r + rr < R and 0 <= c + cc < C:
                        ch = L[r + rr][c + cc]
                        if not ch.isdigit() and ch != '.':
                            has_part = True
                        if ch == '*':
                            gears.add((r + rr, c + cc))
        elif n > 0:
            for gear in gears:
                nums[gear].append(n)
            if has_part:
                ans1 += n
            n = 0
            has_part = False
            gears = set()

for k, v in nums.items():
    if len(v) == 2:
        ans2 += v[0] * v[1]

print("Answer1:", ans1)
print("Answer2:", ans2)

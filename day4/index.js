const fs = require('fs');
const fileContent = fs.readFileSync(process.argv[2], 'utf-8').trim();

const lines = fileContent.split(/\r?\n/);
const n = new Map();
let ans1 = 0;
let ans2 = 0;

for (const [i, line] of lines.entries()) {
    if (!n.has(i)) n.set(i, 0);
    n.set(i, n.get(i) + 1);

    const [first, rest] = line.split('|');
    const [_id, card] = first.split(':');
    const card_nums = card.match(/\d+/g).map(x => parseInt(x, 10));
    const rest_nums = rest.match(/\d+/g).map(x => parseInt(x, 10));

    const val = new Set(card_nums.filter(num => rest_nums.includes(num))).size;
    if (val > 0) ans1 += 2 ** (val - 1);

    for (let j = 0; j < val; j++) {
        const k = i + 1 + j;
        if (!n.has(k)) n.set(k, 0);
        n.set(k, n.get(k) + n.get(i));
    }
}

ans2 = Array.from(n.values()).reduce((a, b) => a + b, 0);
console.log("Part1:", ans1);
console.log("Part2:", ans2);

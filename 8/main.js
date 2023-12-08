const fs = require('fs');
const fileContent = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\n\n/);

const [q, left] = [fileContent[0].split(""), fileContent[1].split(/\n/)];
const directions = [];
q.forEach(ch => {
    if (ch === "L") directions.push(0);
    if (ch === "R") directions.push(1);
});

const nodes = {};
left.forEach(node => {
    const [a, left] = node.split(" = ");
    const [b, c] = left.split(", ");
    nodes[a] = [b.split("(")[1], c.split(")")[0]];
});

let steps = 0;
let index = 0;
let isFound = false;
let key = "AAA";
do {
    console.log(`(${key}, ${key === "ZZZ"}, ${steps}, ${index}, ${directions.length}, ${directions[index]}): [${nodes[key]}], ${nodes[key][directions[index]]}`)
    key = nodes[key][directions[index]];
    if (key === "ZZZ") isFound = true;

    index++;
    if (index > directions.length - 1) index = 0;

    steps++;
} while (!isFound)

console.log("Ans1:", steps)
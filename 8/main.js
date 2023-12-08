const timeStart = new Date();

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
    nodes[a] = [b.replace("(", ""), c.replace(")", "")];
});

let steps = 0;
let index = 0;
let key = "AAA";
while (key !== "ZZZ") {
    key = nodes[key][directions[index]];

    index++;
    if (index > directions.length - 1) index = 0;

    steps++;
}

console.log("Ans1:", steps)
console.log(`Time taken: ${new Date() - timeStart} ms`);
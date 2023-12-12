const start = new Date();

const fs = require('fs');
const lines = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\n/).map((line) => line.split(""));

const transpose = (input) => input[0].map((_, index) => input.map(row => row[index]));

function addDots(count, input) {
    return input.flatMap(axis => {
        if (axis.every(x => x === ".")) {
            const dots = Array(count).fill(Array(axis.length).fill('.'));
            return (count <= 2) ? [axis, ...dots] : [...dots];
        }

        return [axis];
    });
}

const getDistance = (pair1, pair2) => {
    const galax1 = galaxies[pair1];
    const galax2 = galaxies[pair2];
    return parseInt((galax1[0] - galax2[0]).toString().replace("-", "")) + parseInt((galax1[1] - galax2[1]).toString().replace("-", ""));
}

// Turning "#" into numbers
let count = 0;
for (let i = 0; i < lines.length; i++)
    for (let j = 0; j < lines[i].length; j++)
        if (lines[i][j] === "#") lines[i][j] = ++count;

const dotsToAdd = parseInt(process.argv[3]) || 1;
const newLines = transpose(addDots(dotsToAdd, transpose(addDots(dotsToAdd, lines))));

// Getting indexes for every number
const galaxies = {};
for (let i = 0; i < newLines.length; i++)
    for (let j = 0; j < newLines[i].length; j++)
        if (typeof newLines[i][j] === "number") galaxies[newLines[i][j]] = [i, j]

// Getting shortest distance
const distances = [];
for (let i = 0; i < Object.keys(galaxies).length; i++)
    for (let j = i + 1; j < Object.keys(galaxies).length; j++)
        distances.push(getDistance(Object.keys(galaxies)[i], Object.keys(galaxies)[j]))

const ans1 = distances.reduce((a, b) => a + b, 0);
console.log(ans1);

console.log("Took", new Date() - start, "ms.")
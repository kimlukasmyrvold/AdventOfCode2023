const fs = require('fs');

const lines = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\r?\n/);
const races = {};

for (const line of lines) {
    const [first, rest] = line.split(':');
    const nums = rest.match(/\d+/g).map(x => parseInt(x));
    races[first] = nums;
}

function ans1() {
    const margins = [];
    for (let i = 0; i < races.Time.length; i++) {
        const time = races.Time[i];
        const record = races.Distance[i];
        margins.push(wins(time, record))
    }
    return margins.reduce((a, b) => a * b);
}

function ans2() {
    const time = races.Time.reduce((a, b) => a + "" + b);
    const record = races.Distance.reduce((a, b) => a + "" + b);
    return wins(time, record);
}

function wins(time, record) {
    let wins = 0;
    for (let y = 0; y <= time; y++) if (((time - y) * y) > record) wins++;
    return wins;
}

const timeStart = Date.now();
console.log(ans1())
console.log(ans2())
console.log(`Time: ${Date.now() - timeStart}ms`)

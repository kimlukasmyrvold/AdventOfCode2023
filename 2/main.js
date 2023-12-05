const fs = require('fs');

const fileContent = fs.readFileSync(process.argv[2], 'utf-8').trim();
let ans = 0;
let ans2 = 0;

fileContent.split(/\n/).forEach((contents) => {
    const arr = contents.trim().split(/\n?\r/);

    const games = {};
    const check = {
        red: 12,
        green: 13,
        blue: 14
    };

    for (const rawLine of arr) {
        const id = rawLine.split(/: /)[0].slice(5);
        const line = rawLine.split(/Game \d+: /)[1];

        const sets = {};
        const [red, green, blue] = [[], [], []];

        for (const set of line.split('; ')) {
            set.split(', ').forEach(e => {
                const val = parseInt(e.split(/\s/)[0]);
                switch (e.split(/\s/)[1]) {
                    case "red":
                        red.push(val);
                        break;
                    case "green":
                        green.push(val);
                        break;
                    case "blue":
                        blue.push(val);
                        break;
                }
            });
        }

        sets.red = red;
        sets.green = green;
        sets.blue = blue;
        games[id] = sets;
        ans2 += max(red) * max(green) * max(blue);
    }

    for (const key in games) {
        let ok = true;
        games[key].red.forEach(e => { if (e > check.red) ok = false });
        games[key].green.forEach(e => { if (e > check.green) ok = false });
        games[key].blue.forEach(e => { if (e > check.blue) ok = false });
        if (ok) ans += parseInt(key);
    }
});

function max(arr) {
    let max = arr[0];
    for (const value of arr) if (value >= max) max = value;
    return max;
}

console.log("Answer1:", ans);
console.log("Answer2:", ans2);

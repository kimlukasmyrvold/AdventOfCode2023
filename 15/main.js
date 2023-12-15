const fs = require('fs');
const lines = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\n/);

const getValue = (string) => string.split('').reduce((val, char) => (val + char.charCodeAt(0)) * 17 % 256, 0);

let ans1 = 0;
for (const ascii of lines.toString().split(",")) {
    ans1 += getValue(ascii);
};

console.log("ans1:", ans1);

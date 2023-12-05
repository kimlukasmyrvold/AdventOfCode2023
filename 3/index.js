/*
    Not a working solution
*/

const fs = require('fs');
const fileContent = fs.readFileSync(process.argv[2], 'utf-8').trim();

const lines = fileContent.split(/\r?\n/);
let partNums = []; // valid: 467 35 633 617 592 755 664 598 (sum) => 4361

for (let index = 0; index < lines.length; index++) {
    if (!index > 0 || !(index < lines.length - 1)) continue;

    const first = lines[index - 1];
    const middle = lines[index];
    const last = lines[index + 1];

    console.log(`${first}\n${middle}\n${last}\n`)

    function getMatches(input, regex) {
        const matches = [];
        let match;
        while ((match = regex.exec(input)) !== null) {
            matches.push({ index: match.index, number: match[0], length: match[0].length });
        }

        return matches;
    }

    const matches = {
        first: getMatches(first, /\d+/g),
        middle: getMatches(middle, /\d+/g),
        last: getMatches(last, /\d+/g),
    }

    for (const key in matches) {
        console.log("\n" + key)
        console.log("values:", matches[key].length)


        for (const values in matches[key]) {
            const index = matches[key][values].index;
            const length = matches[key][values].length;

            const start = (index > 0) ? index - 1 : index;
            const end = index + length + 1;

            const slicedStart = first.slice(start, end);
            const firstHasSym = /[^\w\s.]/g.test(slicedStart);
            console.log("slicedStart: ", slicedStart, `(${start}, ${end})`, firstHasSym);

            const slicedMiddle = middle.slice(start, end);
            const middleHasSym = /[^\w\s.]/g.test(slicedMiddle);
            console.log("slicedMiddle:", slicedMiddle, `(${start}, ${end})`, middleHasSym);

            const slicedLast = last.slice(start, end);
            const lastHasSym = /[^\w\s.]/g.test(slicedLast);
            console.log("slicedLast:  ", slicedLast, `(${start}, ${end})`, lastHasSym);


            console.log("\n")
        }
    }

    console.log("\n")
}


/*
TODO:
* Read 2 lines at a time
* Get all the numbers on line 1 and check if there are symbols next to it,
    then check for underneath
* Get all the numbers on line 2 and check if there are symbols next to it,
    then check for above

*/
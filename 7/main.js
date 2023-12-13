const fs = require('fs');
const lines = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\r?\n/);

const games = [];
for (const line of lines) {
    const [cards, bids] = line.split(" ");
    games.push([cards, bids]);
}

function getStrengths(cards) {
    switch (j(getSimilar(cards))) {
        case j([5]):
            return [7, cards];
        case j([1, 4]):
            return [6, cards];
        case j([2, 3]):
            return [5, cards];
        case j([1, 1, 3]):
            return [4, cards];
        case j([1, 2, 2]):
            return [3, cards];
        case j([1, 1, 1, 2]):
            return [2, cards];
        case j([1, 1, 1, 1, 1]):
            return [1, cards];
        default:
            console.error("Something went wrong!");
            break;
    }
}

const j = (a) => JSON.stringify(a);


function getSimilar(arr) {
    const count = {};
    const foo = [];

    arr.split("").forEach(e => {
        count[e] = (count[e] || 0) + 1;
    });

    for (const key in count) {
        if (count.hasOwnProperty(key)) {
            foo.push(count[key])
        }
    }

    return foo.sort();
}


games.sort((a, b) => {
    const strengtA = getStrengths(a[0]);
    const strengtB = getStrengths(b[0]);

    if (strengtA[0] !== strengtB[0]) return strengtA[0] - strengtB[0];

    for (let i = 0; i < a[0].split("").length; i++) {
        const [xNum, yNum] = [getVal(a[0].split(""), i), getVal(b[0].split(""), i)];
        if (xNum !== yNum) return xNum - yNum;
    }
});


function getVal(a, i) {
    switch (a[i]) {
        case 'T':
            return 10;
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;
        default:
            return parseInt(a[i]);
    }
}

const ans1 = () => {
    let a = 0;
    for (const key in games) {
        a += parseInt(games[key][1]) * (parseInt(key) + 1);
    }
    return a;
}
console.log("Answer1:", ans1());
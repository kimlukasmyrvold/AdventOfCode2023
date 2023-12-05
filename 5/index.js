const fs = require('fs');

const lines = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\r?\n/);
for (const line of lines) {

}

// const seeds = lines[0].match(/\d+/g).map(x => parseInt(x));
// for (const seed of seeds) {
//     console.log(seed)
// }

// const soilMap = lines[0].match(/\d+/g).map(x => parseInt(x));
// const fertiMap = lines[0].match(/\d+/g).map(x => parseInt(x));
// const waterMap = lines[0].match(/\d+/g).map(x => parseInt(x));
// const temperaturMap = lines[0].match(/\d+/g).map(x => parseInt(x));
// const humidityMap = lines[0].match(/\d+/g).map(x => parseInt(x));
// const locationMap = lines[0].match(/\d+/g).map(x => parseInt(x));

let [a, b, c] = lines[3].match(/\d+/g).map(x => parseInt(x));
const [dest, sour] = [[], []];
for (let i = 0; i < c; i++) {
    dest.push(a + i);
    sour.push(b + i);
}
console.log(dest, sour)

const foo = {
    1: {
        Seed: 79,
        soil: 81,
        fertilizer: 81,
        water: 81,
        light: 74,
        temperature: 78,
        humidity: 78,
        location: 82.
    }
};
const { promises: fsPromises } = require('fs');

async function asyncReadFile(filename) {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const arr = contents.split(/\n/);
    const sums = [];

    function getFirst(line) {
        return line.match(/\d/);
    }

    function getLast(line) {
        return line.match(/\d+(?=\D*$)/).toString().slice(-1);
    }

    for (let i = 0; i < arr.length; i++) {
        sums.push(parseInt(getFirst(arr[i]) + getLast(arr[i])));
    }

    const sum = sums.reduce((a, b) => a + b);
    console.log("sum:", sum);
}

asyncReadFile('./input.txt');
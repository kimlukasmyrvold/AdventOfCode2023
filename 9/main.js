const fs = require('fs');
const fileContent = fs.readFileSync(process.argv[2], 'utf-8').trim().split(/\n/).map((line) => line.split(" ").map((a) => parseInt(a)));
const results = [];
fileContent.forEach(line => {
    function getPattern(arr) {
        const patternArray = [];
        for (let i = 1; i < arr.length; i++) {
            patternArray.push(arr[i] - arr[i - 1]);
        }
        return patternArray;
    }

    function nextValue(inputArray) {
        let array = inputArray;
        const newArrays = [];
        while (!array.every(value => value === 0)) {
            const newArray = getPattern(array);
            newArrays.push(newArray)
            array = newArray;
        }
        return inputArray[0] - addNext(newArrays);
    }

    function addNext(arr) {
        const newArr = arr;
        for (let i = arr.length - 1; i >= 0; i--) {
            if (i !== arr.length - 1) newArr[i].push(newArr[i][0] - newArr[i + 1][newArr[i + 1].length - 1])
        }
        return newArr[0].pop();
    }

    results.push(nextValue(line))
});

console.log(results.reduce((a, b) => a + b, 0))
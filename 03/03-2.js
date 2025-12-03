const readline = require('readline');
const fs = require('fs');

const start = new Date();

const rl = readline.createInterface({
  input: fs.createReadStream('03/input.txt')
});

let sum = 0;

rl.on('line', (line) => {
    digits = line.split("").map(str => parseInt(str, 10));

    let joltage = 0;
    let highest_position = -1;
    for (let position = 12; position > 0; position--) {
        let highest = 0;
        for (let i = highest_position+1; i <= digits.length-position; i++) {
            if (digits[i] > highest) {
                highest = digits[i];
                highest_position = i;
            }
        }
        joltage = joltage * 10 + highest;
    }
    //console.log(joltage);
    sum += joltage;
});

rl.on('close', () => {
    const end = new Date();
    console.log(`Execution time: ${end - start} ms`);
    console.log(sum);
});
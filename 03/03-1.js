const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('03/input.txt')
});

let sum = 0;

rl.on('line', (line) => {
digits = line.split("").map(str => parseInt(str, 10));
let highest_left = 0;
let highest_left_index = 0;
for (let i = 0; i < digits.length-1; i++) {
    if (digits[i] > highest_left) {
        highest_left = digits[i];
        highest_left_index = i;
    }
}
let highest_right = 0;
for (let i = highest_left_index+1; i < digits.length; i++) {
    if (digits[i] > highest_right) {
        highest_right = digits[i];
    }
}
sum += highest_left * 10 + highest_right;
});

rl.on('close', () => {
    console.log(sum);
});
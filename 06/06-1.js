const readline = require('readline');
const fs = require('fs');

const startTime = new Date();

let homework = [];
let sum = 0;

const rl = readline.createInterface({
  input: fs.createReadStream('06/input.txt')
});

rl.on('line', (line) => {
    homework.push(line.trim().split(/\s+/));
});

rl.on('close', () => {
    for (let i = 0; i < homework[0].length; i++) {
        if (homework[homework.length - 1][i] === '*') {
            let problem = 1;
            for (let j = 0; j < homework.length - 1; j++) {
                problem *= parseInt(homework[j][i], 10);
            }
            sum += problem;
            console.log(`problem: ${problem}`);
        }
        if (homework[homework.length - 1][i] === '+') {
            let problem = 0;
            for (let j = 0; j < homework.length - 1; j++) {
                problem += parseInt(homework[j][i], 10);
            }
            sum += problem;
            console.log(`problem: ${problem}`);
        }
    }

    const endTime = new Date();
    console.log(`Execution time: ${endTime - startTime} ms`);

    console.log(`sum: ${sum}`);
});
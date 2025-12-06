const readline = require('readline');
const fs = require('fs');

const startTime = new Date();

let homework = [];
let sum = 0;

const rl = readline.createInterface({
  input: fs.createReadStream('06/input.txt')
});

rl.on('line', (line) => {
    homework.push(line.split(''));
});

rl.on('close', () => {
    for (let i = 0; i < homework[0].length; i++) {
        let opline = homework[homework.length - 1]
        let operation = opline[i];
        let problem = 0;
        if (operation === '*') 
            problem = 1;
        do {
            let number = "";
            for (let j = 0; j < homework.length - 1; j++) {
                number += homework[j][i];
            }
            if (number.trim().length !== 0) {
                if (operation === '*') {
                    problem *= parseInt(number, 10);
                }
                if (operation === '+') {
                    problem += parseInt(number, 10);
                }
            }
            i += 1;
        }
        while (i < opline.length && opline[i] === ' ')
        
        i -= 1; // adjust for outer loop increment

        console.log(`problem: ${problem}`);
        sum += problem;
    }

    const endTime = new Date();
    console.log(`Execution time: ${endTime - startTime} ms`);

    console.log(`sum: ${sum}`);
});
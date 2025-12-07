const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('07/input.txt')
});

let lastline = []
let found = 0;

rl.on('line', (line) => {
    let current = line.split('');
    if (lastline.length > 0) {
        for (let i = 0; i < current.length; i++) {
            if (lastline[i] === 'S')
                current[i] = '|';
            if (lastline[i] === '|') {
                if (current[i] === '^') {
                    current[i-1] = '|';
                    current[i+1] = '|';
                    found += 1;
                } else
                    current[i] = lastline[i];
            }
        }
    }
    lastline = current;
});

rl.on('close', () => {
  console.log(`Found: ${found}`);
});
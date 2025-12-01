const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('01/input.txt')
});

let dial = 50;
let found = 0;
let foundall = 0;

rl.on('line', (line) => {
  let direction = line.substring(0, 1);
  let total_rotation = parseInt(line.substring(1), 10);
  let startat0 = (dial === 0);
  let multiples = Math.floor(total_rotation / 100);
  let crossed0 = multiples;
  
  let rotation = total_rotation % 100;

  if (direction === 'L') {
    dial -= rotation;
  } else if (direction === 'R') {
    dial += rotation;
  }
  
  if (dial < 0) {
    dial += 100;
    if (!startat0) crossed0 += 1;
  }
  if (dial > 99) {
    dial -= 100;
    if (!startat0 && dial !== 0) crossed0 += 1;
  }

  if (dial === 0) {
    found += 1;
    foundall += 1;
  }

  foundall += crossed0;

  console.log(`Direction: ${direction}, Rotation: ${total_rotation}, dial: ${dial}, foundall: ${foundall}, found: ${found}, crossed0: ${crossed0}`);
});

rl.on('close', () => {
  console.log(`Found: ${found}, FoundAll: ${foundall}`);
});
const readline = require('readline');
const fs = require('fs');
const { parse } = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream('02/input.txt')
});

let sum = 0;
let sumall = 0;

rl.on('line', (line) => {
  const ranges = line.split(",");

  ranges.forEach((item, index) => {
//    console.log(`${index}: ${item}`);

    const [start, end] = item.split("-").map(str => parseInt(str, 10));
    for (let i = start; i <= end; i++) {
      let numstr = i.toString();
      if (numstr.length % 2 === 0) {
        let substr = numstr.substring(0, numstr.length / 2);
        if (substr.repeat(2) === numstr) {
//            console.log(`a: ${numstr} is invalid,   Repeated substring: ${substr}`);
          sum += parseInt(numstr, 10);
        }
      }
      for (let j = 1; j < numstr.length / 2 + 1; j++) {
        if (numstr.length > 1 && numstr.length % j === 0) {
          let substr = numstr.substring(0, j);
          if (substr.repeat(numstr.length / j) === numstr) {
//            console.log(`b: ${numstr} is invalid,   Repeated substring: ${substr}`);
            sumall += parseInt(numstr, 10);
            break;
          }
        }
      }
      //console.log(`  Number: ${i}`); 
    }
    //console.log(` Start: ${start}, End: ${end}`);
  });
});

rl.on('close', () => {
  console.log(`Sum: ${sum}`);
  console.log(`Sumall: ${sumall}`);
});
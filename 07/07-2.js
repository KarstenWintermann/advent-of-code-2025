const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('07/input.txt')
});

let lines = []
let map = new Map();

rl.on('line', (line) => {
    lines.push(line.split(''));
});

function countTimelines(time, pos) {
//    console.log(`time: ${time}, pos: ${pos}`);
    if (map.has(`${time},${pos}`)) {
        return map.get(`${time},${pos}`);
    }

    let res = 0;
    if (time >= lines.length) res = 1;
    else if (lines[time][pos] === '^') {
        res = (countTimelines(time + 1, pos - 1) + countTimelines(time + 1, pos + 1));
    }
    else res = countTimelines(time + 1, pos);

    map.set(`${time},${pos}`, res);

    return res;
}

rl.on('close', () => {
    found = countTimelines(0, lines[0].indexOf('S'));
    console.log(`Found: ${found}`);
});
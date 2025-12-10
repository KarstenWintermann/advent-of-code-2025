const readline = require('readline');
const fs = require('fs');
const { off } = require('process');

const rl = readline.createInterface({
    input: fs.createReadStream('10/example.txt')
});

let z3script = `from z3 import *\no = Optimize()\n`;

function findLeastPresses(state, requiredstate, buttons, presses, buttonNr) {
    if (state === requiredstate) {
        return presses;
    }
    if (buttonNr >= buttons.length) {
        return Number.MAX_SAFE_INTEGER;
    }
    let left = findLeastPresses(state, requiredstate, buttons, presses, buttonNr + 1);

    let toggled = "";
    for (let i=0; i < state.length; i++) {
        if (buttons[buttonNr].includes(i)) {
            toggled += state[i] === "." ? "#" : ".";
        } else {
            toggled += state[i];
        }
    }
    let right = findLeastPresses(toggled, requiredstate, buttons, presses + 1, buttonNr + 1);

    return Math.min(left, right);
}

let totalPresses = 0;
let lineCounter = 0;

rl.on('line', (line) => {
    let requiredstate = []
    let buttons = []
    let requiredJoltages = []

    line.split(" ").forEach(instruction => {
        if (instruction.startsWith("[")) {
            requiredstate = instruction.substring(1, instruction.length - 1)
        } else if (instruction.startsWith("(")) {
            buttons.push(instruction.substring(1, instruction.length - 1).split(",").map(x => parseInt(x, 10)))
        } else if (instruction.startsWith("{")) {
            requiredJoltages = instruction.substring(1, instruction.length - 1).split(",").map(x => parseInt(x, 10))
        }
    })

    initialJoltages = new Array(requiredstate.length).fill(0);

    totalPresses += findLeastPresses(".".repeat(requiredstate.length), requiredstate, buttons, 0, 0);

    for (let b = 0; b < buttons.length; b++) {
        let bname = `b_${lineCounter}_${b}`;
        z3script += `${bname} = Int('${bname}')\n`;
        z3script += `o.add(${bname}>=0)\n`;
    }

    for (let j = 0; j < requiredJoltages.length; j++) {
        let first = true;
        z3script += `o.add(`;
        for (let b = 0; b < buttons.length; b++) {
            if (buttons[b].includes(j)) {
                if (!first) z3script += `+`;
                first = false;
                z3script += `b_${lineCounter}_${b}`;
            }
        }
        z3script += `==${requiredJoltages[j]})\n`;
    }   
    z3script += `s_${lineCounter} = Int('s_${lineCounter}')\n`;
    let first = true;
    z3script += `o.add(s_${lineCounter}==`;
    for (let b = 0; b < buttons.length; b++) {
        if (!first) z3script += `+`;
        first = false;
        z3script += `b_${lineCounter}_${b}`;
    }
    z3script += `)\n`;

    lineCounter += 1;
});

rl.on('close', () => {

    let start = new Date();
    console.log(`Total presses: ${totalPresses}`);
    console.log(`Execution time part 2: ${new Date() - start} ms`);    

    z3script += `s = Int('s')\n`;
    z3script += `o.add(s==`;
    first = true;
    for (let i = 0; i < lineCounter; i++) {
        if (!first) z3script += `+`;
        first = false;
        z3script += `s_${i}`;
    }
    z3script += `)\n`;

    z3script += `o.minimize(s)\n`;
    z3script += `print(o.check())\n`;
    z3script += `print(o.model()[s])\n`;

    fs.writeFileSync('10/part2.py', z3script); // execute this
});
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('05/input.txt')
});

let fresh = 0;
let allfresh = 0;

let upper = true
let ranges = []
let ingredients = []

rl.on('line', (line) => {
    // empty line? Switch to ingredients
    if (upper && line.length === 0) {
        upper = false;
        return;
    }

    // upper section: ranges
    if (upper) {
        ranges.push(line.split("-").map(str => parseInt(str, 10)))
        return;
    }

    // lower section: ingredients
    ingredients.push(parseInt(line, 10))
});

rl.on('close', () => {
    for (let i = 0; i < ingredients.length; i++) {
        for (let r = 0; r < ranges.length; r++) {
            const [start, end] = ranges[r]
            const ingredient = ingredients[i]
            if (ingredient >= start && ingredient <= end) {
                fresh += 1;
                break;
            }
        }
    }

    let nonOverlapping = []
    for (let r = 0; r < ranges.length; r++) {
        [start, end] = ranges[r]
        for (let r2 = 0; r2 < nonOverlapping.length; r2++) {
            const [start2, end2] = nonOverlapping[r2]
            if (start2 <= end && start <= end2) {
                // Overlap? Merge intervals
                const newStart = Math.min(start, start2)
                const newEnd = Math.max(end, end2)
                nonOverlapping.splice(r2, 1)
                r2--
                start = newStart
                end = newEnd
            }
        }
        nonOverlapping.push([start, end])
    }

    for (let r = 0; r < nonOverlapping.length; r++) {
        const [start, end] = nonOverlapping[r]
        allfresh += (end - start + 1)
    }

    console.log(`Fresh: ${fresh}`);
    console.log(`All Fresh: ${allfresh}`);
});
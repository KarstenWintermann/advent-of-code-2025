const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('04/input.txt')
});

let grid = [];

rl.on('line', (line) => {
    grid.length += 1;
    grid[grid.length-1] = line.split('');
});

function isPaperRoll(row, col) {
    if (row < 0 || row >= grid.length) return 0;
    if (col < 0 || col >= grid[row].length) return 0;
    if (grid[row][col] === '@') return 1;
    return 0; 
}

rl.on('close', () => {
    let found = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (isPaperRoll(row, col) === 1 &&
                isPaperRoll(row-1, col-1) +
                isPaperRoll(row-1, col) +
                isPaperRoll(row-1, col+1) +
                isPaperRoll(row, col-1) +
                isPaperRoll(row, col+1) +
                isPaperRoll(row+1, col-1) +
                isPaperRoll(row+1, col) +
                isPaperRoll(row+1, col+1) < 4)
                found++;
        }
    }

    console.log(`found 1: ${found}`)
   
    let found_total = 0;
    do {
        found = 0;
        let newgrid = [grid.length];
        for (let row = 0; row < grid.length; row++) {
            newgrid[row] = [grid[row].length];
            for (let col = 0; col < grid[row].length; col++) {
                newgrid[row][col] = grid[row][col];
                if (isPaperRoll(row, col) === 1 &&
                    isPaperRoll(row-1, col-1) +
                    isPaperRoll(row-1, col) +
                    isPaperRoll(row-1, col+1) +
                    isPaperRoll(row, col-1) +
                    isPaperRoll(row, col+1) +
                    isPaperRoll(row+1, col-1) +
                    isPaperRoll(row+1, col) +
                    isPaperRoll(row+1, col+1) < 4) {
                        newgrid[row][col] = '.';
                        found++;
                }
            }
        }
        grid = newgrid;
        found_total += found;
    } while (found != 0);

    console.log(`found 2: ${found_total}`)
});
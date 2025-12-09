const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('09/input.txt')
});

let redtiles = []
let max_x = 0;
let max_y = 0;
let grid = [];
let xvalues = []
let yvalues = []

rl.on('line', (line) => {
    let [x, y] = line.split(",").map(x => parseInt(x, 10))
    redtiles.push([x, y]);
    if (!xvalues.includes(x)) xvalues.push(x);
    if (!yvalues.includes(y)) yvalues.push(y);
});

function drawline(x1, y1, x2, y2) {
    if (x1 === x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            grid[x1][y] = 1;
        }
    } else if (y1 === y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            grid[x][y1] = 1;
        }  
    }
}

function floodFillRecursive(grid, x, y, targetColor, startColor) {
    if (x < 0 || x >= grid.length || y < 0
        || y >= grid[0].length ||
        grid[x][y] !== startColor) {
        return;
    }

    grid[x][y] = targetColor;

    floodFillRecursive(grid, x + 1, y, targetColor, startColor);
    floodFillRecursive(grid, x - 1, y, targetColor, startColor);
    floodFillRecursive(grid, x, y + 1, targetColor, startColor);
    floodFillRecursive(grid, x, y - 1, targetColor, startColor);
}

function stackfill() {
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];
    let stack = [{ x: 0, y: 0}];

    grid[0][0] = 2;

    while (stack.length > 0) {
        let current = stack.pop();
        for (let i = 0; i < directions.length; i++) {
            let child = {
                x: current.x + directions[i][0],
                y: current.y + directions[i][1]
            }

        if (child.x >= 0 &&
            child.x < grid.length &&
            child.y >= 0 &&
            child.y < grid[0].length &&
            grid[child.x][child.y] === 0) {
                grid[child.x][child.y] = 2;
                stack.push(child);
            }
        }
    }
}

function containsOutsideField(x1, y1, x2, y2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            if (grid[x][y] === 2)
                return true;
        }
    }   
    return false;
}

rl.on('close', () => {
    let biggestarea = 0;
    for (redtile of redtiles) {
        for (otherredtile of redtiles) {
            let area = (Math.abs(redtile[0] - otherredtile[0])+1) * (Math.abs(redtile[1] - otherredtile[1])+1);
            if (area > biggestarea) {
                biggestarea = area;
            }
        }
    }
    console.log(`biggest area: ${biggestarea}`);

    xvalues.sort((a, b) => a - b);
    yvalues.sort((a, b) => a - b);

    grid = new Array(xvalues.length + 2);
    for (let x = 0; x <= xvalues.length + 2; x++) {
        grid[x] = new Array(yvalues.length + 2).fill(0);
    }

    let lasttile = redtiles[redtiles.length - 1];
    for (redtile of redtiles) {
        drawline(
            xvalues.indexOf(lasttile[0])+1, 
            yvalues.indexOf(lasttile[1])+1, 
            xvalues.indexOf(redtile[0])+1, 
            yvalues.indexOf(redtile[1])+1);
        lasttile = redtile;
    }

    stackfill();

    biggestarea = 0;
    for (redtile of redtiles) {
        for (otherredtile of redtiles) {
            let area = (Math.abs(redtile[0] - otherredtile[0])+1) * (Math.abs(redtile[1] - otherredtile[1])+1);
            if (area > biggestarea && !containsOutsideField(
                xvalues.indexOf(redtile[0])+1, 
                yvalues.indexOf(redtile[1])+1, 
                xvalues.indexOf(otherredtile[0])+1, 
                yvalues.indexOf(otherredtile[1])+1)) {
                biggestarea = area;
            }
        }
    }

    console.log(`biggest area inside: ${biggestarea}`);
});
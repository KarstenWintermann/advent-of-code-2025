const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('08/input.txt')
});

let points = []
let distances = [];

function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2);
}

rl.on('line', (line) => {
    let point = line.split(',').map(x => parseInt(x, 10))
    for (let i = 0; i < points.length; i++) {
        let dist = distance(points[i], point);
        distances.push([dist, i, points.length]);
    }
    points.push(point);
});

rl.on('close', () => {
    distances.sort((a, b) => a[0] - b[0]);
    let circuits = [];
    for (let i = 0; i < 1000; i++) {
        let circuit1 = -1;
        let circuit2 = -1;
        for (let c = 0; c < circuits.length; c++) {
            if (circuits[c].includes(distances[i][1]))
                circuit1 = c;
            if (circuits[c].includes(distances[i][2]))
                circuit2 = c;
        }
        if (circuit1 !== -1 && circuit2 !== -1) {
            if (circuit1 !== circuit2) {
                circuits[circuit1] = circuits[circuit1].concat(circuits[circuit2]);
                circuits.splice(circuit2, 1);
            }
        } else {
            if (circuit1 !== -1)
                circuits[circuit1].push(distances[i][2]);
            else if (circuit2 !== -1)
                circuits[circuit2].push(distances[i][1]);
            else 
                circuits.push([distances[i][1], distances[i][2]]);
        }
    }
    circuits.sort((a, b) => b.length - a.length);
    let size = 1;
    for (let i = 0; i < 3; i++) {
        size *= circuits[i].length;
    }
    console.log(`size: ${size}`);
    
    circuits = []
    for (distance of distances) {
        let circuit1 = -1;
        let circuit2 = -1;
        for (let c = 0; c < circuits.length; c++) {
            if (circuits[c].includes(distance[1]))
                circuit1 = c;
            if (circuits[c].includes(distance[2]))
                circuit2 = c;
        }
        if (circuit1 !== -1 && circuit2 !== -1) {
            if (circuit1 !== circuit2) {
                circuits[circuit1] = circuits[circuit1].concat(circuits[circuit2]);
                circuits.splice(circuit2, 1);
            }
        } else {
            if (circuit1 !== -1)
                circuits[circuit1].push(distance[2]);
            else if (circuit2 !== -1)
                circuits[circuit2].push(distance[1]);
            else 
                circuits.push([distance[1], distance[2]]);
        }
                
        if (circuits.length === 1 && circuits[0].length === points.length) {
            console.log(`part2: ${points[distance[1]][0] * points[distance[2]][0]}`);
            break;
        }
    }

});
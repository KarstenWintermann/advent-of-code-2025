const readline = require('readline');
const fs = require('fs');

const datablocks = fs.readFileSync('12/example.txt', 'utf-8').trim().split('\r\n\r\n');

const shapes = [];
const regions = [];

for (let i = 0; i < datablocks.length-1; i++) {
    const shapelines = datablocks[i].split('\r\n')
    let shape = [];
    let numpieces = 0;
    for (let l = 1; l < shapelines.length; l++) {
        let shapeline = shapelines[l].split(''); 
        numpieces += shapeline.map(x => x === '#' ? 1 : 0).reduce((a, b) => a + b); 
        shape.push(shapeline)
    }
    shapes.push({shape: shape, numpieces: numpieces});
}

const regionlist = datablocks[datablocks.length-1].split('\r\n');
for (region of regionlist) {
    const parts = region.split(' ');
    const size = parts[0].substring(0, parts[0].length-1).split('x').map(x => parseInt(x));
    let numpieces = [];
    for (let y = 1; y < parts.length; y++) {
        numpieces.push(parseInt(parts[y]));
    }
    regions.push({size: size, numpieces: numpieces});
}

let wontfit = 0;
let willfit = 0;

for (region of regions) {
    let size = region.size[0] * region.size[1];
    for (let n=0; n < region.numpieces.length; n++) {
        size -= shapes[n].numpieces * region.numpieces[n];
    }
    if (size < 0) {
        wontfit++;
    }
    let wholecontainers = Math.floor(region.size[0] / 3) * Math.floor(region.size[1] / 3);
    let totalpieces = 0;
    for (numpiece of region.numpieces) {
        totalpieces += numpiece;
    }
    if (totalpieces <= wholecontainers) {
        willfit++;
    }
}

console.log(`wontfit: ${wontfit}`);
console.log(`willfit: ${willfit}`);
console.log(`rest: ${regions.length - wontfit - willfit}`);

//console.log('shapes:', shapes);
//console.log('regions:', regions);
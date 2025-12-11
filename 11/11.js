const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('11/input.txt')
});

const rack = new Map();

rl.on('line', (line) => {
    let sections = line.split(":");
    rack.set(sections[0], sections[1].trim().split(" "));
});

function findPaths(start) {
    if (start === "out") return 1;

    let connections = rack.get(start);
    let num = 0;
    for (connection of connections) {
        num += findPaths(connection)
    }

    return num;
}

const cache = new Map();

function findPaths2(start, end) {

    if (start === end) {
        return 1;
    }

    if (!rack.has(start)) 
        return 0;

    if (cache.has(`${start}.${end}`))
        return cache.get(`${start}.${end}`);

    let connections = rack.get(start);
    let num = 0;

    for (connection of connections) {
        num += findPaths2(connection, end);
    }

    cache.set(`${start}.${end}`, num)

    return num;
}

rl.on('close', () => {

    let start = new Date();
    console.log(`part1: ${findPaths("you")}`);
    console.log(`Execution time part 1: ${new Date() - start} ms`);    

    start = new Date();
    let svrfft = findPaths2("svr", "fft")
    let fftdac = findPaths2("fft", "dac")
    let dacout = findPaths2("dac", "out")
    let svrdac = findPaths2("svr", "dac")
    let dacfft = findPaths2("dac", "fft")
    let fftout = findPaths2("fft", "out")

    console.log(`part2: ${svrfft * fftdac * dacout + svrdac * dacfft * fftout}`)   
    console.log(`Execution time part 2: ${new Date() - start} ms`);    
});
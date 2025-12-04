import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8").trim().split("\r\n");

/*
PART 1
--- Initial thoughts ---
Can break down each check into 
- Is it possible for grid position to have a neighbor in the direction?
- If so, is it another roll or not? +1 if so

PART 2
--- Initial thoughts ---
Seems like a simple update
- Update my grid object to replace any @ that can be picked up with a .

Won't lie - I feel like just looping the method I have like an arbitrarily 
large number of times (say, 100) and printing the solution each iteration. 
Eventually it'll stop growing and settle to the solution.

Spotted halfway through that you need to remove each batch at once. 
Otherwise a small area with no rolls can eat the rest of the page away. 
Sneaky that, the example worked before I spotted it.
*/

const createGrid = (input: string[]) => {
    const grid = new Array();
    input.forEach(row => grid.push(row.split("")));
    return grid;
};

const coordIsOnARoll = (grid: string[], coords: number[]) => {
    const [i, j] = coords;
    return grid[i][j] === "@";
}

const surroundingRollsGreaterThan = (limit: number, grid: string[], coords: number[]) => {
    const [i, j] = coords;
    let n, ne, e, se, s, sw, w, nw = 0;
    n = i > 0
        ? grid[i - 1][j] === "@"
        ? 1 : 0 : 0;
    ne =  i > 0 && j < grid[i].length
        ? grid[i - 1][j + 1] === "@"
        ? 1 : 0 : 0;
    e = j < grid[i].length
        ? grid[i][j + 1] === "@"
        ? 1 : 0 : 0;
    se = i < grid.length - 1 && j < grid[i].length - 1
        ? grid[i + 1][j + 1] === "@"
        ? 1 : 0 : 0;
    s = i < grid.length - 1
        ? grid[i + 1][j] === "@"
        ? 1 : 0 : 0;
    sw = i < grid.length - 1 && j > 0
        ? grid[i + 1][j - 1] === "@"
        ? 1 : 0 : 0;
    w = j > 0
        ? grid[i][j - 1] === "@"
        ? 1 : 0 : 0;
    nw = i > 0 && j > 0
        ? grid[i - 1][j - 1] === "@"
        ? 1 : 0 : 0;
        // console.log(`
        //     ${nw} - ${n} - ${ne}\t\tRow index [${i}, ${j}]
        //     ${w} - ${grid[i][j]} - ${e}\t\tRow[i] is ${grid[i]}, row[i][j] is ${grid[i][j]}
        //     ${sw} - ${s} - ${se}\t\tRoll movable? ${(n + ne + e + se + s + sw + w + nw) < 4}\n`);
    return (n + ne + e + se + s + sw + w + nw) < 4;
}

let grid = createGrid(input);
console.log("Grid:");
console.log(input);

let sol = 0;
let k = 0;
let newGrid = structuredClone(grid);
while (k < 100) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (coordIsOnARoll(grid, [i, j]) && surroundingRollsGreaterThan(4, grid, [i, j])) {
                sol++;
                newGrid[i][j] = ".";
            }
        }
    }
    k++;
    console.log(`Sol is ${sol} after ${k} iteration(s)`);
    grid = structuredClone(newGrid);
}

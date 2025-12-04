import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "example.txt"), "utf8").trim().split("\r\n");
console.log(input);

/*
PART 1
--- Initial thoughts ---
*/

let sol = 0;

const createGrid = (input: string[]): string[] => {
    const grid = new Array();
    input.forEach(row => grid.push(row.split("")));
    return grid;
};

const surroundingRollsGreaterThan = (limit: number, grid: string[], coords: number[]) => {
    const [i, j] = coords;
    let n, ne, e, se, s, sw, w, nw = false;
    if (i > 0 && j > 0) {
        nw = i > 0 && j > 0 ? grid[i-1][j-1] === "@" : false;
        n = i > 0 ? grid[i][j-1] === "@" : false;
        ne = i < grid[i].length && j > 0 ? grid[i+1][j-1] === "@" : false;
    }
}

const grid = createGrid(input);
let sol = 0;
console.log(`Grid: ${grid}, row 1 col 1 is ${grid[1][1]}`);

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        if (surroundingRollsGreaterThan(4, grid, [i, j])) {
            sol++;
        }
    }
}

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

const grid = createGrid(input);
console.log(`Grid: ${grid}, row 1 col 1 is ${grid[1][1]}`);

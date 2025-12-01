import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8").trim().split("\n");
console.log("Input length:", input.length);

// --- Initial thoughts ---
// Use modulo operations
// start at 50, then add or subtract based on L or R from the value using modulo 100

// --- Later the same day ---
// Definitely should just add all the right turns, minus all the left turns, then do modulo of the lot

const isRight = (input: string): boolean => {
    return input.trim().charAt(0) === "R"
};

const extractNumber = (input: string): number => {
    return Number(input.trim().slice(1));
};

let position = 50;
let sol = 0;
let i = 0;

for (let row of input) {
    if(isRight(row)) {
        position = (position + extractNumber(row)) % 100;
    } else {
        position = (position + (100 - extractNumber(row))) % 100;
    }
    sol += position === 0 ? 1 : 0;
    if (i < 25) {
        console.log(`Row: ${row}, Pos: ${position}`);
    }
    i++;
}

console.log(sol);
import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "example.txt"), "utf8").trim().split("\n");
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
let i = 0;

for (let row of input) {
    if(isRight(row)) {
        position += extractNumber(row);
    } else {
        position -= extractNumber(row);
    }
    if (i < 25) {
        console.log(`Row: ${row}, Pos: ${position}`);
    }
    i++;
}

const sol = position % 100;
console.log(sol);
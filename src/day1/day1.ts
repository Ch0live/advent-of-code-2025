import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8").trim().split("\n");

/*
PART 1
--- Initial thoughts ---
Use modulo operations
start at 50, then add or subtract based on L or R from the value using modulo 100

--- Later the same day ---
Definitely should just add all the right turns, minus all the left turns, then do modulo of the lot

PART 2
--- Initial thoughts ---
Will go past 0 if 
- we minus below 0: b > a when a - b
- we add above 100: b + a > 100 when a + b

To increment number of passes of 0
- +1 when b > a when a - b
- +1 when b + a > 100 when a + b
- when extractNumber(row).length > 2, + Number(extractNumber(row).split()[-2])
*/

let i = 0;

const doLog = (row: string, position: number, sol: number): void => {
    if (i < 4100 && i > 4000) {
        console.log(`Row: ${row.trim()}, \t Pos: ${position}, \t Sol: ${sol}`);
    }
    i++;
};

const isRightTurn = (input: string): boolean => {
    return input.trim().charAt(0) === "R"
};

const extractNumber = (input: string): number => {
    return Number(input.trim().slice(1));
};

const isRotatedAntiClockwisePastZero = (rotation: number, position: number): boolean => {
    return rotation % 100 >= position && position !== 0;
};

const isRotatedClockwisePastZero = (rotation: number, position: number): boolean => {
    return position + (rotation % 100) >= 100;
};

const getNumberOfFullRotationsPastZero = (rotation: number, position: number): number => {
    return Math.floor(rotation / 100);
};

const adjustToBelowHundredIfNegative = (position: number): number => {
    return position < 0 ? position + 100 : position;
}

let position = 50;
let sol = 0;

for (let row of input) {
    const rotation = extractNumber(row);
    if(isRightTurn(row)) {
        sol += isRotatedClockwisePastZero(rotation, position) ? 1 : 0;
        position = (position + rotation) % 100;
    } else {
        sol += isRotatedAntiClockwisePastZero(rotation, position) ? 1 : 0;
        position = (position - (rotation % 100));
        position = adjustToBelowHundredIfNegative(position);
    }
    sol += getNumberOfFullRotationsPastZero(rotation, position);
    doLog(row, position, sol);
}

console.log(sol);

import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "example.txt"), "utf8").trim().split("\r\n");

/*
PART 1
--- Initial thoughts ---
If walking left to right we want to not rewrite with equivalent values. 
That way, we give ourselves the largest chance of finding the 2nd highest 
value (as there will be more values to the right of our first).

Rats that doesnt work :(
There will be a clever way to do this...

Half clever way?:
- Find the furthest left of each digit 1-9
- For each, make a pair with every number to its right
- Find highest from pairs
- Find highest from all 9

PARK 2
--- Initial thoughts ---
Can continue my algorithm to just operate 7 times rather than 1 and 
splitting the string we are considering each time.

So
- Find furthest left highest char
- split on it
- In new section to the right of the split, repeat the above algorithm

It's 10pm, I looked up a solution. Turns out I'm almost there.
Just need to allow x spaces to the right of the highest char where 
x is the remaining digits to be found.
*/

const numberOfDigits = 12;
let sol = 0;

const inRange = (i: number, row: string, digitsLeft: number): boolean => {
    return row.length - i - digitsLeft != 0
        ? i + digitsLeft < row.length
        : i < row.length;
}

const getFurthestLeftIndexOfNum = (num: string, row: string, start: number, digitsLeft: number): number | undefined => {
    for (let i = start; inRange(i, row, digitsLeft); i++) {
        // console.log(`row[i] ${row[i]} === ${num} num?`);
        if(row[i] === num) {
            // console.log(`return i of ${i}`);
            return i;
        }
    }
    // console.log(`none found return undefined`);
    return undefined;
};

const getHighestNextDigitIndex = (row: string, startingIdx: number, digitsLeft: number): number => {
    for (let num = 9; num > 0; num--) {
        const idxOfFurthestLeftValue: number | undefined = getFurthestLeftIndexOfNum(String(num), row, startingIdx, digitsLeft);
        if (idxOfFurthestLeftValue === undefined) {
            // console.log(`No ${num} found in row`);
        } else {
            // console.log(`Highest num found with idx ${idxOfFurthestLeftValue}`);
            return idxOfFurthestLeftValue;
        }
    }
    throw Error("Impossible state reached - no numbers found to right of startingIdx");
}

const getHighestNumberIn = (row: string): string => {
    let highestNum = "";
    let idx = 0;
    let digitsLeft = 12;
    for (let i = 0; i < numberOfDigits; i++) {
        console.log(`find getHighestNextDigitIndex for row ${row} and idx ${idx}`);
        const idxOfHighest = getHighestNextDigitIndex(row, idx, digitsLeft);
        highestNum = highestNum + String(row[idx]);
        idx = idxOfHighest + 1;
        digitsLeft--;
        console.log(`highestNum ${highestNum}\tidx ${idx}\tdigitsLeft ${digitsLeft}`);
    }
    return highestNum;
};

for (let i = 0; i < input.length; i++) {
    const highestNumberInRow = getHighestNumberIn(input[i]);
    sol += Number(highestNumberInRow);
    console.log(`${input[i]} has highest ${numberOfDigits} digit number ${highestNumberInRow}, sol is ${sol}`);
}

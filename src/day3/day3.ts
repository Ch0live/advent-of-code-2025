import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "example.txt"), "utf8").trim().split("\n");

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
*/

const getHighestInRowIndex = (row: string): number => {
    // console.log(`String to consider: ${row}`);
    let idxOfHighest = -1;
    let highest = -1;
    for (let i = 0; i < row.length; i++) {
        // console.log(`Considering: ${Number(row[i])} greater than: ${highest}`);
        if (Number(row[i]) > highest) {
            highest = Number(row[i]);
            idxOfHighest = i;
        }
    }
    // console.log(`Return idx: ${idxOfHighest} value: ${highest}`);
    return idxOfHighest;
};

let sol = 0;

for (let i = 0; i < input.length; i++) {
    const firstIdx = getHighestInRowIndex(input[i]);
    const first = input[i][firstIdx];
    const allRightOfFirst = input[i].slice(firstIdx+1)
    const secondIdx = getHighestInRowIndex(allRightOfFirst);
    const second = allRightOfFirst[secondIdx];
    console.log(`firstIdx: ${firstIdx}\tfirst: ${first}\tsecondIdx: ${secondIdx}\tsecond: ${second}`);
}

import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8").trim().split("\r\n");
console.log(input);

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

Cracked it :100:
*/

const numberOfDigits = 12;
let sol = 0;

const getMaxValueIndex = (str: string): number => {
    let max = 0;
    let maxIdx = -1;
    for (let i = 0; i < str.length; i++) {
        if (Number(str[i]) > max) {
            max = Number(str[i]);
            maxIdx = i;
        }
        // console.log(`Number(str[i]) ${Number(str[i])} > ${max}?, max is ${max} maxIdx ${maxIdx}`);
    }
    return maxIdx;
};

const getHighestNumberIn = (row: string): string => {
    let digitsLeft = numberOfDigits;
    let largest = "";
    let nextCharIdx = 0;

    for (let i = 0; i <= row.length && digitsLeft > 0; i++) {
        const start = nextCharIdx;
        const end = row.length - digitsLeft + 1;
        // console.log(`row.length ${row.length}, digitsLeft ${digitsLeft}, end ${end}, row.slice(start, end) ${row.slice(start, end)}`);
        nextCharIdx = getMaxValueIndex(row.slice(start, end)) + nextCharIdx;
        // console.log(`nextCharIdx ${nextCharIdx}`)
        largest = largest + String(row[nextCharIdx]);
        digitsLeft--;
        // console.log(`For ${row.slice(start, end)}, highest is ${row[nextCharIdx]}. Largest is ${largest}, ${digitsLeft} digits left`);
        nextCharIdx++;
        i = nextCharIdx;
    }

    return largest;
};

for (let i = 0; i < input.length; i++) {
    const highestNumberInRow = getHighestNumberIn(input[i]);
    sol += Number(highestNumberInRow);
    console.log(`${input[i]} has highest ${numberOfDigits} digit number ${highestNumberInRow}, sol is ${sol}`);
}

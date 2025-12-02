import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8").trim().split(",");

/*
PART 1
--- Initial thoughts ---
- split to pairs
- for each left pair element (lpe)
  - split in half, check if each half is the same value. If so, sol = sol + lpe
  - lpe++
*/

const isATwoElementRepeatingSequence = (input: string): boolean => {
    const length = input.length;
    if (length % 2 === 1) {
        return false;
    } else {
        const isPair = input.slice(0, length/2) === input.slice(-(length/2));
        if (isPair) {
            console.log(`Match: ${input.slice(0, length/2)} -- ${input.slice(-(length/2))}`);
        }
        return isPair;
    }
};

let sol = 0;

for (let i = 0; i < input.length; i++) {
    const elementPair = input[i].split("-");
    let leftPairElement = elementPair[0];
    let rightPairElement = elementPair[1];
    
    console.log(`elementPair: ${elementPair}, \t\t leftPairElement: ${leftPairElement}, \t\t rightPairElement: ${rightPairElement}`);

    let j = Number(leftPairElement);
    const end = Number(rightPairElement);
    let match = false;

    while (j <= end) {
        if (isATwoElementRepeatingSequence(String(j))) {
            
            sol = sol + j;
        }
        j++;
    }
}

console.log(`sol: ${sol}`);

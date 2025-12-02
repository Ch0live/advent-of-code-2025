import { readFileSync } from "node:fs";
import { join } from "node:path";

const input = readFileSync(join(__dirname, "example.txt"), "utf8").trim().split(",");

/*
PART 1
--- Initial thoughts ---
- split to pairs
- for each left pair element (lpe)
  - split in half, check if each half is the same value. If so, sol = sol + lpe
  - lpe++

PART 2
--- Initial thoughts ---
- for each left pair element (lpe)
  - split on (length / 2 - n) where n decreases to 1, take first half
  - if first half repeats after index, success, else move on
*/

const containsARepeatingSequence = (input: string): boolean => {
    let n = Math.floor(input.length / 2);
    while (n > 0) {
        console.log(`Matching pairs: ${input.slice(0, n)} -- ${input.slice(n, 2*n)}`);
        if (input.slice(0, n) === input.slice(n, 2*n)) {
            return true;
        }
        n--;
    }
    return false;
};

let sol = 0;

for (let i = 0; i < input.length; i++) {
    const elementPair = input[i].split("-");
    let leftPairElement = elementPair[0];
    let rightPairElement = elementPair[1];
    
    console.log(`elementPair: ${elementPair}, \t\t leftPairElement: ${leftPairElement}, \t\t rightPairElement: ${rightPairElement}`);

    let j = Number(leftPairElement);
    const end = Number(rightPairElement);

    while (j <= end) {
        if (containsARepeatingSequence(String(j))) {
            sol = sol + j;
            console.log(`Match! sol: ${sol}`);
        }
        j++;
    }
}

console.log(`sol: ${sol}`);

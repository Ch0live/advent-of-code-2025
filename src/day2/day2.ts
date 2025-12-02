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

PART 2
--- Initial thoughts ---
Lets switch to array indexes, maybe do some recursion too
- for an input, split into a list of chars
- create n where n = Math.floor(input.length / 2);
- for n where n > 0 and n-- each iteration
  - for m = 0 where m < length
    - if input.slice(m, n) === input.slice(n, n**m)


What about splitting the string on the range we're looking at?
for an input
- for n where n = 0, n < Math.floor(length / 2), n++
  - split and append all subsections (input.match(/.{1,n}/g))
  - if all elements are equal, return true
*/

const containsARepeatingSequence = (input: string): boolean => {
    let allMatchInOneSequence = false;
    for (let n = 1; n < input.length; n++) {
        const subSetOfInput = input.match(new RegExp(`.{1,${n}}`, 'g'));
        // console.log(subSetOfInput);
        if (subSetOfInput?.every(el => el === subSetOfInput[0])) {
            allMatchInOneSequence = true;
            console.log(`Match! subSetOfInput: ${subSetOfInput}`);
            break;
        }
    }
    return allMatchInOneSequence;
};

let sol = 0;

for (let i = 0; i < input.length; i++) {
    const elementPair = input[i].split("-");
    let leftPairElement = elementPair[0];
    let rightPairElement = elementPair[1];
    
    console.log(`elementPair: ${elementPair} \t leftPairElement: ${leftPairElement} \t rightPairElement: ${rightPairElement}`);

    let j = Number(leftPairElement);
    const end = Number(rightPairElement);

    while (j <= end) {
        if (containsARepeatingSequence(String(j))) {
            sol = sol + j;
        }
        j++;
    }
}

console.log(`sol: ${sol}`);

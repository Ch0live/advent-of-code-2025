import { readFileSync } from "node:fs";
import { join } from "node:path";

const [rangesSection, ingredientsSection] = readFileSync(join(__dirname, "input.txt"), "utf8").trim().split("\r\n\r\n");
const ranges = rangesSection.split("\r\n");
const ingredients = ingredientsSection.split("\r\n");

/*
PART 1
--- Initial thoughts ---
Bloody larger than 4.29 billion size ranges
For each ingredient
  for each range
    sol += ingredient < range[0] && ingredient > range[1] ? 1 : 0
*/

console.log(`ranges ${ranges} & ingredients ${ingredients}`);

const isFresh = (ingredientId: number) => {
    for (let i = 0; i < ranges.length; i++) {
        const [start, end] = ranges[i].trim().split("-");
        // console.log(`does range [${start}-${end}] contain ingredient ${ingredientId}?`);
        if (ingredientId >= Number(start) && ingredientId <= Number(end)) {
        console.log(`range [${start}-${end}] contains ingredient ${ingredientId}!`);
            // console.log(`yes`);
            return true;
        }
    }
    // console.log(`no`);
    return false;
};

let sol = 0;
for (let i = 0; i < ingredients.length; i++) {
    const id = ingredients[i];
    // console.log(`Checking ingredient ${id}...`);
    if (isFresh(Number(id))) {
        sol++;
    }
}
console.log(`Sol is ${sol}`);

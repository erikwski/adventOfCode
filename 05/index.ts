import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  try {
    const lines: string[] = readFileSync("05/data.txt", { encoding: "utf-8" }) // read day??.txt content
      .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
      .trim() // Remove starting/ending whitespace
      .split("\n"); // Split on newline

    console.log("RESULT A: ");
    console.log(part1(lines));

    console.log("RESULT B: ");
    console.log(part2(lines));
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

function part1(data: string[]) {
  const orderMap = new Map();
  let x = true;
  let sum = 0;

  for (const l of data) {
    if (l === '') {
      x = false;
      continue;
    }

    if (x) {
      const [before, after] = l.split('|').map((s) => parseInt(s));
      if (orderMap.has(after)) {
        orderMap.get(after).push(before);
      } else {
        orderMap.set(after, [before]);
      }

      continue;
    }

    const update = l.split(',').map((s) => parseInt(s));
    const mid = Math.floor(update.length / 2);
    let valid = true;
  
    for (let i = 0, j = i + 1; i < update.length - 1; i++, j++) {
      const [page1, page2] = [update[i], update[j]];
      if (orderMap.has(page1) && orderMap.get(page1).includes(page2)) {
        valid = false;
        break;
      }
    }

  sum += valid ? update[mid] : 0;
  }

  return sum;
}

function part2(data: string[]) {
  const orderMap = new Map();
  let x = true;
  let sum = 0;

  for (const l of data) {
    if (l === "") {
      x = false;
      continue;
    }

    if (x) {
      const [before, after] = l.split("|").map((s) => parseInt(s));
      if (orderMap.has(after)) {
        orderMap.get(after).push(before);
      } else {
        orderMap.set(after, [before]);
      }

      continue;
    }

    const update = l.split(",").map((s) => parseInt(s));
    const mid = Math.floor(update.length / 2);

    const finderr = () => {
      for (let i = 0, j = i + 1; i < update.length - 1; i++, j++) {
        const [page1, page2] = [update[i], update[j]];
        if (orderMap.has(page1) && orderMap.get(page1).includes(page2)) {
          return i;
        }
      }
    };

    let err = finderr();

    if (err === undefined) continue;

    do {
      const [k, l] = [update[err], update[err + 1]];
      update[err] = l;
      update[err + 1] = k;
      err = finderr();
    } while (err !== undefined);

    sum += update[mid];
  }

  return sum;
}

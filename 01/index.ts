import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  
  try {
    const lines: string[] = readFileSync("01/data.txt", { encoding: "utf-8" }) // read day??.txt content
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

function part1(data: string[]): string {
  const { listOne, listTwo } = splitEvenOddPositionsAndSort(data);
  let distance = 0;

  listOne.forEach((val, index) => {
    distance += Math.abs(val - listTwo[index]);
  });

  return distance.toString();
}

function part2(data: string[]): number {
  const { listOne, listTwo } = splitEvenOddPositionsAndSort(data);
  let similarity = 0;

  listOne.forEach((value) => {
    let countInListTwo = 0;
    listTwo.forEach((a) => a === value && countInListTwo++);
    similarity += value * countInListTwo;
  });

  return similarity;
}


function splitEvenOddPositionsAndSort(arr: string[]): {
  listOne: number[];
  listTwo: number[];
} {
  const listOne: number[] = [];
  const listTwo: number[] = [];

  arr.forEach((value) => {
    const values = value.split("   "); // Ensure this is the correct delimiter
    if (values.length === 2) {
      listOne.push(+values[0]);
      listTwo.push(+values[1]);
    }
  });

  listOne.sort((a, b) => a - b);
  listTwo.sort((a, b) => a - b);

  return { listOne, listTwo };
}

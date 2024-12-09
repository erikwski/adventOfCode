import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  try {
    const lines: string[] = readFileSync("03/data.txt", { encoding: "utf-8" }) // read day??.txt content
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
  const regex = /\bmul\(\d+,\d+\)/g;
  let findValues = [];
  for (let index = 0; index < data.length; index++) {
    console.log(data[index]);

    findValues = [...findValues, ...data[index].match(regex)];
  }
  console.log(findValues);

  let total = 0;

  findValues.forEach((val) => {
    val = val.slice(0, val.length - 1);
    val = val.split("mul(")[1];

    const a = +val.split(",")[0];
    const b = +val.split(",")[1];
    total += a * b;
  });

  return total;
}

function part2(data: string[]) {
  // mady with py
  return "Made with PY"
}

// a.ts

import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute() {
  const lines = readFileSync("01/sample.txt", { encoding: "utf-8" }) // read day??.txt content
    .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
    .trim() // Remove starting/ending whitespace
    .split("\n"); // Split on newline

  function part1() {
    console.log(lines);
    return 0;
  }

  function part2() {}

  console.log("RESULT A: ");
  console.log(part1());

  console.log("RESULT B: ");
  console.log(part2());
}

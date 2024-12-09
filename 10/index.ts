import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  try {
    const lines: string[] = readFileSync("dayNumber/data.txt", { encoding: "utf-8" }) // read day??.txt content
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
  console.log("Part 1 not implemented yet.");
}

function part2(data: string[]) {
  // Add your part2 logic here
  console.log("Part 2 not implemented yet.");
}

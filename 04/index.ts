import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  try {
    const lines: string[] = readFileSync("04/data.txt", { encoding: "utf-8" }) // read day??.txt content
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

function part1(lines: string[]) {
  let found = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] != "X") continue;

      if (y > 2) {
        if (
          lines[y - 1][x - 1] == "M" &&
          lines[y - 2][x - 2] == "A" &&
          lines[y - 3][x - 3] == "S"
        )
          found++;
        if (
          lines[y - 1][x] == "M" &&
          lines[y - 2][x] == "A" &&
          lines[y - 3][x] == "S"
        )
          found++;
        if (
          lines[y - 1][x + 1] == "M" &&
          lines[y - 2][x + 2] == "A" &&
          lines[y - 3][x + 3] == "S"
        )
          found++;
      }

      if (
        lines[y][x - 1] == "M" &&
        lines[y][x - 2] == "A" &&
        lines[y][x - 3] == "S"
      )
        found++;
      if (
        lines[y][x + 1] == "M" &&
        lines[y][x + 2] == "A" &&
        lines[y][x + 3] == "S"
      )
        found++;

      if (y < lines.length - 3) {
        if (
          lines[y + 1][x - 1] == "M" &&
          lines[y + 2][x - 2] == "A" &&
          lines[y + 3][x - 3] == "S"
        )
          found++;
        if (
          lines[y + 1][x] == "M" &&
          lines[y + 2][x] == "A" &&
          lines[y + 3][x] == "S"
        )
          found++;
        if (
          lines[y + 1][x + 1] == "M" &&
          lines[y + 2][x + 2] == "A" &&
          lines[y + 3][x + 3] == "S"
        )
          found++;
      }
    }
  }

  return found;
}

function part2(lines: string[]) {
  let found = 0;
  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[y].length - 1; x++) {
      if (lines[y][x] != "A") continue;

      if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") {
        if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") found++;
        if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") found++;
        continue;
      }
      if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") {
        if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") found++;
        if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") found++;
        continue;
      }
      if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") {
        if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") found++;
        if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") found++;
        continue;
      }
      if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") {
        if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") found++;
        if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") found++;
        continue;
      }
    }
  }
  return found;
}

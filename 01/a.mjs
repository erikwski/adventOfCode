import { readFileSync } from "node:fs";

const lines = readFileSync("01/sample.txt", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

function part1() {
  console.log(lines);
  
}

function part2() {
  const calories = elves.map((elf) => {
    const calories = elf.split("\n").map(Number);
    return calories.reduce((previous, current) => previous + current, 0);
  });

  calories.sort((a, b) => b - a);

  console.log(
    calories.slice(0, 3).reduce((previous, current) => previous + current, 0)
  );
}

part1();
// part2();

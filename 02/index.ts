import { readFileSync } from "node:fs";

// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  try {
    const lines: string[] = readFileSync("02/data.txt", { encoding: "utf-8" }) // read day??.txt content
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
  const list = getListOfReport(data);
  let countSafe = 0;
  list.forEach(report=>{
    let isSafe = true;
    let orderType = report[0] > report[1] ? 'asc' : 'desc';
    report.forEach(
      (val, idx) => {
        let compareToNext = report[idx + 1] - val;
        if (
          idx < report.length - 1 &&
          (
            Math.abs(compareToNext) > 3 ||
            (orderType == 'asc' && compareToNext > 0) ||
            (orderType == 'desc' && compareToNext < 0) ||
            compareToNext == 0
          )
        ) {
          isSafe = false;
        }
      }
    );
    
    isSafe && countSafe++;
  })

  return countSafe;
}

function part2(data: string[]) {
  const list = getListOfReport(data);
  let countSafe = 0;
  list.forEach((report) => {
    let orderType = report[0] > report[1] ? "asc" : "desc";
    let badLevel = 0;

    for (let idx = 0; idx < report.length - 1; idx++) {
      const val = report[idx];
      let compareToNext = report[idx + 1] - val;

      if (
        Math.abs(compareToNext) > 3 ||
        (orderType == "asc" && compareToNext > 0) ||
        (orderType == "desc" && compareToNext < 0) ||
        compareToNext == 0
      ) {
        if (badLevel == 0) {
          console.log("removing", report[idx]);

          report.splice(idx, 1);
          //start loop again
          idx = 0;
          orderType = report[0] > report[1] ? "asc" : "desc";
        }
        badLevel++;
      }
    }
    console.log(report, badLevel);

    if (badLevel < 2) countSafe++;
  });

  return countSafe;
}

function getListOfReport(list: string[]) : number[][]{
  return list.map((report)=> report.split(" ").map(val=> +val));
}
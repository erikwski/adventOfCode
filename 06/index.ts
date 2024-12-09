import { readFileSync } from "node:fs";

type Direction = "up" | "down" | "right" | "left";
const wall = "#";
// Wrap your code in a function to avoid global scope conflicts
export function execute(): void {
  try {
    const lines: string[] = readFileSync("06/data.txt", { encoding: "utf-8" }) // read day??.txt content
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
  let path: string[][] = [];
  const guard = "^";
  let direction: Direction;
  let row = null;
  let column = null;
  for (let idx = 0; idx < data.length; idx++) {
    path[idx] = data[idx].split("");

    if (path[idx].includes("^")) {
      row = idx;
      column = path[idx].findIndex((el) => el == "^");
      direction = 'up';
    }
  }
  console.log(row, column);
  

  let notExit = true;
  let count = 0;
  while (notExit) {
    if (path[row][column] != "X") {
      path[row][column] = "X";
      count++;
    } 
    
    switch (direction) {
      case "left":
        if (column == 0) {
          notExit = false;
        } else if (path[row][column - 1] == wall) {
          direction = switchDirection90Degree(direction);
        } else {
          column--;
        }
        break;
      case "right":
        if (column == path.length - 1) {
          notExit = false;
        } else if (path[row][column + 1] == wall) {
          direction = switchDirection90Degree(direction);
        } else {
          column++;
        }
        break;
      case "down":
        if (row == path[0].length - 1) {
          notExit = false;
        } else if (path[row + 1][column] == wall) {
          direction = switchDirection90Degree(direction);
        } else {
          row++;
        }
        break;
      case "up":
        if (row == 0) {
          notExit = false;
        } else if (path[row - 1][column] == wall) {
          direction = switchDirection90Degree(direction);
        } else {
          row--;
        }
        break;
    }
  }
  
  for(let line of path){
    let string = "";
    for(let l of line){
      string += l + " ";
    }
    console.log(string);
  }
  
  return count;
}

function part2(data: string[]) {
  let gridSize = 0;
  let guard;
  const obstacles = {};
  let possibleObstacles = 0;

  for (const line of data) {
    const l = line.toString();

    for (let j = 0; j < l.length; j++) {
      const vec = { x: j, y: gridSize };

      if (l[j] === "^") {
        guard = { ...vec, dir: "^", path: [] };
      }

      if (l[j] === "#") {
        if (obstacles[vec.x]) obstacles[vec.x].push(vec.y);
        else obstacles[vec.x] = [vec.y];
      }
    }

    gridSize++;
  }

  function isOutOfBounds({ x, y }) {
    return x < 0 || x >= gridSize || y < 0 || y >= gridSize;
  }

  function containsObstacle({ x, y }, o) {
    return o[x] && o[x].includes(y);
  }

  function getNext(g) {
    if (g.dir === "^") return { ...g, y: g.y - 1 };
    if (g.dir === ">") return { ...g, x: g.x + 1 };
    if (g.dir === "v") return { ...g, y: g.y + 1 };
    if (g.dir === "<") return { ...g, x: g.x - 1 };
  }

  function detectLoop(g) {
    return g.path.length > 2 * Math.pow(gridSize, 2);
  }

  function turn(g) {
    if (g.dir === "^") g.dir = ">";
    else if (g.dir === ">") g.dir = "v";
    else if (g.dir === "v") g.dir = "<";
    else if (g.dir === "<") g.dir = "^";
  }

  function recordPath(g) {
    g.path.push({ x: g.x, y: g.y });
  }

  function move(g, o) {
    recordPath(g);

    const next = getNext(g);

    if (isOutOfBounds(next)) {
      return false;
    }

    if (detectLoop(g)) {
      throw new Error("Loop detected!");
    }

    if (containsObstacle(next, o)) {
      turn(g);
    } else {
      g.x = next.x;
      g.y = next.y;
    }

    return true;
  }

  function placeObstacle({ x, y }, o) {
    if (x === guard.x && y === guard.y) return;
    if (containsObstacle({ x, y }, o)) return;

    if (o[x]) o[x].push(y);
    else o[x] = [y];

    return true;
  }

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const g = JSON.parse(JSON.stringify(guard));
      const o = JSON.parse(JSON.stringify(obstacles));

      placeObstacle({ x, y }, o);

      try {
        while (move(g, o)) {
          /**/
        }
      } catch {
        possibleObstacles++;
      }
    }
  }
}

function switchDirection90Degree(direction: Direction): Direction {
  if (direction == "up") return "right";
  if (direction == "right") return "down";
  if (direction == "down") return "left";
  if (direction == "left") return "up";
  throw new Error("Invalid direction");
}
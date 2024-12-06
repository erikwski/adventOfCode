import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4b(lines: string[]) {
  let found = 0;
  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[y].length - 1; x++) {
      if (lines[y][x] != 'A') continue;

      if (lines[y - 1][x - 1] == 'M' && lines[y + 1][x + 1] == 'S') {
        if (lines[y + 1][x - 1] == 'M' && lines[y - 1][x + 1] == 'S') found++;
        if (lines[y - 1][x + 1] == 'M' && lines[y + 1][x - 1] == 'S') found++;
        continue;
      }
      if (lines[y - 1][x + 1] == 'M' && lines[y + 1][x - 1] == 'S') {
        if (lines[y + 1][x + 1] == 'M' && lines[y - 1][x - 1] == 'S') found++;
        if (lines[y - 1][x - 1] == 'M' && lines[y + 1][x + 1] == 'S') found++;
        continue;
      }
      if (lines[y + 1][x - 1] == 'M' && lines[y - 1][x + 1] == 'S') {
        if (lines[y - 1][x - 1] == 'M' && lines[y + 1][x + 1] == 'S') found++;
        if (lines[y + 1][x + 1] == 'M' && lines[y - 1][x - 1] == 'S') found++;
        continue;
      }
      if (lines[y + 1][x + 1] == 'M' && lines[y - 1][x - 1] == 'S') {
        if (lines[y - 1][x + 1] == 'M' && lines[y + 1][x - 1] == 'S') found++;
        if (lines[y + 1][x - 1] == 'M' && lines[y - 1][x + 1] == 'S') found++;
        continue;
      }
    }
  }
  return found;
}

await runSolution(day4b);

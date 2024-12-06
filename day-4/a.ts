import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4a(lines: string[]) {
  let found = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] != 'X') continue;

      if (y > 2) {
        if (
          lines[y - 1][x - 1] == 'M' &&
          lines[y - 2][x - 2] == 'A' &&
          lines[y - 3][x - 3] == 'S'
        )
          found++;
        if (
          lines[y - 1][x] == 'M' &&
          lines[y - 2][x] == 'A' &&
          lines[y - 3][x] == 'S'
        )
          found++;
        if (
          lines[y - 1][x + 1] == 'M' &&
          lines[y - 2][x + 2] == 'A' &&
          lines[y - 3][x + 3] == 'S'
        )
          found++;
      }

      if (
        lines[y][x - 1] == 'M' &&
        lines[y][x - 2] == 'A' &&
        lines[y][x - 3] == 'S'
      )
        found++;
      if (
        lines[y][x + 1] == 'M' &&
        lines[y][x + 2] == 'A' &&
        lines[y][x + 3] == 'S'
      )
        found++;

      if (y < lines.length - 3) {
        if (
          lines[y + 1][x - 1] == 'M' &&
          lines[y + 2][x - 2] == 'A' &&
          lines[y + 3][x - 3] == 'S'
        )
          found++;
        if (
          lines[y + 1][x] == 'M' &&
          lines[y + 2][x] == 'A' &&
          lines[y + 3][x] == 'S'
        )
          found++;
        if (
          lines[y + 1][x + 1] == 'M' &&
          lines[y + 2][x + 2] == 'A' &&
          lines[y + 3][x + 3] == 'S'
        )
          found++;
      }
    }
  }
  
  return found;
}



await runSolution(day4a);

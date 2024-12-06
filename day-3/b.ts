import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  let p1 = 0
  let p2 = 0
  let count = true;
  for(let line of data){
    line.matchAll(/(do\(\))|(don\'t\(\))|(mul\((?<a>\d{1,3})),((?<b>\d{1,3}))\)/g)
        .forEach(match => {
            if (match[0] === 'do()') {
                count = true
            } else if (match[0] === 'don\'t()') {
                count = false
            } else {
                const result = match.groups.a * match.groups.b
                p1 += result
                if (count) {
                    p2 += result
                }
            }
    }, 0)
  }

  console.log(p1, 'p1');
  console.log(p2, 'p2');

    return total;
}

function processMemory(input: string) {
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  const controlRegex = /do\(\)|don't\(\)/g;

  let isMulEnabled = true;
  let sum = 0;

  let position = 0;
  while (position < input.length) {
    const mulMatch = mulRegex.exec(input);
    const controlMatch = controlRegex.exec(input);

    if (!mulMatch && !controlMatch) break;

    if (controlMatch && (!mulMatch || controlMatch.index < mulMatch.index)) {
      // Handle do() or don't()
      isMulEnabled = controlMatch[0] === 'do()';
      position = controlRegex.lastIndex;
    } else if (mulMatch) {
      if (isMulEnabled) {
        const a = parseInt(mulMatch[1], 10);
        const b = parseInt(mulMatch[2], 10);
        sum += a * b;
      }
      position = mulRegex.lastIndex;
    }
  }

  return sum;
}

await runSolution(day3b);

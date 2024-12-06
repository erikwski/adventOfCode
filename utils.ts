import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function runSolution(solution: (data: string[]) => any) {
  const data = await readData();
  const answer = await solution(data);
  console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
}

export async function readData() {
  const [_, fullPath, dataSet] = process.argv as
    | [string, string, string]
    | [string, string];
  console.log(fullPath);
  const puzzle = fullPath.split('\\').slice(-2).join('\\');
  console.log(puzzle);
  const [day, part] = puzzle
    .split('\\')
    .map((x, i) => (i === 0 ? +x.split('-')[1] : x)) as [number, 'a' | 'b'];
  const fileName = createFileName(day, part, dataSet);
  console.log('filename', fileName);
  const data = (await readFile(fileName))
    .toString()
    .replaceAll('\r', '')
    .split('\n');
  return data;
}

function createFileName(day: number, part: 'a' | 'b', dataSet?: string) {
  return join(`day-${day}`, `${part}.data${dataSet ? `.${dataSet}` : ''}.txt`);
}

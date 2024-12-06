import { runSolution } from '../utils.ts';
import { splitEvenOddPositionsAndSort } from './a.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  const { listOne, listTwo } = splitEvenOddPositionsAndSort(data);
  let similarity = 0;

  listOne.forEach(value=>{
    let countInListTwo = 0;
    listTwo.forEach(a=> a === value && countInListTwo++)
    similarity += value * countInListTwo;
  })

  return similarity;
}

await runSolution(day1b);

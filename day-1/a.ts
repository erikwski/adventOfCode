import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  // console.log(data);
  const { listOne, listTwo } = splitEvenOddPositionsAndSort(data);
  let distance = 0;

  
  listOne.forEach((val, index)=>{    
    distance += Math.abs(val - listTwo[index])
  })
    
  return distance.toString();
}

export function splitEvenOddPositionsAndSort(arr: string[]): {
  listOne: number[];
  listTwo: number[];
} {
  const listOne: number[] = [];
  const listTwo: number[] = [];

  arr.forEach((value) =>{
    const values = value.split('   ');
    listOne.push(+values[0]);
    listTwo.push(+values[1]);
  }
  );

  listOne.sort((a, b) => a - b);
  listTwo.sort((a, b) => a - b);

  return { listOne, listTwo };
}

await runSolution(day1a);

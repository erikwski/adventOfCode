import { runSolution } from '../utils.ts';

type Direction = 'up' | 'down' | 'right' | 'left';


/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  let path : string[][] = []
  const guard = '^';
  const direction: Direction = 'up';
  for(const [index, value] of data){
    path[index] = value.split("");
  }
  console.log(JSON.stringify(path));
  
  return 0;
}

function switchDirection90Degree(direction: Direction): Direction{
  if(direction == 'up') return 'right';
  if (direction == 'right') return 'down';
  if (direction == 'down') return 'left';
  if (direction == 'left') return 'up';
  throw new Error("Invalid direction")
};

await runSolution(day6a);

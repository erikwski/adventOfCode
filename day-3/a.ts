import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  const regex = /\bmul\(\d+,\d+\)/g;
  let findValues = [];
  for (let index = 0; index < data.length; index++) {
    console.log(data[index]);
    
    findValues = [
      ...findValues,
      ...data[index].match(regex)
    ];
  }
  console.log(findValues);
  
  let total = 0;

  findValues.forEach((val)=>{
    val = val.slice(0, val.length - 1);
    val = val.split("mul(")[1];
    
    const a = +val.split(",")[0];
    const b = +val.split(',')[1];
    total += a*b;
  })
  
  
  
  return total;
}

await runSolution(day3a);

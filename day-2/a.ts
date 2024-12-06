import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  console.log(data);
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

export function getListOfReport(list: string[]) : number[][]{
  return list.map((report)=> report.split(" ").map(val=> +val));
}

await runSolution(day2a);

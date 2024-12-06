import { runSolution } from '../utils.ts';
import { getListOfReport } from './a.ts';

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  console.log(data);
  const list = getListOfReport(data);
  let countSafe = 0;
  list.forEach((report) => {
    let orderType = report[0] > report[1] ? 'asc' : 'desc';
    let badLevel = 0;

    for (let idx = 0; idx < report.length - 1; idx++) {
      const val = report[idx];
      let compareToNext = report[idx + 1] - val;
  
      if (
        Math.abs(compareToNext) > 3 ||
          (orderType == 'asc' && compareToNext > 0) ||
          (orderType == 'desc' && compareToNext < 0) ||
          compareToNext == 0
      ) {
        if (badLevel == 0){
          console.log("removing", report[idx]);
          
          report.splice(idx, 1);
          //start loop again
          idx = 0;
          orderType = report[0] > report[1] ? 'asc' : 'desc';
        } 
        badLevel++;
      }
    }
    console.log(report, badLevel);
    
    if(badLevel < 2) countSafe++;
  });

  return countSafe;
}

await runSolution(day2b);

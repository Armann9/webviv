import { gamesData } from './gpt2.js';
import { dataMysql } from './addDbv1.js';

let timeCount = 0;

try {
    while (timeCount < 4) {
 await dataMysql(gamesData)
timeCount ++;
// console.log(new Date())
// console.log(timeCount)
        
    }
} catch (error) {
    
}
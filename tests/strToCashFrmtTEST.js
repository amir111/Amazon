//Some code to test strToCashFormat.js to run an automated test (automated testing = using code to test code)
//Call this file from test.html b/c .js files can't just run themselves. 

import { convertToCashFormat } from '../scripts/utils/strToCashFormat.js'

//Testing a specific situation. "Situation" same thing as saying "test case". 
// Test case 1 (basic)
if (convertToCashFormat(2099) === '20.99') {
  console.log('passed');
} else {
  console.log('failed');
}

// add another test, (test case 2) (edge case 1)
if (convertToCashFormat(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

//Test case 3 (edge case 2)
if (convertToCashFormat(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

//Q: So how many test cases do we need? 
//A: Basic test cases and edge cases (if edge cases exist). Normal input, and edge cases (tricky situations). 

//Test case 4 (edge case 3)
if (convertToCashFormat(2000.4) === '20.00') {
  console.log('passed TC4');
} else {
  console.log('failed TC4');
}
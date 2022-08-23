// add whatever parameters you deem necessary
// input: 2 nums
// output: true / false
// constraints: time complexity O(N+M)
// input type: integers

// check if digits in both num happen to have the same frequency

// helper function
function countNum(num) {
    // return a map object with keys of num and values of count
    let freqNum = {};
    let numArr = num.toString().split('');
    for (let digit of numArr) {
        freqNum[digit] = (freqNum[digit] + 1) || 1;
    }

    return freqNum;
}

function sameFrequency(num1, num2) {
  // check nums' length if they are equal
  if (num1.length !== num2.length) return false;

  // count digits in each input num
  let obj1 = countNum(num1);
  let obj2 = countNum(num2);

  // check if num1's key is in num2 keys
  // check if num1 key's values = num2 key's values
  for (let key in obj1) {
    if (!obj2[key]) return false;
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

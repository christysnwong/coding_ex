// add whatever parameters you deem necessary

// returns consecutive decreasing integers
// inputs - array of integers
// outputs - length of longest

function longestFall(arr) {
  if (arr.length === 0) return 0;
  // use 2 pointers p1, p2
  // if p1 value > p2 value, p1++, p2++, len++
  // if p1 value <= p2 value, maxLength = Math.max(len, maxLength), len = 1, p1++, p2++
  // return maxLength
  let maxLength = 1;
  let len = 1;
  let p1 = 0;
  let p2 = p1 + 1;

  while (p2 < arr.length) {
    if(arr[p1] > arr[p2]) {
      len++;
      maxLength = Math.max(len, maxLength);
    } else {
      len = 1;
    }
    
    p1++;
    p2++;

  }

  return maxLength;
}

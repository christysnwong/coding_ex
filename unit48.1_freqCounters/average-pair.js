// add whatever parameters you deem necessary
// check if any pair of values in array = target avg
// inputs: array, target average
// output: true or false
// input type: array and nums
// constraint: time complexity O(N)

function averagePair(arr, tgtAvg) {
    // use 2 pointers pointing to the array index 0 and last index
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
      // cal avg of 2 values
      let avg = (arr[left] + arr[right]) / 2;
      
      // if avg = target avg, return true
      if (avg === tgtAvg) return true;
      // if vals' avg > target avg, move right pointer to left
      // if vals' avg < target avg, move left pointer to right
      if (avg > tgtAvg) {
        right--;
      } else {
        left++;
      }
    }
    
    return false;


}

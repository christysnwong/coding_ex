// add whatever parameters you deem necessary

// input - array of non-zero integers
// output - array of pos nums on left and neg nums on right
// constraints - no copy of input array, done in place
// constraints 2 - time complex O(N)

function separatePositive(arr) {
  // use for loop to go over each value
  // for neg value, move to the end of array
  // by keeping track of sorted index and swapping values for positive to sorted Idx
  let sortedIdx = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      [arr[i], arr[sortedIdx]] = [arr[sortedIdx], arr[i]];
      sortedIdx++;
    }
  }

  return arr;
}

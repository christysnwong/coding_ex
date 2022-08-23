// add whatever parameters you deem necessary
// input - arr of integers
// input type - nums, pos or neg
// output - pivot index
// find pivot idx which left of pivotIdx's sum = right of pivotIdx's sum
// constraints: time complex O(n)

function pivotIndex(arr) {
  // assume pivotIdx = 2nd value of array
  // cal left sum
  // cal right sum
  // compare left sum and right sum
  // if left sum = right sum, ans.push(idx)
  // pivotIdx++

  let ans = 0;
  let pivotIdx = 1;
  let leftSum = 0;

  let rightArr = arr.slice(pivotIdx);
  let rightSum = rightArr.reduce((sum, val) => sum + val, 0);

  while (pivotIdx < arr.length - 1 && ans === 0) {
    leftSum = leftSum + arr[pivotIdx - 1];
    rightSum = rightSum - arr[pivotIdx];

    if (leftSum === rightSum) {
      ans = pivotIdx;
    }

    pivotIdx++;
  }

  return ans !== 0 ? ans : -1;
}


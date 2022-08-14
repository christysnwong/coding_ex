/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, leftIdx = 0, rightIdx = arr.length - 1) {
  let pivotIdx = leftIdx;
  let pivotNum = arr[pivotIdx];

  let moveLeftOfPivot = (idx) => {
    while (idx > pivotIdx) {
      let temp = arr[idx - 1];
      arr[idx - 1] = arr[idx];
      arr[idx] = temp;

      idx--;
    }
    pivotIdx++;
  };

  let moveRightOfPivot = (idx) => {
    while (idx < pivotIdx) {
      let temp = arr[idx + 1];
      arr[idx + 1] = arr[idx];
      arr[idx] = temp;

      idx++;
    }
    pivotIdx--;
  };

  for (let i = leftIdx + 1; i <= rightIdx; i++) {
    if (arr[i] < pivotNum && i > pivotIdx) {
      moveLeftOfPivot(i);
    }
    if (arr[i] > pivotNum && i < pivotIdx) {
      moveRightOfPivot(i);
    }
  }

  return pivotIdx;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, leftIdx = 0, rightIdx = arr.length - 1) {
  if (leftIdx < rightIdx) {
    let pivotIdx = pivot(arr, leftIdx, rightIdx);
    quickSort(arr, leftIdx, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, rightIdx);
  }

  return arr;
}

module.exports = { pivot, quickSort };
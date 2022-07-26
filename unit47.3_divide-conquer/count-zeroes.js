function countZeroes(arr) {
  let left = 0;
  let right = arr.length - 1;

  if (arr[left] === arr[right]) {
    if (arr[left] === 0) return arr.length;
    if (arr[left] === 1) return 0;
  }

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === arr[left]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr.length - left;
}

module.exports = countZeroes
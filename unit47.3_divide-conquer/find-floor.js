function findFloor(arr, val) {
  let left = 0;
  let right = arr.length - 1;

  if (val < arr[0]) return -1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] > val) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  if (arr[left] > val) {
    return arr[left - 1];
  } else {
    return arr[left];
  }
  
  
}

module.exports = findFloor;

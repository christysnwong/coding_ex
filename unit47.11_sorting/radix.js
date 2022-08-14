function radixSort(arr) {
  let onDigitFromRight = 0;
  let max = arr[0];

  while (onDigitFromRight < max.toString().length) {
    let sortedArr = [];
    let buckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < arr.length; i++) {
      let digit = +[...arr[i].toString()].reverse()[onDigitFromRight] || 0;
      buckets[digit].push(arr[i]);
      max = Math.max(max, arr[i]);
    }

    for (let j = 0; j < buckets.length; j++) {
      if (buckets[j].length === 0) continue;
      sortedArr.push(...buckets[j]);
    }

    arr = sortedArr;
    onDigitFromRight++;
  }

  return arr;
}


module.exports = { radixSort };
function selectionSort(arr) {
    let sortedIdx = 0;

    function findMinNumIdxFromIdx(idx) {
        let minIdx = idx;

        for (let i = idx; i < arr.length; i++) {
          if (arr[i] < arr[minIdx]) minIdx = i;
        }

        return minIdx;
    }
    
    while (sortedIdx < arr.length - 1) {
      let minIdx = findMinNumIdxFromIdx(sortedIdx);
      
      let temp = arr[sortedIdx];
      arr[sortedIdx] = arr[minIdx]
      arr[minIdx] = temp;

      sortedIdx++;
    }

    return arr;

}

module.exports = selectionSort;
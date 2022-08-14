function insertionSort(arr) {
    let sortedIdx = 0;

    function moveLeft(idx) {
        if (idx === 0) return;

        while (arr[idx] < arr[idx - 1]) {
          let temp = arr[idx - 1];
          arr[idx - 1] = arr[idx];
          arr[idx] = temp;

          idx --;
        }        
    }

    while (sortedIdx < arr.length - 1) {
        moveLeft(sortedIdx+1);
        sortedIdx++;
    }

    return arr;

}

module.exports = insertionSort;
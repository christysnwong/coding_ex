function merge(arr1, arr2) {
    const ans = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            ans.push(arr1[i])
            i++;
        } else {
            ans.push(arr2[j]);
            j++;
        }

    }
    while (i < arr1.length) {
        ans.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
      ans.push(arr2[j]);
      j++;
    }

    return ans;
}

function mergeSort(arr) {
    // base
    if (arr.length <=1) return arr;
    const mid = Math.floor(arr.length / 2);
    let leftArr = mergeSort(arr.slice(0, mid));
    let rightArr = mergeSort(arr.slice(mid));
    return merge(leftArr, rightArr);
}

module.exports = { merge, mergeSort};
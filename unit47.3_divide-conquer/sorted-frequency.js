function sortedFrequency(arr, num) {
    let left = 0;
    let right = arr.length - 1;
    let count = 0;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === num || arr[mid] > num) {
            right = mid;
        } else if (arr[mid] < num) {
            left = mid + 1;
        }
    }

    if (arr[left] !== num) return -1;

    for (let i = left; i < arr.length; i++) {
        if (arr[i] === num) {
            count++;
        } else {
            break;
        }
    }

    return count;
}

module.exports = sortedFrequency
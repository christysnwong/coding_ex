// add whatever parameters you deem necessary
// inputs - 1 arr of integers, 1 target sum
// outputs - # of pairs = tgtSum
// input type: integers, no dups
// constraints: O(n log n) or O(n)


// Solution 1 with sorting O(n log n)
// function countPairs(arr, tgtSum) {
//     // sort array from small to large
//     // use 2 pointers at beginning and end to get 2 values and their sum
//     // check sum
//         // if same as tgtSum, numPairs++;
//         // if < tgtSum, left++;
//         // if > tgtSum, right++;
//     let numPairs = 0;
//     arr.sort((a,b) => a - b);

//     let left = 0;
//     let right = arr.length - 1;

//     while (left < right) {
//         if (arr[left] + arr[right] === tgtSum) {
//             left++;
//             right--;
//             numPairs++;
//         } else if (arr[left] + arr[right] < tgtSum) {
//             left++;
//         } else {
//             right--;
//         }
//     }

//     return numPairs;
// }

// Solution 2 with set
function countPairs(arr, tgtSum) {
    let mySet = new Set(arr);
    let numPairs = 0;

    for (let val of arr) {
        mySet.delete(val);
        if (mySet.has(tgtSum - val)) {
            numPairs++;
            mySet.delete(tgtSum - val);
        } 
        
    }

    return numPairs;
}
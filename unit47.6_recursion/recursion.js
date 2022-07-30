/** product: calculate the product of an array of numbers. */

// method 1
// function product(nums) {
//   // base
//   if (nums.length === 1) return nums[0]

//   // normal
//   return nums[0] * product(nums.slice(1))

// }

// method 2
// function product(nums, n = nums.length) {
//   //base
//   if (n === 0) {
//     return 1;
//   } else {
//     // normal
//     return nums[n - 1] * product(nums, n - 1);
//   }
// }

// 4 * product(arr, 2)  
//           3 * product(arr, 1)
//                      2 * product(arr, 0)
//                               1

// method 3
function product(nums, n = 0) {
  // base
  if (n === nums.length) {
    return 1;
  } else {
    // normal
    return nums[n] * product(nums, n + 1);
  }
}





/** longest: return the length of the longest word in an array of words. */

function longest(words, n=0) {
  // base
  if (n === words.length) return 0;

  // normal
  return Math.max(words[n].length, longest(words, n+1))
}

/** everyOther: return a string with every other letter. */

// method 1
// function everyOther(str, n = 0) {
//   // base
//   if (n === str.length) return "";

//   // normal
//   if (n % 2 === 0) {
//     return str[n] + everyOther(str, n + 1);
//   } else {
//     return everyOther(str, n + 1);
//   }
// }

// method 2
function everyOther(str, n = 0) {
  // base
  if (n >= str.length) return "";

  // normal
  return str[n] + everyOther(str, n + 2);

}

// h + everyOther(str, 1)
//         everyOther(str,2)
//               l + everyOther(str, 3)
//                         everyOther(str, 4)
//                               o + everyOther(str, 5)
//                                           ""

/** isPalindrome: checks whether a string is a palindrome or not. */


function isPalindrome (str, n=0) {
  // base
  if (str.length % 2 !== 0 && n === Math.floor(str.length/2)) {
    return true;
  } else if (str.length % 2 === 0 && n === Math.floor(str.length/2) ) {
    return str[n] === str[str.length -1 - n];
  }

  // normal
  if (str[n] !== str[str.length - 1 - n]) {
    return false;
  } else {
    return str[n] === str[str.length - 1 - n] && isPalindrome(str, n + 1);
  }
   

}

// springboard solution
// function isPalindrome(str, idx = 0) {
//   let leftIdx = idx;
//   let rightIdx = str.length - idx - 1;
//   if (leftIdx >= rightIdx) return true;
//   if (str[leftIdx] !== str[rightIdx]) return false;
//   return isPalindrome(str, idx + 1);
// }

// ex - tarat
// true && isPalindrome(str, 1)
//           true && isPalindrome(str, 2)
//                       true

// ex - taroat
// true && isPalindrome(str, 1)
//           true && isPalindrome(str, 2)
//                                       

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, n = 0) {
  // base
  if (n === arr.length) return -1;

  // normal
  if (arr[n] === val) {
    return n;
  } else {
    return findIndex(arr, val, n + 1);
  }
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, n = str.length - 1) {
  // base
  if (n < 0) return "";

  // normal
  return str[n] + revString(str, n - 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, ans = []) {
  for (let prop in obj) {
    if (typeof obj[prop] === "string") {
      ans.push(obj[prop]);
    } else if (typeof obj[prop] === "object") {
      gatherStrings(obj[prop], ans);
    }
  }

  return ans;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length - 1) {
  // base
  if (arr[left] === val) {
    return left;
  } else if (left >= right) {
    return -1;
  }

  // normal
  let mid = Math.floor((left + right) / 2);

  if (arr[mid] >= val) {
    // val in the left portion of arr
    return binarySearch(arr, val, left, mid);
  } else {
    // val in the right portion of arr
    return binarySearch(arr, val, mid + 1, right);
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};

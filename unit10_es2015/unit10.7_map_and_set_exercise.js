// Maps and Sets Exercise

// Quick Question #1
new Set([1,1,2,2,3,4]) // returns {1, 2, 3, 4}


// Quick Question #2
new Set("referee").join("") // returns "ref"

// Quick Question #3
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

/* m looks like:
0: {Array(3) => true}
1: {Array(3) => false}
*/

// hasDuplicate

const hasDuplicate = arr => {
  let uniqueArr = new Set(arr);
  return arr.length !== uniqueArr.size;
}

// vowelCount

// Soln 1
// const vowelCount = string => {
//   let vowelRegex = /[aeiou]+/i;
//   let filteredVowel = string.split("")
//      .filter( vowel => vowelRegex.test(vowel));
//   let vowelMap = new Map();

//   filteredVowel.forEach(function(vowel) {
//     let lowVowel = vowel.toLowerCase();
//     vowelMap.has(lowVowel)
//       ? vowelMap.set(lowVowel, vowelMap.get(lowVowel)+1) 
//       : vowelMap.set(lowVowel, 1);
//   })
//   return vowelMap;
// }

// Soln 2

const vowelCount = string => {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  const vowelMap = new Map();

  let splitArr = string.split("");

  splitArr.forEach(char => {
    let lowChar = char.toLowerCase();

    if (vowelSet.has(lowChar)) {
      vowelMap.has(lowChar)
      ? vowelMap.set(lowChar, vowelMap.get(lowChar)+1) 
      : vowelMap.set(lowChar, 1);
    }
  })

  return vowelMap;
}




// Simplify a split square

// my solution
function simplify(s) {

  // special case
  if (typeof s === "number") {
    return s;
  }

  // Simplify a split square
  let sum = 0;
  let ans = [];

  // review the square of 4 sub-squares (sq) and calculate total sum
  for (let sq of s) {
    if (Array.isArray(sq)) {
      let result = simplify(sq);
      if (result === 1) {
        sum++;
      }
      // pushes 3 possible results - 0, 1, or an array of mixed squares
      ans.push(result);
    } else {
      sum += sq;
      // pushes either 0 or 1
      ans.push(sq);
    }
  }

  // check total sum of sub-squares
  if (sum === 0) {
    // return 0 if all 4 are 0
    return 0;
  } else if (sum === 4) {
    // return 0 if all 4 are 1
    return 1;
  }

  // return array of mixed sub-squares if total sum are neither 0 or 1
  return ans;
}

// springboard solution

// function simplify(s) {
//   // base case: is already just an integer
//   if (s === 0 || s === 1) return s;

//   // recursively simplify all quadrants
//   s = s.map(simplify);

//   // if all four are the same integer, we can simplify
//   if (Number.isInteger(s[0]) && s.every((q) => q === s[0])) return s[0];

//   return s;
// }



// console.log(
//   // simplify([1, 1, 1, [1, 1, 1, 1]]),
//   // simplify([[1, 1, 1, 1], [1, 1, 1, 1], 1, 1]),
//   simplify([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1])
// );

module.exports = simplify ;
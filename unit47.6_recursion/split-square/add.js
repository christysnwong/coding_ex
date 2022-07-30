// my solution
function add(s1, s2) {
  let ans = [];
  let s1Type = typeof s1;
  let s2Type = typeof s2;
  let s1Val = s1;
  let s2Val = s2;

  if (s1Type === "number" && s2Type === "number") {
    // case 1 - both s1 and s2 are numbers
    return Math.max(s1Val, s2Val);
  } else if (s1Type === "number" && s2Type === "object") {
    // case 2a1 - if s1 = 0 and s2 is an array
    if (s1Val === 0) {
      return s2Val;
    } else if (s1Val === 1) {
      // case 2a2 - if s1 = 1 and s2 is an array
      let result = add(
        Array.from({ length: s2Val.length }, () => 1),
        s2Val
      );
      return result;
    }
  } else if (s1Type === "object" && s2Type === "number") {
    // case 2b1 - if s2 = 0 and s1 is an array
    if (s2Val === 0) {
      return s1Val;
    } else if (s2Val === 1) {
      // case 2b2 - if s2 = 1 and s1 is an array
      let result = add(
        Array.from({ length: s2Val.length }, () => 1),
        s2Val
      );
      return result;
    }
  }

  // case 3 - if both s1 and s2 are arrays, check type of values in the array
  for (let i = 0; i < s1.length; i++) {
    s1Type = typeof s1[i];
    s2Type = typeof s2[i];
    s1Val = s1[i];
    s2Val = s2[i];

    ans.push(add(s1[i], s2[i]));
  }

  return ans;
}

// springboard solution
// function add(s1, s2) {
//   if (Number.isInteger(s1) && Number.isInteger(s2)) {
//     // Not || for "logical-or", but | for "bitwise-or"
//     //   0|0=0  0|1=1  1|0=1  1|1=1
//     return s1 | s2;
//   }

//   if (Array.isArray(s1) && !Array.isArray(s2)) {
//     s2 = [s2, s2, s2, s2];
//   }

//   if (Array.isArray(s2) && !Array.isArray(s1)) {
//     s1 = [s1, s1, s1, s1];
//   }

//   return [
//     add(s1[0], s2[0]),
//     add(s1[1], s2[1]),
//     add(s1[2], s2[2]),
//     add(s1[3], s2[3]),
//   ];
// }

// let s1 = 0
// let s2 = 1

// let s1 = 0;
// let s2 = [1, 0, 1, 1];

// let s1 = 1;
// let s2 = [1, 0, 1, 1];

// let s1 = [1, 0, 0, 1]
// let s2 = [0, 1, 0, 1]

// let s1 = [0, [1, 1, 1, [0, 0, 0, 0]], [0, 0, 0, 0], 1]
// let s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

// let s1 = [0, [1, 1, 1, 0           ], [0, 0, 0, 0], 1]
// let s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

// let s1 = [0, [1, 1, 1, 1], [0, 0, 0, 0], 1];
// let s2 = [1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1];

// console.log(add(s1, s2));


module.exports = add ;
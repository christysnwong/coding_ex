// my solution
function dump(s) {
  // Print each square on a new line

  let sqString = "";

  if (typeof s === "number") {
    return s.toString();
  } else {
    for (let sq of s) {
      if (Array.isArray(sq)) {
        sqString += dump(sq);
      } else {
        sqString += `${sq.toString()} `;
      }
    }
    return sqString.trim();
  }
  
}

// springboard solution
// function dump(s) {
//   // Print each square on a new line

//   if (s === 0 || s === 1) {
//     return s.toString();
//   } else {
//     return s.map(sq => dump(sq)).join(" ");
//   }

// }


// console.log(
//   dump(1),
//   // 1

//   dump([0, 1, 0, 1]),
//   // 0 1 0 1

//   dump([0, 0, 0, [1, 1, 1, 1]]),
//   // 0 0 0 1 1 1 1

//   dump([0, 0, 0, [1, 1, 1, [0, 0, 0, [1, 1, 1, 1]]]])
//   // 0 0 0 1 1 1 0 0 0 1 1 1 1
// );


module.exports = dump;
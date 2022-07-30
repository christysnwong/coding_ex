// Validate that a given square is valid.

// my solution
function is_valid(s) {
  // Validate that a given square is valid..

  // if s is a number
  if (typeof s === "number") {
    if (s === 0 || s === 1) {
      return true;
    }
    return false;
  }
  
  // if s is an array
  if (s.length !== 4) {
    return false;
  }

  for (let sq of s) {
    if (Array.isArray(sq)) {
      return is_valid(sq);
    } else {
      if (sq !== 0 && sq !== 1) {
        return false;
      }
    }
  }

  return true;
}


// springboard solution
// function is_valid(s) {
//   // Validate that a given square is valid..

//   if (s === 0 || s === 1) {
//     return true;
//   }

//   if (Array.isArray(s) && s.length === 4) {
//     return s.every(is_valid);
//   }

//   return false;
// }

module.exports = is_valid;
// add whatever parameters you deem necessary

// inputs - 2 strings - (1 msg, letters)
// output - true for valid msg, else false
// type - only lowercase, no space or special char
// constraint - time complexity

// helper function to count alphabets in str

function countChar(str) {
  let obj = {};
  for (let char of str) {
    obj[char] = (obj[char] += 1) || 1;
  }
  return obj;

}

function constructNote(msg, letters) {
    // get char count for msg and letters
    let obj1 = countChar(msg);
    let obj2 = countChar(letters);

    
    for (let char in obj1) {
      // check if msg's char is in letters' char, else false
      if (!obj2[char]) return false;

      // check if msg char's count is less than or equal to letters chars count, else false
      if (obj1[char] > obj2[char]) return false;
    }
    
    // return true
    return true;
}



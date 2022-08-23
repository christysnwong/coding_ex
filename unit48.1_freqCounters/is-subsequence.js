// add whatever parameters you deem necessary
// inputs - 2 strs
// checks whether letters in 1st str appear in 2nd str in order
// input type - str
// constraint - time complex O(N)
// return true or false
function isSubsequence(str1, str2) {
  // for loop that checks whether vals in 1st string appear in 2nd str
  // use 2 pointer, increment the both pointer idx when letter appears in both str

  let p1 = 0;
  let p2 = 0;

  while (p1 < str1.length) {
    if (str1[p1] === str2[p2]) {
      p1++;
      p2++;
    } else if (str1[p1] !== str2[p2]) {
      p2++;
    }

    if (p2 > str2.length - 1 && str1[p1]) return false;
  }

  return true;
}

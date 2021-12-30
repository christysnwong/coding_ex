// ES2015 function - Refactor it to use the rest operator & an arrow function:
const filterOutOdds = (...args) => args.filter(num => num % 2 === 0);

// findMin
const findMin = (...args) => Math.min(...args);

// mergeObjects
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2});

// doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(num => num * 2)];

// Slice & Dice!

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = items => {
  const randIdx = Math.floor(Math.random() * items.length);

  // Solution 1
  // return items.filter( item => items.indexOf(item) !== randIdx );

  // Solution 2
  return [...items.slice(0, randIdx), ...items.slice(randIdx + 1)];

}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

// Solution 1
// const addKeyVal = (obj, key, val) => {
//   let newObj = {...obj};
//   newObj[key] = val;
//   return newObj;
// }

// Solution 2
const addKeyVal = (obj, key, val) => ({...obj, [key]: val});

/** Return a new object with a key removed. */

// Solution 1
const removeKey = (obj, key) => {
  let newObj = {...obj};
  delete newObj[key];
  return newObj
}

// Solution 2
// const removeKey = (obj, key) => {
//   ({[key]: undefined, ...obj} = obj);
//   return obj;
// }

/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => ({...obj1, ...obj2});


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
}
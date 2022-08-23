// add whatever parameters you deem necessary
// inputs: 2 arrays with diff length
// 1st input array keys
// 2nd input array values
// outputs: obj of keys and values
// constraints1: not enough vals -> key: null
// constraints2: not enough keys -> ignore vals

function twoArrayObject(arrKeys, arrVals) {
    // create obj
    let ans = {};

    // use for loop to go over and put keys and values in an obj 
    // until the min length of array of keys
    // check for 3 scenarios
        // have both keys and values
        // only key
        // only val
    for (let i = 0; i < arrKeys.length; i++) {
        if (arrKeys[i] && arrVals[i]) {
            ans[arrKeys[i]] = arrVals[i];
        } else if (arrKeys[i] && !arrVals[i]) {
            ans[arrKeys[i]] = null;
        } 
    }

    // return obj
    return ans;
}

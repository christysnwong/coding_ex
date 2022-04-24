// Question 1

// axios.get(`http://numbersapi.com/7?json`)
// .then(resp => console.log(resp.data.text))


// Question 2
// let factsPromises = []
// favNums = [12, 33, 45]

// for (let i = 0; i < favNums.length; i++) {
//   factsPromises.push(
//     axios.get(`http://numbersapi.com/${favNums[i]}?json`)
//   );
// }

// Promise.all(factsPromises)
// .then(resp => {
//   resp.forEach(resp => console.log(resp.data.text))
// })
// .catch(err => console.log(err));


// Question 3

let factsPromises = [];
let favNum = 7;

for (let i = 1; i < 5; i++) {
  factsPromises.push(
    axios.get(`http://numbersapi.com/${favNum}?json`)
  );
}
  
Promise.all(factsPromises)
  .then(resp => {
    resp.forEach(resp => console.log(resp.data.text))
  })
  .catch(err => console.log(err));
  
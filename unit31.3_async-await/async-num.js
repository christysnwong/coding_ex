// Question 1

// THEN / CATCH METHOD

// axios.get(`http://numbersapi.com/7?json`)
// .then(resp => console.log(resp.data.text))

// ASYNC / AWAIT METHOD

// async function getNumFact() {
//   let resp = await axios.get(`http://numbersapi.com/7?json`)
//   console.log(resp.data.text)
// }

// getNumFact();

// Question 2

// THEN / CATCH METHOD

// let factsPromises = []
// let favNums = [12, 33, 45]

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

// ASYNC / AWAIT METHOD

// async function getNumFacts() {
//   let factsPromises = []
//   let favNums = [12, 33, 45];

//   for (let i = 0; i < favNums.length; i++) {
//     factsPromises.push(
//       axios.get(`http://numbersapi.com/${favNums[i]}?json`)
//     );
//   }

//   let facts = await Promise.all(factsPromises);
//   facts.forEach(resp => console.log(resp.data.text))

// }

// getNumFacts();


// Question 3

// THEN / CATCH METHOD

// let factsPromises = [];
// let favNum = 7;

// for (let i = 1; i < 5; i++) {
//   factsPromises.push(
//     axios.get(`http://numbersapi.com/${favNum}?json`)
//   );
// }
  
// Promise.all(factsPromises)
//   .then(resp => {
//     resp.forEach(resp => console.log(resp.data.text))
//   })
//   .catch(err => console.log(err));
  
// ASYNC / AWAIT METHOD

async function getNumFact() {
  let factsPromises = []
  let favNums = 7;

  for (let i = 0; i < 4; i++) {
    factsPromises.push(
      axios.get(`http://numbersapi.com/${favNums}?json`)
    );
  }

  let facts = await Promise.all(factsPromises);
  facts.forEach(resp => console.log(resp.data.text))

}

getNumFact();
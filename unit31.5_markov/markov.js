/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.nextWords = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    let results = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWordsArr = [];
      let j = 0;

      // console.log("word=", word);
      // console.log("before 2nd for loop");

      for (let j = 0; j < this.words.length; j++) {
  
        let idx = this.words.indexOf(word, j);

        // console.log("idx=", idx);
        // console.log("j=", j);
        
        if (idx == this.words.length - 1) {
          nextWordsArr.push(null);

          j = this.words.length;
        } else if (idx < this.words.length && idx !== -1) {
          nextWordsArr.push(this.words[idx + 1]);
          j = idx + 2;
        } 
        
      }

      // console.log("after 2nd for loop");

      results[word] = nextWordsArr;


    }

    return results;
    

  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO 'the cat is in the hat'
    let textArr = [];

    for (let i = 0; i < numWords; i++) {
      let idx = Math.floor(Math.random() * this.words.length);
      // console.log("idx=", idx);

      let word = this.words[idx];

      textArr.push(word);
      // console.log("word=", word);

      // console.log("ENTER while loop");

      // console.log("##########", this.nextWords[word]);
      // console.log("##########", this.nextWords[word][0]);

      while (word !== null && textArr.length < numWords) {
        // console.log("nextWords.length=", this.nextWords[word].length);
        let subIdx = Math.floor(Math.random() * this.nextWords[word].length);

        // console.log("subIdx", subIdx);

        textArr.push(this.nextWords[word][subIdx]);
        // console.log("push", this.nextWords[word][subIdx]);
        i++;

        word = this.nextWords[word][subIdx];

        // console.log("nextWord=", word);
        // console.log(this.nextWords[word]);
        // console.log("subIdx=", subIdx);
        

      }

      // console.log("EXIT while loop");

    }

    return textArr.join(" ");

  }

}

module.exports = {
  MarkovMachine
};





// let m = new MarkovMachine(
//   `I am Daniel

//   I am Sam
//   Sam I am
  
//   That Sam-I-am
//   That Sam-I-am!
//   I do not like
//   That Sam-I-am
  
//   Do you like
//   Green eggs and ham
  
//   I do not like them,
//   Sam-I-am.
//   I do not like
//   Green eggs and ham.`
// );

// console.log(m.words);
// console.log(m.makeChains())
// console.log(m.makeText(10));


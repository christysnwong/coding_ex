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
      let nextWord = "";

      if (word == this.words[this.words.length-1]) {
        nextWord = null;
      } else {
        nextWord = this.words[i + 1];
      }

      if (!(word in results)) {
        results[word] = [];
      }

      results[word].push(nextWord);

    }

    return results;
    
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO 
    let textArr = [];
    let keys = Object.keys(this.nextWords);
    let key = keys[Math.floor(Math.random() * keys.length)];

    while (key !== null && textArr.length < numWords) {
      textArr.push(key);

      let subIdx = Math.floor(Math.random() * this.nextWords[key].length);

      key = this.nextWords[key][subIdx];

    
    }

    return textArr.join(" ");

  }

}

module.exports = {
  MarkovMachine
};






// let m = new MarkovMachine(
//   "the cat in the hat is in the hat"
//   // `I am Daniel

//   // I am Sam
//   // Sam I am
  
//   // That Sam-I-am
//   // That Sam-I-am!
//   // I do not like
//   // That Sam-I-am
  
//   // Do you like
//   // Green eggs and ham
  
//   // I do not like them,
//   // Sam-I-am.
//   // I do not like
//   // Green eggs and ham.`
// );

// console.log(m.words);
// console.log(m.makeChains())
// console.log(m.makeText(10));


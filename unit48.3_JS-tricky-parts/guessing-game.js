// input: any nums between 0 to 99
// output message - 4 types - too low, too high, winning message, or over message
// when create a game, function selects a new rand num
// user gives input, which the function returns a message based on the input

function guessingGame() {
    // returns a function that lets u guess a rand num
    // create a rand num from 0 and 99

    let randNum = Math.floor(Math.random() * 100)
    let gameOver = false;
    let guessCount = 0;

    // return a function that generages a message based on the input and rand num
    return (function(guess) {
        guessCount++;
        if (guess < randNum && gameOver === false) {
          return `${guess} is too low!`;
        } else if (guess > randNum && gameOver === false) {
          return `${guess} is too high!`;
        } else if (guess === randNum && gameOver === false) {
          gameOver = true;
          return `You win! You found ${guess} in ${guessCount} guesses.`;
        } else {
          return "The game is over, you already won!";
        }
    })

}

module.exports = { guessingGame };

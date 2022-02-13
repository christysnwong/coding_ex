
class BoggleGame {

    constructor(time = 60) {
        this.userWordsList = new Set();
        this.score = 0;
        this.time = time;
        this.initGame();
        this.timeInterval = setInterval(this.updateTimer.bind(this), 1000);

        $('#guess-form').on('submit', this.handleSubmit.bind(this));

    }

    initGame() {
        // initialize and start the game
    
        $('#timer').text(this.time);
        $('#score').text(this.score);

    }

    showWord(userWord) {
        // show user's valid input words on the board page
        $("#user-words").append($("<li>", {text: userWord}));
    }

    async handleSubmit(evt) {
        // handle user's word submission, display score and show word
    
        evt.preventDefault();
    
        let $userWord = $("#guess")
        let userWord = $userWord.val().toLowerCase();
    
        let response = await axios.get("http://127.0.0.1:5000/checkword", { params: {word: userWord}});
    
        if (response.data.result == "not-word") {
            $('#msg').text(`${userWord} is not a valid word.`);
        } else if (response.data.result == "not-on-board") {
            $('#msg').text(`${userWord} is not a valid word from this board.`)
        } else {
            
            if (this.userWordsList.has(userWord)) {
                $('#msg').text(`${userWord} has already been added.`);
            } else {
                $('#msg').text(`Good job! ${userWord} is added.`);
    
                this.userWordsList.add(userWord);
                this.showWord(userWord);
                this.score += userWord.length;
                $('#score').text(this.score);
            }
                    
        }
        
        evt.target.reset();
    
    }

    async updateTimer() {
        // keeps track of time and update timer
    
        this.time--;
        $('#timer').text(this.time);
    
        if (this.time < 10) {
            $('#timer').addClass("red-text");
        }
    
        if (this.time === 0) {
            clearInterval(this.timeInterval);
            $('#guess-form').hide();
            await this.postScore();
        }
    }

    async postScore() {
        // post and update best score on the server, and update message  
    
        const resp = await axios({
            url: "/post-score",
            method: "POST",
            data: {
                score: this.score
            }
        })
    
        if (resp.data.brokeRecord) {
            $('#msg').text(`Time is up! You made a new record! Your score is ${this.score}.`);
            $('#best-score').text(this.score);
        } else {
            $('#msg').text(`Time is up! Your score is ${this.score}.`);
        }
    }





}



new BoggleGame(60);



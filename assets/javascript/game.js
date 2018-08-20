var wordList = [
    'honda', 'acura', 'pontiac', 'ford', 'lincoln', 'mazda', 'audi', 'volkswagen', 'lamborghini', 'pagani',
    'kia', 'toyota', 'lexus', 'nissan', 'mercedes', 'chevy', 'hyundai', 'ferrari', 'bugatti', 'mclaren',
    'jeep', 'lotus', 'porsche', 'bmw', 'gmc', 'tesla', 'citroen', 'renault', 'mercury', 'buick', 'mitsubishi',
    'chrysler', 'jaguar', 'fiat' 
];


var game = {
    word : "",
    wins : 0,
    losses : 0,
    guessesLeft : 0,
    lettersGuessed : [],
    winningSound : new Audio('assets/audio/win.mp3'),
    losingSound : new Audio('assets/audio/lose.mp3'),

    newGame : function () {
        this.guessesLeft = 9;
        this.lettersGuessed = [];
        this.word = wordList[Math.floor(Math.random() * wordList.length)]; // get a random word from the list

        var wordString = '';
        for (var i = 0; i < this.word.length; i++) {
            wordString += ' _';
        }
        document.getElementById('currentWord').innerText = wordString;
        document.getElementById('guessesLeft').innerText = this.guessesLeft;
        document.getElementById('lettersGuessed').innerText = this.lettersGuessed;
    },

    checkGuess : function (letter) {
        for (var i = 0; i < this.lettersGuessed.length; i++) {
            if (this.lettersGuessed[i] === letter.toUpperCase())
                return;
        }

        this.lettersGuessed.push(letter.toUpperCase());
        document.getElementById('lettersGuessed').innerText = this.lettersGuessed;
        if (this.word.indexOf(letter) == -1 ) {
            this.guessesLeft--;
        }

        document.getElementById('guessesLeft').innerText = this.guessesLeft;

        if (this.guessesLeft == 0) {
            this.losses++;
            this.losingSound.play();
            document.getElementById('losses').innerText = this.losses;
            game.newGame();
        }

        // final step is to display the letters used
        this.displayLetters();
    },

    displayLetters : function () {
        var wordString = "";
        var correctCounter = 0;
        var letterFound = false;

        
        for (var i = 0; i < this.word.length; i++) {
            letterFound = false;

            for (var j = 0; j < this.lettersGuessed.length; j++) {
                // console.log(this.word[i] + '  '  + this.lettersGuessed[j]);
                if (this.word[i].toLowerCase() == this.lettersGuessed[j].toLowerCase()) {
                    // show this letter
                    wordString += ' ' + this.word[i].toLowerCase();
                    correctCounter++;
                    letterFound = true;
                }
            }
            if (letterFound == false) {
                    wordString += ' _';
            }

            // reset the boolean for the next iteration
            letterFound = false;


        }

        if (correctCounter == this.word.length) { // the user won the game
            this.wins++;
            this.winningSound.play();
            document.getElementById('wins').innerText = this.wins;
            document.getElementById('congrats').style.display = 'block';
            setTimeout(function() {
                document.getElementById('congrats').style.display = 'none';
            }, 2000);
            this.newGame();
        }
        else {
            document.getElementById('currentWord').innerText = wordString;
        }

        // console.log(wordString);
    }
}


document.onkeyup = function (evt) {
    var keyPressed = evt.key;

    game.checkGuess(keyPressed);
}

// start the game
game.newGame();

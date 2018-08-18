function selectWord(wordOptions) {
    return words[Math.floor(Math.random()*wordOptions.length)];
}

function generateDisplay(selectedWord, guessedLetters) {
    let output = "";
    if (guessedLetters.includes(selectedWord[0])){
        output = selectedWord[0];
    } 
    else {
        output = "-";
    }
    for (let i = 1; i < selectedWord.length; i++){
        if (guessedLetters.includes(selectedWord[i])){
            output = output + " " + selectedWord[i];
        }
        else {
            output = output + " -";
        }
    }
    return output;
}

function generateGuesses(newGuess, remainingLetters) {
    console.log(newGuess);
    console.log(remainingLetters);
    return remainingLetters.replace(newGuess, "-");
}


let words = ["NINTENDO", "SEGA", "PLAYSTATION", "XBOX", "CONTROLLER", "ATARI", "INTELLIVISION", "COLECOVISION"];
let guesses = [];
let guessesLeft = 6;
let currentGuess = "";
let start = false;
let lettersLeft = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
let numWins = 0;

let answer = selectWord(words);
let display = generateDisplay(answer, guesses);

document.addEventListener('keyup', function(event){
    if (start){
        currentGuess = String.fromCharCode(event.which);
        if (!guesses.includes(currentGuess)){
            lettersLeft = generateGuesses(currentGuess, lettersLeft);
            guesses.push(currentGuess);
            display = generateDisplay(answer, guesses);
            if (!answer.includes(currentGuess)){
                guessesLeft--;
            }
            document.getElementById("lives").innerHTML = guessesLeft;
            document.getElementById("puzzle").innerHTML = display;
            document.getElementById("guessList").innerHTML = lettersLeft;

            if (guessesLeft < 1){
                document.getElementById("game-info").innerHTML = "GAME OVER! Press any key to play again."
                guesses=[];
                guessesLeft=6;
                answer = selectWord(words);
                display = generateDisplay(answer, guesses);
                start = false;
            } 
            else if (!display.includes("-")){
                numWins++;
                document.getElementById("wins").innerHTML = numWins;
                document.getElementById("game-info").innerHTML = "YOU WON! Press any key to play again."
                guesses=[];
                guessesLeft=6;
                answer = selectWord(words);
                display = generateDisplay(answer, guesses);
                start = false;
            }
        }
        else {
            alert("That letter has already been guessed!");
        }
    }
    else {
        start = true;
        lettersLeft = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
        document.getElementById("lives").innerHTML = guessesLeft;
        document.getElementById("puzzle").innerHTML = display;
        document.getElementById("guessList").innerHTML = lettersLeft;
        document.getElementById("game-info").innerHTML = "Guess a letter."
        document.getElementById("wins").innerHTML = numWins;
    }

    
})

console.log(answer);
console.log(display);
